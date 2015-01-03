from ITBS.models import Client
from django.forms import ModelForm


class ClientForm(ModelForm):
    class Meta:
        model = Client
        fields = '__all__'
