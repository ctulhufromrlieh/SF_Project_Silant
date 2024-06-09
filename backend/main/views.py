from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.generics import ListAPIView

from .serializers import *
from .models import *

# Create your views here.
class CarListAPIView(ListAPIView):
    serializer_class = CarSerializerFull

    def is_visible_car(self, user: User, car):
        if not user:
            return False
        
        print(car)

        if Client.is_own(user):
            return user.client.id == car['client__id']
        
        if ServiceCompany.is_own(user):
            return user.servicecompany.id == car['service_company__id']
        
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