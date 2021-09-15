from ..models import Alert, AlertCheapestProduct
from alert.services.ebayService import get_ebay_data
from alert.services.consumer import consume_one_message
from django.conf import settings
from django.core import mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags


def results_email(subject, alert, results):
    """ Send email with results to certain email """
    context = {"alert": alert, "results": results}
    html_message = render_to_string('results_email.html', context)
    plain_message = strip_tags(html_message)
    return mail.send_mail(subject, plain_message, settings.EMAIL_HOST_USER, [
        alert.email], html_message=html_message)


def insight_email(subject, to_email, body):
    """ Send email with insights to certain email """
    context = {"body": body}
    html_message = render_to_string('insight_email.html', context)
    plain_message = strip_tags(html_message)
    return mail.send_mail(subject, plain_message, settings.EMAIL_HOST_USER, [
        to_email], html_message=html_message)


def _check_cheapest_product(alert, data):
    """
    Get results of search term for each alert and check if the lowest price 
    less than cheapest price that is stored then sent the email 
    """
    results = get_ebay_data(alert.search_term, 1)
    if results:
        cheapest_product = results[0]
        result_cheapest_product = float(
            cheapest_product['sellingStatus']['currentPrice']['value'])
        # Get cheapest product price for that alert
        alert_cheapest_product = AlertCheapestProduct.objects.filter(
            alert_id=alert.id).first()
        if alert_cheapest_product:
            if alert_cheapest_product.price > result_cheapest_product:
                alert_cheapest_product.cheapest_product = cheapest_product['title']
                alert_cheapest_product.price = result_cheapest_product
                alert_cheapest_product.save()
                insight_email(data['subject'], alert.email, data['body'])
        else:
            AlertCheapestProduct.objects.create(
                alert_id=alert, cheapest_product=cheapest_product['title'], price=result_cheapest_product)
            insight_email(data['subject'], alert.email, data['body'])


def send_alert_email(frequency):
    alerts = Alert.objects.filter(interval_time=frequency)
    for alert in alerts:
        results = get_ebay_data(alert.search_term, 20)
        if results:
            # Get cheapest price and store it in DB for further usage (Insights)
            cheapest_product = results[0]
            result_cheapest_product = float(
                cheapest_product['sellingStatus']['currentPrice']['value'])
            alert_cheapest_product = AlertCheapestProduct.objects.filter(
                alert_id=alert.id).first()
            # Check if cheapest price in less than one in DB
            if alert_cheapest_product:
                if alert_cheapest_product.price > result_cheapest_product:
                    alert_cheapest_product.cheapest_product = cheapest_product['title']
                    alert_cheapest_product.price = result_cheapest_product
                    alert_cheapest_product.save()
            else:
                AlertCheapestProduct.objects.create(
                    alert_id=alert, cheapest_product=cheapest_product['title'], price=result_cheapest_product)
            results_email("Your Search Results", alert, results)


def get_insights_and_send_emails():
    # Call consumer to pul message by message
    data = consume_one_message()
    # Make sure that message contains needed data
    if 'type' and 'subject' and 'body' in data:
        alerts = Alert.objects.all()
        for alert in alerts:
            # Check message type
            if data['type'] == 'CheapestProductInsight':
                _check_cheapest_product(alert, data)
