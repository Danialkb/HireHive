import random
import uuid
from typing import Protocol, OrderedDict

from django.contrib.auth.hashers import check_password
from django.core.cache import cache
from src import settings
from . import repos
from .models import User
from templated_email import send_templated_mail
from rest_framework_simplejwt import tokens


class UserServicesInterface(Protocol):
    def create_user(self, data: OrderedDict) -> str: ...

    def verify_user(self, data: OrderedDict) -> User: ...

    def create_token(self, data: OrderedDict) -> str: ...

    def verify_token(self, data: OrderedDict) -> dict: ...

    def get_user(self, data: OrderedDict) -> User: ...


class UserServicesV1:
    user_repos: repos.UserReposInterface = repos.UserReposV1()

    def get_user(self, data: OrderedDict) -> User:
        payload = tokens.AccessToken(data['access_token']).payload
        user_id = payload.get('user_id')

        return self.user_repos.get_user(data={'id': user_id})

    def create_user(self, data: OrderedDict) -> str:
        return self._verify_email(data=data)

    def verify_user(self, data: OrderedDict) -> User:
        user_data = cache.get(data['session_id'])
        if user_data['code'] == data['code']:
            user = self.user_repos.create_user(data={
                'first_name': user_data['first_name'],
                'last_name': user_data['last_name'],
                'email': user_data['email'],
                'phone_number': user_data['phone_number'],
                'password': user_data['password'],
                'user_type': user_data['user_type']
            })

            self._send_confirmation_letter_on_email(user=user)
            return user
        return None

    def create_token(self, data: OrderedDict):
        user = self.user_repos.get_user(data={'email': data['email']})

        if not user:
            return {"detail": 'Invalid username or password'}

        if check_password(password=data['password'], encoded=user.password):
            access = tokens.AccessToken.for_user(user)
            refresh = tokens.RefreshToken.for_user(user)

            return {
                'access': str(access),
                'refresh': str(refresh),
            }
        else:
            return {"detail": 'Invalid username or password'}

    def verify_token(self, data: OrderedDict) -> dict:
        user_data = cache.get(data['session_id'])

        user = self.user_repos.get_user(data={'email': user_data['email']})

        access = tokens.AccessToken.for_user(user)
        refresh = tokens.RefreshToken.for_user(user)

        return {
            'access': str(access),
            'refresh': str(refresh),
        }

    def _verify_email(self, data: OrderedDict) -> str:
        code = self._generate_code()
        session_id = self._generate_session_id()
        cache.set(session_id, {**data, 'code': code}, timeout=300)

        self._send_letter_on_email(name=data['first_name'], surname=data['last_name'], email=data['email'], code=code)

        return session_id

    @staticmethod
    def _send_letter_on_email(name: str, surname: str, email: str, code: str):
        send_templated_mail(
            template_name='verify',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email],
            context={
                'code': code,
                'name': name,
                'surname': surname,
            }
        )

    @staticmethod
    def _send_confirmation_letter_on_email(user: User):
        send_templated_mail(
            template_name='welcome',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user.email],
            context={
                'name': user.first_name,
                'surname': user.last_name,
            }
        )

    @staticmethod
    def _generate_code() -> str:
        return ''.join(random.choices([str(i) for i in range(10)], k=4))

    @staticmethod
    def _generate_session_id() -> str:
        return str(uuid.uuid4())
