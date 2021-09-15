from django.test import TestCase
from alert.models import Alert


class AlertViewTest(TestCase):
    def setUp(self):
        Alert.objects.create(
            email="test@example.com", search_term="shoe", interval_time="2")

    def test_view_url_exists_api_alerts(self):
        """Test Existance of api for alerts"""
        response = self.client.get('/api/alerts/')
        self.assertEqual(response.status_code, 200)
