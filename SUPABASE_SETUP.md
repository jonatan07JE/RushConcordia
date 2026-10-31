# Configuración gratuita de Supabase

Supabase ofrece un plan gratuito con límites de uso. La disponibilidad y los límites pueden cambiar; revisa el plan antes de publicar.

## Crear el proyecto

1. Crea un proyecto gratuito en Supabase y guarda la contraseña de la base de datos en un lugar seguro.
2. En **SQL Editor**, ejecuta el contenido de `supabase/schema.sql`. Si ya habías configurado este proyecto, ejecútalo otra vez para agregar las columnas y permisos nuevos.
3. En **Authentication → Settings**, desactiva **Allow new users to sign up**. El usuario administrador se crea manualmente.
4. En **Authentication → Users**, crea tu usuario con correo y contraseña.
5. Copia el UUID de tu usuario desde la tabla `auth.users` y autorízalo en **SQL Editor**:

```sql
insert into public.admin_users (user_id)
values ('PEGA-AQUI-EL-UUID-DE-TU-USUARIO');
```

## Conectar la app

1. Copia `.env.example` como `.env.local`.
2. En Supabase, abre **Project Settings → API** y copia el Project URL y la clave pública `anon`/publishable en `.env.local`:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-publica
```

3. Reinicia Vite. En producción, agrega esas variables a la configuración del proveedor de hosting y vuelve a publicar.

La clave pública se puede incluir en la app porque las políticas RLS limitan las escrituras. Nunca pongas la clave `service_role` en el frontend ni en variables `VITE_`.

El panel privado requiere inicio de sesión y un UUID autorizado en `admin_users`. Los clientes solo pueden leer bebidas. La base de datos y el bucket verifican los permisos; ocultar la ruta del panel no concede permisos.

## Guardar y administrar el menú

1. Abre `/admin` con una cuenta autorizada.
2. Pulsa **Importar catálogo inicial** para guardar en Supabase las bebidas que ya aparecen en el menú. Esta importación se realiza una sola vez; si después eliminas una bebida, no se volverá a crear automáticamente.
3. Las bebidas del catálogo y las que agregues desde el panel aparecerán en la lista de administración. Selecciona **Editar** para cambiar sus datos o foto, o **Eliminar** para quitarlas. El menú público se carga desde Supabase.