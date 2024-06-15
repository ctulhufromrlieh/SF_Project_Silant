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

from main.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path("accounts/", include("allauth.urls")),

    path('car_models/', CarModelView.as_view(), name='api_car_models'),
    path('car_models/<int:pk>', SingleCarModelView.as_view(), name='api_single_car_model'),
    path('engine_models/', EngineModelView.as_view(), name='api_engine_models'),
    path('engine_models/<int:pk>', SingleEngineModelView.as_view(), name='api_single_engine_model'),
    path('transmission_models/', TransmissionModelView.as_view(), name='api_transmission_models'),
    path('transmission_models/<int:pk>', SingleTransmissionModelView.as_view(), name='api_single_transmission_model'),
    path('main_bridge_models/', MainBridgeModelView.as_view(), name='api_main_bridge_models'),
    path('main_bridge_models/<int:pk>', SingleMainBridgeModelView.as_view(), name='api_single_main_bridge_model'),
    path('steerable_bridge_models/', SteerableBridgeModelView.as_view(), name='api_steerable_bridge_models'),
    path('steerable_bridge_models/<int:pk>', SingleSteerableBridgeModelView.as_view(), name='api_single_steerable_bridge_model'),
    path('maintenance_types/', MaintenanceTypeView.as_view(), name='api_maintenance_types'),
    path('maintenance_types/<int:pk>', SingleMaintenanceTypeView.as_view(), name='api_single_maintenance_type'),
    path('failure_nodes/', FailureNodeView.as_view(), name='api_failure_nodes'),
    path('failure_nodes/<int:pk>', SingleFailureNodeView.as_view(), name='api_single_failure_node'),
    path('recovery_methods/', RecoveryMethodView.as_view(), name='api_recovery_methods'),
    path('recovery_methods/<int:pk>', SingleRecoveryMethodView.as_view(), name='api_single_recovery_method'),

    path('simple_cars/', CarSimpleListAPIView.as_view(), name='api_simple_cars'),    
    path('cars/', CarView.as_view(), name='api_cars'),
    path('cars/<int:pk>', SingleCarView.as_view(), name='api_single_car'),
    path('maintenances/', MaintenanceView.as_view(), name='api_maintenances'),
    path('maintenances/<int:pk>', SingleMaintenanceView.as_view(), name='api_single_maintenance'),
    path('reclamations/', ReclamationView.as_view(), name='api_reclamations'),
    path('reclamations/<int:pk>', SingleReclamationView.as_view(), name='api_single_reclamation'),
    path('openapi', get_schema_view(
        title="Silant",
        description="API for Silant"
    ), name='openapi-schema'),
]
