from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, unique=True, help_text="Client name")

    def __str__(self):
        return self.name

class ServiceCompany(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, unique=True, help_text="Service company name")
    description = models.TextField(default="", help_text="Service company description", blank=True)

    def __str__(self):
        return self.name

class Manager(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

class CarModel(models.Model):
    name = models.CharField(max_length=255, unique=True, help_text="Car model name")
    description = models.TextField(default="", help_text="Car model description", blank=True)

    def __str__(self):
        return self.name

class EngineModel(models.Model):
    name = models.CharField(max_length=255, unique=True, help_text="Engine model name")
    description = models.TextField(default="", help_text="Engine model description", blank=True)

    def __str__(self):
        return self.name

class TransmissionModel(models.Model):
    name = models.CharField(max_length=255, unique=True, help_text="Transmission model name")
    description = models.TextField(default="", help_text="Transmission model description", blank=True)

    def __str__(self):
        return self.name

class MainBridgeModel(models.Model):
    name = models.CharField(max_length=255, unique=True, help_text="Main bridge model name")
    description = models.TextField(default="", help_text="Main bridge model description", blank=True)

    def __str__(self):
        return self.name

class SteerableBridgeModel(models.Model):
    name = models.CharField(max_length=255, unique=True, help_text="Steerable bridge model name")
    description = models.TextField(default="",  help_text="Steerable bridge model description", blank=True)

    def __str__(self):
        return self.name

class MaintenanceType(models.Model):
    name = models.CharField(max_length=255, unique=True, help_text="Maintenance type name")
    description = models.TextField(default="", help_text="Maintenance type description", blank=True)

    def __str__(self):
        return self.name

class FailureNode(models.Model):
    name = models.CharField(max_length=255, unique=True, help_text="Failure node name")
    description = models.TextField(default="", help_text="Failure node description", blank=True)

    def __str__(self):
        return self.name

class RecoveryMethod(models.Model):
    name = models.CharField(max_length=255, unique=True, help_text="Recovery method name")
    description = models.TextField(default="", help_text="Recovery method description", blank=True)

    def __str__(self):
        return self.name

class Car(models.Model):
    car_model = models.ForeignKey(CarModel, on_delete=models.CASCADE)
    car_num = models.CharField(max_length=255, unique=True, help_text="Car factory number")
    engine_model = models.ForeignKey(EngineModel, on_delete=models.CASCADE)
    engine_num = models.CharField(max_length=255, unique=True, help_text="Engine factory number")
    transmission_model = models.ForeignKey(TransmissionModel, on_delete=models.CASCADE)
    transmission_num = models.CharField(max_length=255, unique=True, help_text="Transmission factory number")
    main_bridge_model = models.ForeignKey(MainBridgeModel, on_delete=models.CASCADE)
    main_bridge_num = models.CharField(max_length=255, unique=True, help_text="Main bridge factory number")
    steerable_bridge_model = models.ForeignKey(SteerableBridgeModel, on_delete=models.CASCADE)
    steerable_bridge_num = models.CharField(max_length=255, unique=True, help_text="Steerable bridge factory number")
    supply_agreement = models.CharField(max_length=255, help_text="Supply agreement num, date")
    factory_shipment_date = models.DateTimeField(help_text="Date of shipment from factory")
    consignee = models.CharField(max_length=255, help_text="Shipment receiver")
    shipment_address = models.CharField(max_length=255, help_text="Address of shipment")
    add_options = models.TextField(default="", help_text="Additional options")
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.car_model.name} | {self.car_num}"

class Maintenance(models.Model):
    type = models.ForeignKey(MaintenanceType, on_delete=models.CASCADE)
    maintenance_date = models.DateTimeField(help_text="Date of shipment from factory")
    operating_time = models.FloatField(help_text="Operating time")
    work_order_num = models.CharField(max_length=255, unique=True, help_text="Number of work order")
    work_order_date = models.DateTimeField(help_text="Date of work order")
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    # maintenance_company = models.ForeignKey(ServiceCompany, on_delete=models.CASCADE)
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.car.car_num} | {self.type}"

class Reclamation(models.Model):
    failure_date = models.DateTimeField(help_text="Date of failure")
    operating_time = models.FloatField(help_text="Operating time")
    failure_node = models.ForeignKey(FailureNode, on_delete=models.CASCADE)
    failure_description = models.TextField(default="", help_text="Failure description")
    recovery_method = models.ForeignKey(RecoveryMethod, on_delete=models.CASCADE)
    repair_parts = models.TextField(default="", help_text="Repair parts")
    recovery_date = models.DateTimeField(help_text="Date of recovery")
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.CASCADE)

    @property
    def downtime(self):
        # return f"{(self.recovery_date - self.failure_date).days} days"
        return (self.recovery_date - self.failure_date).days
