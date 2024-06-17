from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from rest_framework.generics import ListAPIView, CreateAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import NOT, IsAuthenticated, DjangoModelPermissions

from .serializers import *
from .models import *
from .querysets import *

# Create your views here.

class CarModelView(ListCreateAPIView):
    queryset = CarModel.objects.all()
    serializer_class = CarModelSerializer
    permission_classes = [DjangoModelPermissions]

class SingleCarModelView(RetrieveUpdateDestroyAPIView):
    queryset = CarModel.objects.all()
    serializer_class = CarModelSerializer
    permission_classes = [DjangoModelPermissions]

class EngineModelView(ListCreateAPIView):
    queryset = EngineModel.objects.all()
    serializer_class = EngineModelSerializer
    permission_classes = [DjangoModelPermissions]

class SingleEngineModelView(RetrieveUpdateDestroyAPIView):
    queryset = EngineModel.objects.all()
    serializer_class = EngineModelSerializer
    permission_classes = [DjangoModelPermissions]

class TransmissionModelView(ListCreateAPIView):
    queryset = TransmissionModel.objects.all()
    serializer_class = TransmissionModelSerializer
    permission_classes = [DjangoModelPermissions]

class SingleTransmissionModelView(RetrieveUpdateDestroyAPIView):
    queryset = TransmissionModel.objects.all()
    serializer_class = TransmissionModelSerializer
    permission_classes = [DjangoModelPermissions]

class MainBridgeModelView(ListCreateAPIView):
    queryset = MainBridgeModel.objects.all()
    serializer_class = MainBridgeModelSerializer
    permission_classes = [DjangoModelPermissions]

class SingleMainBridgeModelView(RetrieveUpdateDestroyAPIView):
    queryset = MainBridgeModel.objects.all()
    serializer_class = MainBridgeModelSerializer
    permission_classes = [DjangoModelPermissions]

class SteerableBridgeModelView(ListCreateAPIView):
    queryset = SteerableBridgeModel.objects.all()
    serializer_class = SteerableBridgeModelSerializer
    permission_classes = [DjangoModelPermissions]

class SingleSteerableBridgeModelView(RetrieveUpdateDestroyAPIView):
    queryset = SteerableBridgeModel.objects.all()
    serializer_class = SteerableBridgeModelSerializer
    permission_classes = [DjangoModelPermissions]

class MaintenanceTypeView(ListCreateAPIView):
    queryset = MaintenanceType.objects.all()
    serializer_class = MaintenanceTypeSerializer
    permission_classes = [DjangoModelPermissions]

class SingleMaintenanceTypeView(RetrieveUpdateDestroyAPIView):
    queryset = MaintenanceType.objects.all()
    serializer_class = MaintenanceTypeSerializer
    permission_classes = [DjangoModelPermissions]

class FailureNodeView(ListCreateAPIView):
    queryset = FailureNode.objects.all()
    serializer_class = FailureNodeSerializer
    permission_classes = [DjangoModelPermissions]

class SingleFailureNodeView(RetrieveUpdateDestroyAPIView):
    queryset = FailureNode.objects.all()
    serializer_class = FailureNodeSerializer
    permission_classes = [DjangoModelPermissions]

class RecoveryMethodView(ListCreateAPIView):
    queryset = RecoveryMethod.objects.all()
    serializer_class = RecoveryMethodSerializer
    permission_classes = [DjangoModelPermissions]

class SingleRecoveryMethodView(RetrieveUpdateDestroyAPIView):
    queryset = RecoveryMethod.objects.all()
    serializer_class = RecoveryMethodSerializer
    permission_classes = [DjangoModelPermissions]

class CarSimpleListAPIView(ListAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializerSimple
    # permission_classes = [NOT(IsAuthenticated)]

class CarView(ListCreateAPIView):
    # queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [DjangoModelPermissions]
    ordering = ["factory_shipment_date",]

    def get_queryset(self):
        # order = self.request.GET.get('orderby', 'give-default-value')
        # new_context = Update.objects.filter(
            # state=filter_val,
        # ).order_by(order)
        # return new_context
    
        return get_car_queryset(self.request, True)

    def is_visible_car(self, user, car):
        if not user:
            return False

        if user.client:
            return user.client.id == car['client']
        if user.service_company:
            return user.servicecompany.id == car['service_company']
        if user.manager:
            return True

        # if Client.is_own(user):
        #     return user.client.id == car['client']
        
        # if ServiceCompany.is_own(user):
        #     return user.servicecompany.id == car['service_company']
        
        # if Manager.is_own(user):
        #     return True
        
        return False


    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)

        # hide foreign cars
        for car in response.data:
            rec = Car.objects.get(id=car['id'])
            if not self.is_visible_car(request.user, car):
                car['supply_agreement'] = "<classified>"
                car['factory_shipment_date'] = "<classified>"
                car['factory_shipment_date'] = "<classified>"
                car['consignee'] = "<classified>"
                car['shipment_address'] = "<classified>"
                car['add_options'] = "<classified>"
                car['client__name'] = "<classified>"
                car['client'] = -1
                car['service_company__name'] = "<classified>"
                car['service_company'] = -1

        return response

