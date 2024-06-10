"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.schemas import get_schema_view

from main.views import CarFullListAPIView, CarSimpleListAPIView, MaintenanceListAPIView, ReclamationListAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("accounts/", include("allauth.urls")),
    path('cars/', CarFullListAPIView.as_view(), name='api_cars'),
    path('simple_cars/', CarSimpleListAPIView.as_view(), name='api_simple_cars'),
    path('maintenances/', MaintenanceListAPIView.as_view(), name='api_maintenances'),
    path('reclamations/', ReclamationListAPIView.as_view(), name='api_reclamations'),
    path('openapi', get_schema_view(
        title="Silant",
        description="API for Silant"
    ), name='openapi-schema'),
]
