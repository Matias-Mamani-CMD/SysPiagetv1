from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Empleado, Rol
from .serializers import EmpleadoSerializer, RolSerializer
from .permissions import IsDirector


# ===== LOGIN =====
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        dni = request.data.get("dni")
        password = request.data.get("password")

        if not dni or not password:
            return Response({"error": "DNI y contraseña requeridos"}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=dni, password=password)
        if not user:
            return Response({"error": "Credenciales inválidas"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            empleado = Empleado.objects.get(dni_empleado=dni)
            rol = empleado.id_rol.nombre_rol
        except Empleado.DoesNotExist:
            empleado = None
            rol = None

        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "username": user.username,
            "rol": rol,
            "nombre": empleado.nombre_empleado if empleado else "",
            "apellido": empleado.apellido_empleado if empleado else ""
        }, status=status.HTTP_200_OK)



# ===== CHECK AUTH =====
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_auth(request):
    try:
        empleado = Empleado.objects.get(dni_empleado=request.user.username)
        rol = empleado.id_rol.nombre_rol
    except Empleado.DoesNotExist:
        rol = None

    return Response({
        "id": request.user.id,
        "username": request.user.username,
        "rol": rol
    })


# ===== CRUD EMPLEADOS =====
class EmpleadoView(viewsets.ModelViewSet):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer
    permission_classes = [IsAuthenticated, IsDirector]

    def create(self, request, *args, **kwargs):
        data = request.data
        dni = data.get("dni_empleado")
        nombre = data.get("nombre_empleado")
        apellido = data.get("apellido_empleado")
        correo = data.get("correo_empleado", f"{dni}@test.com")
        rol_id = data.get("id_rol")
        genero = data.get("genero_empleado", "M")
        telefono = data.get("telefono_empleado", "")

        if not dni or not nombre or not apellido or not rol_id:
            return Response({"error": "DNI, nombre, apellido y rol son obligatorios"},
                            status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=dni).exists():
            return Response({"error": "Ya existe un usuario con ese DNI"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(
            username=dni,
            password="123456",
            first_name=nombre,
            last_name=apellido,
            email=correo
        )

        try:
            rol_obj = Rol.objects.get(id_rol=rol_id)
        except Rol.DoesNotExist:
            user.delete()
            return Response({"error": "Rol no encontrado"}, status=status.HTTP_400_BAD_REQUEST)

        empleado = Empleado.objects.create(
            dni_empleado=dni,
            nombre_empleado=nombre,
            apellido_empleado=apellido,
            correo_empleado=correo,
            genero_empleado=genero,
            telefono_empleado=telefono,
            estado_empleado='Activo',
            id_rol=rol_obj
        )

        serializer = self.get_serializer(empleado)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        data = request.data

        for field in ["nombre_empleado", "apellido_empleado", "correo_empleado",
                      "telefono_empleado", "genero_empleado", "estado_empleado", "id_rol"]:
            if field in data:
                setattr(instance, field, data[field])
        instance.save()

        user, created = User.objects.get_or_create(username=instance.dni_empleado)
        user.first_name = instance.nombre_empleado
        user.last_name = instance.apellido_empleado
        user.email = instance.correo_empleado
        if created:
            user.set_password("123456")
        user.save()

        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            user = User.objects.get(username=instance.dni_empleado)
            user.delete()
        except User.DoesNotExist:
            pass
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# ===== CRUD ROLES =====
class RolView(viewsets.ModelViewSet):
    queryset = Rol.objects.all()
    serializer_class = RolSerializer
    permission_classes = [IsAuthenticated]
