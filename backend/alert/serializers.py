from rest_framework import serializers
from .models import Alert


class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = ('id', 'email', 'search_term', 'interval_time')
