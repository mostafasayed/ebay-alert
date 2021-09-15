from django.db import models

# Create your models here.


class Alert(models.Model):
    INTERVAL_CHOICES = [
        ("2", '2 Mins'),
        ("10", '10 Mins'),
        ("30", '30 Mins'),
    ]

    email = models.EmailField(blank=False)
    search_term = models.CharField(max_length=250)
    interval_time = models.CharField(
        max_length=2, choices=INTERVAL_CHOICES, default="2")

    class Meta:
        unique_together = [["search_term", "email"]]

    def _str_(self):
        return self.email + "Serach For: " + self.search_term


class AlertCheapestProduct(models.Model):

    alert_id = models.ForeignKey('Alert', on_delete=models.CASCADE)
    cheapest_product = models.CharField(max_length=250)
    price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return "Cheapest Product For alert: " + self.alert_id.search_term + " is " + self.cheapest_product + ": " + str(self.price)
