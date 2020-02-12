# from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout
from .serializers import UserSerializer

# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request, email):
    data = {}
    if request.method == 'GET':
        try:
            user = User.objects.get(username=email)
        except User.DoesNotExist:
            data = {
                'response': 'User does not exist'
            }
            return Response(data=data)
        serializer = UserSerializer(user)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def user_register(request):
    data = {}
    if request.method == 'POST':
        checkUser = {}
        try:
            checkUser = User.objects.get(username=request.data['username'])
        except User.DoesNotExist:
            print('pass')

        if(checkUser):
            data['response'] = 'The email has already been taken'
            return Response(data=data)
        
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            data['email'] = user.username
            token = Token.objects.get(user=user).key
            data['token'] = token
        else:
            data = serializer.errors
        return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    if request.method == 'GET':
        logout(request)
    return Response({'response': 'successfully logged out'})