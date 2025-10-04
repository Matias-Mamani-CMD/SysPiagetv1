from rest_framework import viewsets
from .models import Grado, AlumnoXGrado
from .serializers import GradoSerializer, AlumnoXGradoSerializer

class GradoViewSet(viewsets.ModelViewSet):
    queryset = Grado.objects.all()
    serializer_class = GradoSerializer


class AlumnoXGradoViewSet(viewsets.ModelViewSet):
    queryset = AlumnoXGrado.objects.all()
    serializer_class = AlumnoXGradoSerializer
