from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
from ITBS.models import Client
from ITBS.forms import ClientForm
from django.shortcuts import get_object_or_404
import json


# Index view.
def index(request):
    form = ClientForm()
    return render(request, 'ITBS/index.html', {'form': form})


# Get list of clients.
def select_clients(request):
    if request.is_ajax() and request.method == 'POST':
        clients_list = Client.objects.all()
        template = loader.get_template('ITBS/clTable.html')
        context = RequestContext(request, {
            'clients_list': clients_list,
        })
        return HttpResponse(template.render(context))
    else:
        return False


# Delete client
def delete_client(request):
    if request.is_ajax() and request.method == 'POST':
        query = json.loads((request.body).decode())
        client_id = query['client_id']
        Client.objects.filter(id=client_id).delete()
        return HttpResponse(select_clients(request))
    else:
        return False


# Add client
def add_client(request):
    if request.is_ajax() and request.method == 'POST':
        query = json.loads((request.body).decode())
        form = ClientForm(query)
        if form.is_valid():
            form.save()
            return HttpResponse(select_clients(request))
        else:
            template = loader.get_template('ITBS/validation.html')
            context = RequestContext(request, {
                'form': form,
            })
            return HttpResponse(template.render(context))
    else:
        return False


# Prepare form for update
def upd_prepare(request):
    if request.is_ajax() and request.method == 'POST':
        query = json.loads((request.body).decode())
        client_id = query['client_id']
        chosen_client = Client.objects.get(id=client_id)
        form = ClientForm(instance=chosen_client)
        template = loader.get_template('ITBS/upForm.html')
        context = RequestContext(request, {
            'form': form,
            'client_id': client_id,
        })
        return HttpResponse(template.render(context))
    else:
        return False


# Update client
def update_client(request):
    if request.is_ajax() and request.method == 'POST':
        query = json.loads((request.body).decode())
        client_id=query['client_id']
        instance = get_object_or_404(Client, id=client_id)
        form = ClientForm(query, instance=instance)
        if form.is_valid():
            form.save()
            return HttpResponse(select_clients(request))
        else:
            template = loader.get_template('ITBS/validation.html')
            context = RequestContext(request, {
                'form': form,
            })
            return HttpResponse(template.render(context))
    else:
        return False
