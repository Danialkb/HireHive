from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from users import choices


class UserManager(BaseUserManager):
    @staticmethod
    def _validate_user(email: str, phone_number: str):
        if not email:
            raise ValueError('Users must have an email address')

        if not phone_number:
            raise ValueError('Users must have an phone number')

    def create_user(self, first_name: str, last_name: str, password: str, email: str, phone_number: str, user_type: str = None):
        self._validate_user(email=email, phone_number=phone_number)

        user = self.model(
            first_name=first_name,
            last_name=last_name,
            email=self.normalize_email(email),
            phone_number=phone_number,
            is_active=True,
            user_type=user_type
        )
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email: str, phone_number: str, password: str = None):
        self._validate_user(email=email, phone_number=phone_number)

        user = self.model(
            email=self.normalize_email(email),
            phone_number=phone_number,
            is_active=True,
            is_staff=True,
            is_superuser=True,
        )
        user.set_password(password)
        user.save()

        return user


class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=50, blank=True, null=True)
    phone_number = PhoneNumberField(unique=True, default='+77777777777')
    user_type = models.CharField(
        max_length=10,
        choices=choices.UserTypeChoices.choices,
        blank=True,
        null=True,
    )

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['phone_number']

    objects = UserManager()

    def __str__(self):
        return f'{self.first_name} {self.last_name} {self.email}'
