from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'empleados', views.EmpleadoView, basename='empleados')
router.register(r'roles', views.RolView, basename='roles')

urlpatterns = [
    path('login/', views.LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
    path('auth/check/', views.check_auth, name='check_auth'),  # <- usar views.check_auth
]
