import requests
from ebaysdk.finding import Connection
from django.conf import settings


def get_ebay_data(search_term, limit):
    api = Connection(domain="svcs.sandbox.ebay.com",
                     appid=settings.EBAY_APPID, config_file=None)
    data = {
        "keywords": search_term,
        "sortOrder": "PricePlusShippingLowest",
    }
    response = api.execute("findItemsAdvanced", data)
    if not api.error():
        response_dict = response.dict()
        results_count = response_dict['paginationOutput']['totalEntries']
        if int(results_count) > 0:
            return response_dict['searchResult']['item'][:limit]
        else:
            return []
    else:
        return []
