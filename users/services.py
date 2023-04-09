import random
import uuid
from typing import Protocol, OrderedDict
from django.core.cache import cache
from src import settings
from . import repos
from .models import User
from templated_email import send_templated_mail
from django.core.mail import send_mail
from rest_framework_simplejwt import tokens


class UserServicesInterface(Protocol):
    def create_user(self, data: OrderedDict) -> str: ...

    def verify_user(self, data: OrderedDict) -> None: ...

    def create_token(self, data: OrderedDict) -> str: ...

    def verify_token(self, data: OrderedDict) -> dict: ...


class UserServicesV1:
    user_repos: repos.UserReposInterface = repos.UserReposV1()

    def create_user(self, data: OrderedDict) -> str:
        return self._verify_email(data=data)

    def verify_user(self, data: OrderedDict):
        user_data = cache.get(data['session_id'])
        user = self.user_repos.create_user(data={
            'email': user_data['email'],
            'phone_number': user_data['phone_number'],
        })

        self._send_confirmation_letter_on_email(user=user)

    def create_token(self, data: OrderedDict):
        user = self.user_repos.get_user(data=data)
        data['email'] = str(user.email)

        return self._verify_email(data=data)

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

        self._send_letter_on_email(email=data['email'], code=code)

        return session_id

    @staticmethod
    def _send_letter_on_email(email: str, code: str):
        send_mail(
            subject=f'Welcome to HireHive!',
            message=f'Your code is {code}',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email],
            fail_silently=False
        )

    @staticmethod
    def _send_confirmation_letter_on_email(user: User):
        send_mail(
            subject=f'You succesfully registered on HireHive!',
            message='On our site you can familiarize yourself with those interested in you',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user.email],
            fail_silently=False
        )

    @staticmethod
    def _generate_code() -> str:
        return ''.join(random.choices([str(i) for i in range(10)], k=4))

    @staticmethod
    def _generate_session_id() -> str:
        return str(uuid.uuid4())
