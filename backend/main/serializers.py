from .models import *
from rest_framework import serializers

class CarSerializerFull(serializers.ModelSerializer):
    car_model__name = serializers.CharField(source='car_model.name')
    engine_model__name = serializers.CharField(source='engine_model.name')
    transmission_model__name = serializers.CharField(source='transmission_model.name')
    main_bridge_model__name = serializers.CharField(source='main_bridge_model.name')
    steerable_bridge_model__name = serializers.CharField(source='steerable_bridge_model.name')
    client__id = serializers.IntegerField(source='client.id')
    client__name = serializers.CharField(source='client.name')
    service_company__id = serializers.IntegerField(source='service_company.id')
    service_company__name = serializers.CharField(source='service_company.name')

    class Meta:
        model = Car
        # fields = ('id', 'car_model__name', 'car_num', 'engine_model__name', 'engine_num', 'transmission_model__name', 'transmission_num', 
        #          'main_bridge_model__name', 'main_bridge_num', 'steerable_bridge_model__name', 'steerable_bridge_num', )
        fields = ('id', 'car_model__name', 'car_num', 'engine_model__name', 'engine_num', 'transmission_model__name', 'transmission_num', 
                 'main_bridge_model__name', 'main_bridge_num', 'steerable_bridge_model__name', 'steerable_bridge_num', 
                 'supply_agreement', 'factory_shipment_date', 'consignee', 'shipment_address', 'add_options', 
                 'client__id', 'client__name', 'service_company__id', 'service_company__name',
                 )
        
class CarSerializerSimple(serializers.ModelSerializer):
    car_model__name = serializers.CharField(source='car_model.name')
    engine_model__name = serializers.CharField(source='engine_model.name')
    transmission_model__name = serializers.CharField(source='transmission_model.name')
    main_bridge_model__name = serializers.CharField(source='main_bridge_model.name')
    steerable_bridge_model__name = serializers.CharField(source='steerable_bridge_model.name')

    class Meta:
        model = Car
        fields = ('id', 'car_model__name', 'car_num', 'engine_model__name', 'engine_num', 'transmission_model__name', 'transmission_num', 
                 'main_bridge_model__name', 'main_bridge_num', 'steerable_bridge_model__name', 'steerable_bridge_num', )

class MaintenanceSerializer(serializers.ModelSerializer):
    car__id = serializers.IntegerField(source='car.id')
    car__num = serializers.CharField(source='car.car_num')
    type__name = serializers.CharField(source='type.name')
    service_company__id = serializers.SerializerMethodField()
    service_company__name = serializers.SerializerMethodField()

    class Meta:
        model = Maintenance
        fields = ('id', 'car__id', 'car__num', 'type__name', 'maintenance_date', 'operating_time', 
                  'work_order_num', 'work_order_date', 'service_company__id', 'service_company__name',
                 )
        
    def get_service_company__id(self, obj):
        if obj.service_company:
            return obj.service_company.id
        else:
            return -1

    def get_service_company__name(self, obj):
        if obj.service_company:
            return obj.service_company.name
        else:
            return "самостоятельно"
        
class ReclamationSerializer(serializers.ModelSerializer):
    car__id = serializers.IntegerField(source='car.id')
    car__num = serializers.CharField(source='car.car_num')
    car__service_company__id = serializers.IntegerField(source='car.service_company.id')
    car__service_company__name = serializers.CharField(source='car.service_company.name')
    failure_node__name = serializers.CharField(source='failure_node.name')
    recovery_method__name = serializers.CharField(source='recovery_method.name')

    class Meta:
        model = Reclamation
        fields = ('id', 'car__id', 'car__num', 'car__service_company__id', 'car__service_company__name', 
                  'failure_date', 'operating_time', 'failure_node__name', 'failure_description', 
                  'recovery_method__name', 'repair_parts', 'recovery_date'
                 )