from rest_framework import generics
from .products import Product
from .serializers import PrimaryProductSerializer

class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = PrimaryProductSerializer
    lookup_field = 'pk' 

product_detail_view = ProductDetailAPIView.as_view()