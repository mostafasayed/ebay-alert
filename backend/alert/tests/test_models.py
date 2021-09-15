from django.test import TestCase
from alert.models import Alert
from django.db.backends.sqlite3.base import IntegrityError


class AlertModelTest(TestCase):
    def setUp(self):
        Alert.objects.create(
            email="test@example.com", search_term="shoe", interval_time="2")

    def test_duplicate_email_search_term(self):
        """Can not duplicate same email and search term"""
        with self.assertRaises(Exception) as raised:
            Alert.objects.create(
                email="test@example.com", search_term="shoe", interval_time="2")
        self.assertEqual(IntegrityError, type(raised.exception))
