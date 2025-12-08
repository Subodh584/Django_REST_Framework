from django.urls import path
from . import views
urlpatterns = [
    path("", views.api_home),
    path("post-example/", views.api_post_example),
]