import pytest

from users.models import User


@pytest.fixture
def user():
    user = User.objects.create_user(
        first_name='Danial',
        last_name='Bidaibek',
        password='123',
        email='bidaybek044@gmail.com',
        phone_number='+77078990989',
        user_type='Employee'
    )

    return user
