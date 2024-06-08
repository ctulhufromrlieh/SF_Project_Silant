from django.contrib.auth.models import Group

from .models import *


def create_client(name, username, email, password):
    user = User.objects.create(username=username, password=password, email=email)
    clients_group = Group.objects.get(name='clients')
    user.groups.add(clients_group)

    return Client.objects.create(name=name, user=user)

def create_service_company(name, description, username, email, password):
    user = User.objects.create(username=username, password=password, email=email)
    service_companies_group = Group.objects.get(name='service_companies')
    user.groups.add(service_companies_group)

    return ServiceCompany.objects.create(name=name, description=description, user=user)

def create_manager(first_name, last_name, username, email, password):
    user = User.objects.create(username=username, password=password, email=email, first_name=first_name, last_name=last_name)
    managers_group = Group.objects.get(name='managers')
    user.groups.add(managers_group)

    return Manager.objects.create(user=user)