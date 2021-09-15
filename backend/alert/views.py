import json
from rest_framework import viewsets
from .serializers import AlertSerializer
from .models import Alert


class AlertView(viewsets.ModelViewSet):
    serializer_class = AlertSerializer
    queryset = Alert.objects.all()
