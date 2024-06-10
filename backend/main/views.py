from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from rest_framework.generics import ListAPIView

from .serializers import *
from .models import *

# Create your views here.

class CarFullListAPIView(LoginRequiredMixin, ListAPIView):
    serializer_class = CarSerializerFull

    def is_visible_car(self, user, car):
        if not user:
            return False

        if Client.is_own(user):
            return user.client.id == car['client__id']
        
        if ServiceCompany.is_own(user):
            return user.servicecompany.id == car['service_company__id']
        
        if Manager.is_own(user):
            return True
        
        return False


    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)

        for car in response.data:
            if not self.is_visible_car(request.user, car):
                car['supply_agreement'] = "<classified>"
                car['factory_shipment_date'] = "<classified>"
                car['factory_shipment_date'] = "<classified>"
                car['consignee'] = "<classified>"
                car['shipment_address'] = "<classified>"
                car['add_options'] = "<classified>"
                car['client__id'] = -1
                car['client__name'] = "<classified>"
                car['service_company__id'] = -1
                car['service_company__name'] = "<classified>"

        return response

    def get_queryset(self):
        return Car.objects.all()
    
class CarSimpleListAPIView(ListAPIView):
    serializer_class = CarSerializerFull

    def get_queryset(self):
        return Car.objects.all()
    
class MaintenanceListAPIView(LoginRequiredMixin, ListAPIView):
    serializer_class = MaintenanceSerializer

    def get_queryset(self):
        user = self.request.user
        print(user)

        if Client.is_own(user):
            print("Client")
            return Maintenance.objects.all().filter(car__client__user=user)
        
        if ServiceCompany.is_own(user):
            print("ServiceCompany")
            return Maintenance.objects.all().filter(service_company__user=user)
        
        if Manager.is_own(user):
            return Maintenance.objects.all()

        return Maintenance.objects.none()
    
class ReclamationListAPIView(LoginRequiredMixin, ListAPIView):
    serializer_class = ReclamationSerializer

    def get_queryset(self):
        user = self.request.user
        print(user)

        if Client.is_own(user):
            print("Client")
            return Reclamation.objects.all().filter(car__client__user=user)
        
        if ServiceCompany.is_own(user):
            print("ServiceCompany")
            return Reclamation.objects.all().filter(car__service_company__user=user)
        
        if Manager.is_own(user):
            return Reclamation.objects.all()

        return Reclamation.objects.none()