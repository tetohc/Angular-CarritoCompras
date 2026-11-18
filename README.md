# ShoppingCart

Aplicación web para consultar productos, administrar un carrito de compras y crear órdenes. El frontend está desarrollado con Angular 22 y consume el API REST [`ShoppingCart.API`](https://github.com/tetohc/ShoppingCart.API.git).

## Funcionalidades

- **Consultar productos:** muestra el catálogo de productos y permite filtrarlo por categoría.
- **Agregar productos:** permite registrar productos indicando categoría, nombre, precio, existencias e imagen.
- **Agregar al carrito:** añade productos al carrito y permite aumentar o reducir cantidades, o quitar productos.
- **Crear una orden:** calcula el subtotal y los impuestos, envía la compra al API y muestra el número de orden generado.
- **Consultar historial:** permite consultar las órdenes creadas y ver sus detalles.

## Tecnologías

- Angular 22 y TypeScript
- Angular Material para componentes de interfaz
- RxJS y `HttpClient` para las solicitudes al API REST
- SweetAlert2 para la confirmación de compra
- API REST en .NET 10

## Requisitos

- Node.js y npm
- API REST de .NET 10 disponible y en ejecución

## Instalación y ejecución

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Configura la URL base del API en los archivos de entorno:

   - Desarrollo: `src/environments/environment.development.ts`
   - Producción: `src/environments/environment.ts`

   El valor configurado actualmente apunta a `http://localhost:5132`.

3. Inicia el servidor de desarrollo:

   ```bash
   npm start
   ```

4. Abre `http://localhost:4200` en el navegador.

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm start` | Inicia la aplicación localmente. |
| `npm run build` | Compila la aplicación para producción. |

## Capturas de pantalla

### Catálogo de productos

![Productos](https://raw.githubusercontent.com/tetohc/MediaResources/refs/heads/main/images/covers/ShoppingCart/products.png)

### Registro de productos

![Registro](https://raw.githubusercontent.com/tetohc/MediaResources/refs/heads/main/images/covers/ShoppingCart/newproduct.png)

### Carrito de compras

![Carrito](https://raw.githubusercontent.com/tetohc/MediaResources/refs/heads/main/images/covers/ShoppingCart/carrito.png)

### Historial de órdenes

![Historial](https://raw.githubusercontent.com/tetohc/MediaResources/refs/heads/main/images/covers/ShoppingCart/historial.png)