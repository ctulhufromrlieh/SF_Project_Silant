from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
@api_view(["POST"],)
def logout(request):
    if request.method == "POST":
        print(request.user.auth_token)
        if hasattr(request.user, "auth_token"):
            request.user.auth_token.delete()
            return Response({"Message": "Logged out"}, status=status.HTTP_200_OK)
        else:
            return Response({"Message": "Unauthorized user"}, status=status.HTTP_401_UNAUTHORIZED)
