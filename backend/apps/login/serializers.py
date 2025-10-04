from rest_framework import serializers
from .models import Rol, Empleado

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = "__all__"

    def validate_nombre_rol(self, value):
        valor_normalizado = value.strip().lower()
        if Rol.objects.filter(nombre_rol=valor_normalizado).exists():
            raise serializers.ValidationError("Ese rol ya existe")
        return valor_normalizado


class EmpleadoSerializer(serializers.ModelSerializer):
    id_rol = serializers.PrimaryKeyRelatedField(queryset=Rol.objects.all())
    rol_nombre = serializers.CharField(source='id_rol.nombre_rol', read_only=True)

    class Meta:
        model = Empleado
        fields = [
            'dni_empleado',
            'nombre_empleado',
            'apellido_empleado',
            'telefono_empleado',
            'correo_empleado',
            'genero_empleado',
            'id_rol',
            'rol_nombre',  
            'estado_empleado'
        ]
