import pytest
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

client = APIClient()


@pytest.mark.django_db
def test_register_user():
    payload = dict(
        first_name='Danial',
        last_name='Bidaibek',
        email='bidaybek044@gmail.com',
        phone_number='+77476778998',
        password='123',
        user_type='Employee'
    )

    response = client.post('/api/v1/users/', payload)

    assert isinstance(response.data['session_id'], str)


@pytest.mark.django_db
def test_login_user(user):
    response = client.post('/api/v1/users/token/', dict(email=user.email, password='123'))

    assert response.data['access'] is not None
    # assert response.data['detail'] is not None


@pytest.mark.django_db
def test_get_user_responses(user):
    response = client.get(f'/api/v1/users/{user.id}/responses/')

    assert response.status_code == 200
