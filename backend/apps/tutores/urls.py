from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'tutores', views.TutorViewSet, basename='tutor')
router.register(r'alumnos', views.AlumnoViewSet, basename='alumno')
router.register(r'parentescos', views.ParentescoViewSet, basename='parentesco')
router.register(r'alumnoxtutor', views.AlumnoXTutorViewSet, basename='alumnoxtutor')

urlpatterns = router.urls
