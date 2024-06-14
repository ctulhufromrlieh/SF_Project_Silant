from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from rest_framework.generics import ListAPIView, CreateAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import NOT, IsAuthenticated, DjangoModelPermissions

from .serializers import *
from .models import *

# Create your views here.

class CarSimpleListAPIView(ListAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializerSimple
    # permission_classes = [NOT(IsAuthenticated)]

class CarView(LoginRequiredMixin, ListCreateAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [DjangoModelPermissions]

    def is_visible_car(self, user, car):
        if not user:
            return False

        if Client.is_own(user):
            # return user.client.id == car['client__id']
            return user.client.id == car['client']
        
        if ServiceCompany.is_own(user):
            # return user.servicecompany.id == car['service_company__id']
            return user.servicecompany.id == car['service_company']
        
        if Manager.is_own(user):
            return True
        
        return False


    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)

        for car in response.data:
            # print(car)
            rec = Car.objects.get(id=car['id'])
            # car['car_model_name'] = rec.car_model.name
            # car['engine_model_name'] = rec.engine_model.name
            # car['transmission_model_name'] = rec.transmission_model.name
            # car['main_bridge_model_name'] = rec.main_bridge_model.name
            # car['steerable_bridge_model_name'] = rec.steerable_bridge_model.name
            if not self.is_visible_car(request.user, car):
                car['supply_agreement'] = "<classified>"
                car['factory_shipment_date'] = "<classified>"
                car['factory_shipment_date'] = "<classified>"
                car['consignee'] = "<classified>"
                car['shipment_address'] = "<classified>"
                car['add_options'] = "<classified>"
                # car['client__id'] = -1
                # car['client__name'] = "<classified>"
                car['client__name'] = "<classified>"
                car['client'] = -1
                # car['service_company__id'] = -1
                car['service_company__name'] = "<classified>"
                car['service_company'] = -1

        return response

    def get_queryset(self):
        return Car.objects.all()

class SingleCarView(RetrieveUpdateDestroyAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [DjangoModelPermissions]

# class CarCreateAPIView(CreateAPIView):
#     queryset = Car.objects.all()
#     serializer_class = CarSerializerFull
#     def perform_create(self, serializer):
#         author = get_object_or_404(Author, id=self.request.data.get('author_id'))
#         return serializer.save(author=author)
  
class MaintenanceView(ListCreateAPIView):
    serializer_class = MaintenanceSerializer
    permission_classes = [DjangoModelPermissions]

    def get_queryset(self):
        user = self.request.user

        if Client.is_own(user):
            return Maintenance.objects.all().filter(car__client__user=user)
        
        if ServiceCompany.is_own(user):
            return Maintenance.objects.all().filter(service_company__user=user)
        
        if Manager.is_own(user):
            return Maintenance.objects.all()

        return Maintenance.objects.none()
    
class SingleMaintenanceView(RetrieveUpdateDestroyAPIView):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer
    permission_classes = [DjangoModelPermissions]
    
class ReclamationView(LoginRequiredMixin, ListCreateAPIView):
    serializer_class = ReclamationSerializer
    permission_classes = [DjangoModelPermissions]

    def get_queryset(self):
        user = self.request.user

        if Client.is_own(user):
            return Reclamation.objects.all().filter(car__client__user=user)
        
        if ServiceCompany.is_own(user):
            return Reclamation.objects.all().filter(car__service_company__user=user)
        
        if Manager.is_own(user):
            return Reclamation.objects.all()

        return Reclamation.objects.none()
    
class SingleReclamationView(RetrieveUpdateDestroyAPIView):
    queryset = Reclamation.objects.all()
    serializer_class = ReclamationSerializer
    permission_classes = [DjangoModelPermissions]