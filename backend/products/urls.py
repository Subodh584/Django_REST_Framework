from django.urls import path, include
from .views import product_detail_view
urlpatterns = [
    path('<int:pk>/', product_detail_view, name='product-detail'),
]