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

    # def to_representation(self, instance: Car):
    #     out = super().to_representation(instance)

    #     out['supply_agreement'] = "<classified>"
    #     out['factory_shipment_date'] = "<classified>"
    #     out['factory_shipment_date'] = "<classified>"
    #     out['consignee'] = "<classified>"
    #     out['shipment_address'] = "<classified>"
    #     out['add_options'] = "<classified>"
    #     out['client__name'] = "<classified>"
    #     out['service_company__name'] = "<classified>"

    #     return out

    class Meta:
        model = Car
        # fields = ('id', 'car_model__name', 'car_num', 'engine_model__name', 'engine_num', 'transmission_model__name', 'transmission_num', 
        #          'main_bridge_model__name', 'main_bridge_num', 'steerable_bridge_model__name', 'steerable_bridge_num', )
        fields = ('id', 'car_model__name', 'car_num', 'engine_model__name', 'engine_num', 'transmission_model__name', 'transmission_num', 
                 'main_bridge_model__name', 'main_bridge_num', 'steerable_bridge_model__name', 'steerable_bridge_num', 
                 'supply_agreement', 'factory_shipment_date', 'consignee', 'shipment_address', 'add_options', 
                 'client__id', 'client__name', 'service_company__id', 'service_company__name',
                 )

# class CategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Category
#         fields = ('id', 'name',)

# class DishSerializer(serializers.ModelSerializer):
#     class Meta: 
#         model = Dish
#         fields = ('id', 'title',)

# # class DishIngridientSerializer(serializers.ModelSerializer):
# #     class Meta: 
# #         task_extendeds = Task_extendedSerializer(many=True)
# #         model = DishIngridient
# #         fields = ('ingridient__id', 'ingridient__name', 'value',)
        

# class DishIngridientSerializer(serializers.ModelSerializer):
#     ingridient_id = serializers.IntegerField()
#     ingridient_name = serializers.CharField()

#     class Meta:         
#         model = DishIngridient
#         fields = ('ingridient_id', 'ingridient_name', 'value',)