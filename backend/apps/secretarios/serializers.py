from rest_framework import serializers
from .models import Grado, AlumnoXGrado

class GradoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grado
        fields = '__all__'


class AlumnoXGradoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlumnoXGrado
        fields = ('dni_alumno', 'id_grado')
        read_only_fields = ('anio',)
