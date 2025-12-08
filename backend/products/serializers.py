from . models import Product
from rest_framework import serializers

class PrimaryProductSerializer(serializers.ModelSerializer):
    discounted_price = serializers.SerializerMethodField(read_only=True)
    def get_discounted_price(self, obj):
        return {"discounted": obj.sale_price, "original": obj.price}

    class Meta:
        model = Product
        fields = [
            "title",
            "content",
            "price",
            #"sale_price", #i dont want this name
            "discounted_price",
        ]