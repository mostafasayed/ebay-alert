from django.test import TestCase
from ..services.cron import results_email, insight_email
from unittest.mock import Mock
from alert.models import Alert


class AlertServicesTest(TestCase):

    def setUp(self):
        Alert.objects.create(
            email="test@example.com", search_term="shoe", interval_time="2")

    def test_send_results_email_successfully(self):
        """ Test we can send reults in email"""
        alert = Alert.objects.get(id=1)
        results = [{'title': 'Title 1', 'sellingStatus': {
            'currentPrice': {'value': 2}}}]
        response = results_email("Results", alert, results)
        self.assertEqual(response, 1)

    def test_send_insight_email_successfully(self):
        """ Test we can send insights email"""
        body = "Insights data"
        response = insight_email("Insights", "test@example.com", body)
        self.assertEqual(response, 1)

    def test_get_ebay_data(self):
        """ Mock up ebay data """
        results = [
            {'title': 'Title 1', 'sellingStatus': {
                'currentPrice': {'value': 2}}}
        ]
        get_ebay_data = Mock(return_value=results)
        response = get_ebay_data()
        self.assertListEqual(response, results)
