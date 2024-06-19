from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from main.models import Client, ServiceCompany, Manager

# Create your views here.
@api_view(["POST",])
def logout(request):
    if request.method == "POST":
        # print(request.user.auth_token)
        if hasattr(request.user, "auth_token"):
            request.user.auth_token.delete()
            return Response({"Message": "Logged out"}, status=status.HTTP_200_OK)
        else:
            return Response({"Message": "Unauthorized user"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(["GET",])
def account_info(request):
    if request.method == "GET":
        user = request.user

        account_type = 'ACCOUNT_TYPE_OTHER'
        print(user)
        if user:
            if Client.is_own(user):
                account_type = 'ACCOUNT_TYPE_CLIENT'
            elif ServiceCompany.is_own(user):
                account_type = 'ACCOUNT_TYPE_SERVICE_COMPANY'
            elif Manager.is_own(user):
                account_type = 'ACCOUNT_TYPE_MANAGER'
            elif user.is_staff:
                account_type = 'ACCOUNT_TYPE_ADMIN'

        return Response({"account_type": account_type})