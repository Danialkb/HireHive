from rest_framework.permissions import BasePermission
from users import choices as user_choices


class IsEmployerAndOwner(BasePermission):

    def has_permission(self, request, view):
        return (
            request.user
            and request.is_authenticated
            and request.user.user_type == user_choices.UserTypeChoices.Employer
        )

    def has_object_permission(self, request, view, obj):
        return request.user == obj.user
