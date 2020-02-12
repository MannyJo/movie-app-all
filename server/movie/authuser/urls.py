from django.urls import path
from .views import (
    user_register,
    get_user_info,
    user_logout
)
from rest_framework.authtoken.views import obtain_auth_token

app_name = 'authuser'

urlpatterns = [
    path('register/', user_register, name='register'),
    path('login/', obtain_auth_token, name='login'),
    path('user_info/<email>/', get_user_info, name='user_info'),
    path('user_logout/', user_logout, name='logout')
]