class SingleCarView(RetrieveUpdateDestroyAPIView):
    # queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [DjangoModelPermissions]

    def get_queryset(self):
        return get_car_queryset(self.request, False)

    # def get_queryset(self):
    #     user = self.request.user

    #     if user.client:
    #         return Car.objects.all().filter(client__user=user)
    #     if user.service_company:
    #         return Car.objects.all().filter(service_company__user=user)
    #     if user.manager:
    #         return Car.objects.all()

    #     # if Client.is_own(user):
    #     #     return Car.objects.all().filter(client__user=user)
        
    #     # if ServiceCompany.is_own(user):
    #     #     return Maintenance.objects.all().filter(service_company__user=user)
        
    #     # if Manager.is_own(user):
    #     #     return Maintenance.objects.all()

    #     return Car.objects.none()
  
class MaintenanceView(ListCreateAPIView):
    serializer_class = MaintenanceSerializer
    permission_classes = [DjangoModelPermissions]
    ordering = ["maintenance_date",]

    # def get_queryset(self):
    #     user = self.request.user

    #     if user.client:
    #         return Maintenance.objects.all().filter(car__client__user=user)
    #     if user.service_company:
    #         return Maintenance.objects.all().filter(service_company__user=user)
    #     if user.manager:
    #         return Maintenance.objects.all()

    #     # if Client.is_own(user):
    #     #     return Maintenance.objects.all().filter(car__client__user=user)
        
    #     # if ServiceCompany.is_own(user):
    #     #     return Maintenance.objects.all().filter(service_company__user=user)
        
    #     # if Manager.is_own(user):
    #     #     return Maintenance.objects.all()

    #     return Maintenance.objects.none()

    def get_queryset(self):
        return get_maintenance_queryset(self.request)
    
class SingleMaintenanceView(RetrieveUpdateDestroyAPIView):
    # queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer
    permission_classes = [DjangoModelPermissions]

    # def get_queryset(self):
    #     user = self.request.user

    #     if user.client:
    #         return Maintenance.objects.all().filter(car__client__user=user)
    #     if user.service_company:
    #         return Maintenance.objects.all().filter(service_company__user=user)
    #     if user.manager:
    #         return Maintenance.objects.all()

    #     # if Client.is_own(user):
    #     #     return Maintenance.objects.all().filter(car__client__user=user)
        
    #     # if ServiceCompany.is_own(user):
    #     #     return Maintenance.objects.all().filter(service_company__user=user)
        
    #     # if Manager.is_own(user):
    #     #     return Maintenance.objects.all()

    #     return Maintenance.objects.none()
    def get_queryset(self):
        return get_maintenance_queryset(self.request)
    
class ReclamationView(ListCreateAPIView):
    serializer_class = ReclamationSerializer
    permission_classes = [DjangoModelPermissions]
    ordering = ["failure_date",]

    # def get_queryset(self):
    #     # return Reclamation.objects.all()
    #     user = self.request.user

    #     if user.client:
    #         return Reclamation.objects.all().filter(car__client__user=user)
    #     if user.service_company:
    #         return Reclamation.objects.all().filter(car__service_company__user=user)
    #     if user.manager:
    #         return Reclamation.objects.all()

    #     # if Client.is_own(user):
    #     #     return Reclamation.objects.all().filter(car__client__user=user)
        
    #     # if ServiceCompany.is_own(user):
    #     #     return Reclamation.objects.all().filter(car__service_company__user=user)
        
    #     # if Manager.is_own(user):
    #     #     return Reclamation.objects.all()

    #     return Reclamation.objects.none()

    def get_queryset(self):
        return get_reclamation_queryset(self.request)
    
class SingleReclamationView(RetrieveUpdateDestroyAPIView):
    # queryset = Reclamation.objects.all()
    serializer_class = ReclamationSerializer
    permission_classes = [DjangoModelPermissions]

    # def get_queryset(self):
    #     # return Reclamation.objects.all()
    #     user = self.request.user

    #     if user.client:
    #         return Reclamation.objects.all().filter(car__client__user=user)
    #     if user.service_company:
    #         return Reclamation.objects.all().filter(car__service_company__user=user)
    #     if user.manager:
    #         return Reclamation.objects.all()

    #     # if Client.is_own(user):
    #     #     return Reclamation.objects.all().filter(car__client__user=user)
        
    #     # if ServiceCompany.is_own(user):
    #     #     return Reclamation.objects.all().filter(car__service_company__user=user)
        
    #     # if Manager.is_own(user):
    #     #     return Reclamation.objects.all()

    #     return Reclamation.objects.none()
    
    def get_queryset(self):
        return get_reclamation_queryset(self.request)