from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
from ITBS.models import Client
from ITBS.forms import ClientForm
from django.shortcuts import get_object_or_404
import json


# Create your views here.
def index(request):
    form = ClientForm()
    return render(request, 'ITBS/index.html', {'form': form})
