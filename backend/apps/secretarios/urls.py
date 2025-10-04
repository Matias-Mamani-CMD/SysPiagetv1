from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'grados', views.GradoViewSet, basename='grado')
router.register(r'alumnoxgrado', views.AlumnoXGradoViewSet, basename='alumnoxgrado')

urlpatterns = router.urls
