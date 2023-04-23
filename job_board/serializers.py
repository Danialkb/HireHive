from rest_framework import serializers
from . import models
from users.models import User


# class CategorySerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = models.Category
#         fields = '__all__'


class JobPostSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    # category = serializers.SlugRelatedField(slug_field='name', queryset=models.Category.objects.all())
    company_name = serializers.ReadOnlyField(source='user.company.name')

    class Meta:
        model = models.JobPost
        fields = ('id', 'user', 'created_at', 'company_name', 'title', 'description', 'location', 'salary')


class ApplicantSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    job_post = serializers.PrimaryKeyRelatedField(queryset=models.JobPost.objects.all())
    first_name = serializers.ReadOnlyField(source='user.first_name')
    last_name = serializers.ReadOnlyField(source='user.last_name')
    # phone_number = serializers.ReadOnlyField(source='user.phone_number')
    email = serializers.ReadOnlyField(source='user.email')

    class Meta:
        model = models.Applicant
        fields = ('user', 'job_post', 'first_name', 'last_name', 'email', 'covering_letter', 'resume')

