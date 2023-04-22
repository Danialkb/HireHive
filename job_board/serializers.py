from rest_framework import serializers
from . import models


# class CategorySerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = models.Category
#         fields = '__all__'


class JobPostSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    # category = serializers.SlugRelatedField(slug_field='name', queryset=models.Category.objects.all())
    company_name = serializers.ReadOnlyField(source='user.company.name', default=serializers.CurrentUserDefault())

    class Meta:
        model = models.JobPost
        fields = ('id', 'user', 'created_at', 'company_name', 'title', 'description', 'location', 'salary')

