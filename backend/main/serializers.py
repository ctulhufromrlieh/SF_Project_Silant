from .models import *
from rest_framework import serializers

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('id', 'name')

class ServiceCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCompany
        fields = ('id', 'name', 'description')

class CarModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarModel
        fields = ('id', 'name', 'description',)

class EngineModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = EngineModel
        fields = ('id', 'name', 'description',)

class TransmissionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransmissionModel
        fields = ('id', 'name', 'description',)

class MainBridgeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainBridgeModel
        fields = ('id', 'name', 'description',)

class SteerableBridgeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = SteerableBridgeModel
        fields = ('id', 'name', 'description',)

class MaintenanceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaintenanceType
        fields = ('id', 'name', 'description',)

class FailureNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FailureNode
        fields = ('id', 'name', 'description',)

class RecoveryMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecoveryMethod
        fields = ('id', 'name', 'description',)
        
class CarSerializerSimple(serializers.ModelSerializer):
    car_model__name = serializers.CharField(source='car_model.name', required=False, allow_null=True, )
    engine_model__name = serializers.CharField(source='engine_model.name', required=False, allow_null=True, )
    transmission_model__name = serializers.CharField(source='transmission_model.name', required=False, allow_null=True, )
    main_bridge_model__name = serializers.CharField(source='main_bridge_model.name', required=False, allow_null=True, )
    steerable_bridge_model__name = serializers.CharField(source='steerable_bridge_model.name', required=False, allow_null=True, )

    class Meta:
        model = Car
        fields = ('id', 'car_model__name', 'car_num', 'engine_model__name', 'engine_num', 'transmission_model__name', 'transmission_num', 
                 'main_bridge_model__name', 'main_bridge_num', 'steerable_bridge_model__name', 'steerable_bridge_num', )
        
class CarSerializer(serializers.ModelSerializer):
    car_model__name = serializers.CharField(source='car_model.name', required=False, allow_null=True, )
    engine_model__name = serializers.CharField(source='engine_model.name', required=False, allow_null=True, )
    transmission_model__name = serializers.CharField(source='transmission_model.name', required=False, allow_null=True, )
    main_bridge_model__name = serializers.CharField(source='main_bridge_model.name', required=False, allow_null=True, )
    steerable_bridge_model__name = serializers.CharField(source='steerable_bridge_model.name', required=False, allow_null=True, )
    client__name = serializers.CharField(source='client.name', required=False, allow_null=True, )
    service_company__name = serializers.CharField(source='service_company.name', required=False, allow_null=True, )

    # def get_validation_exclusions(self):
    #     exclusions = super(FavoriteListSerializer, self).get_validation_exclusions()
    #     return exclusions + ['owner']

    class Meta:
        model = Car
        fields = ('id', 'car_model', 'car_model__name', 'car_num', 
                  'engine_model', 'engine_model__name', 'engine_num', 
                 'transmission_model', 'transmission_model__name', 'transmission_num', 
                 'main_bridge_model', 'main_bridge_model__name', 'main_bridge_num', 
                 'steerable_bridge_model', 'steerable_bridge_model__name', 'steerable_bridge_num', 
                 'supply_agreement', 'factory_shipment_date', 'consignee', 'shipment_address', 'add_options', 
                 'client', 'client__name', 'service_company', 'service_company__name'
                 )

class MaintenanceSerializer(serializers.ModelSerializer):
    # car__id = serializers.IntegerField(source='car.id')
    car__num = serializers.CharField(source='car.car_num')
    type__name = serializers.CharField(source='type.name')
    # service_company__id = serializers.SerializerMethodField()
    service_company__name = serializers.SerializerMethodField()

    class Meta:
        model = Maintenance
        # fields = ('id', 'car__id', 'car__num', 'type__name', 'maintenance_date', 'operating_time', 
        #           'work_order_num', 'work_order_date', 'service_company__id', 'service_company__name',
        #          )
        fields = ('id', 'car', 'car__num', 'type', 'type__name', 'maintenance_date', 'operating_time', 
                  'work_order_num', 'work_order_date', 'service_company', 'service_company__name',
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
    # car__id = serializers.IntegerField(source='car.id')
    car__num = serializers.CharField(source='car.car_num')
    car__service_company__id = serializers.IntegerField(source='car.service_company.id')
    car__service_company__name = serializers.CharField(source='car.service_company.name')
    failure_node__name = serializers.CharField(source='failure_node.name')
    recovery_method__name = serializers.CharField(source='recovery_method.name')
    # downtime = serializers.IntegerField(source='downtime')

    class Meta:
        model = Reclamation
        # fields = ('id', 'car__id', 'car__num', 'car__service_company__id', 'car__service_company__name', 
        #           'failure_date', 'operating_time', 'failure_node__name', 'failure_description', 
        #           'recovery_method__name', 'repair_parts', 'recovery_date'
        #          )
        fields = ('id', 'car', 'car__num', 'car__service_company__id', 'car__service_company__name', 
                  'failure_date', 'operating_time', 'failure_node', 'failure_node__name', 'failure_description', 
                  'recovery_method', 'recovery_method__name', 'repair_parts', 'recovery_date', 'downtime'
                 )