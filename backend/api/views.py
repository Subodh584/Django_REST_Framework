import json
from django.shortcuts import render
from django.http import JsonResponse
from products.models import Product
from rest_framework.decorators import api_view
from rest_framework.response import Response
from products.serializers import PrimaryProductSerializer
# Create your views here.
@api_view(["GET"])
def api_home(request, *args, **kwargs):
    # body = request.body
    # try:
    #     data = json.loads(body)
    # except:
    #     pass
    # print(request.GET)
    # return JsonResponse({"message": "Hello, this is your API Response!"})
    instance = Product.objects.all().order_by("?").first()
    data = {}
    # if model_data:            
    #         data["title"] = model_data.title
    #         data["content"] = model_data.content
    #         data["price"] = model_data.price
    data = PrimaryProductSerializer(instance).data
            
    return Response(data)

@api_view(["POST"])
def api_post_example(request, *args, **kwargs):
    data = request.data
    serializer = PrimaryProductSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()  # This saves the instance to the database
        print(serializer.data)
        return Response(serializer.data)
    return Response({"invalid": "not good data"}, status=400)

