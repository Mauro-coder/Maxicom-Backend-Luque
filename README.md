# Maxicom-Backend-Luque

Este proyecto se encuentra en desarrollo para el curso "Programación Backend I: Desarrollo Avanzado de Backend" brindado por Coderhouse, la misma cuenta con la creacion de un backend basico a modo de aprender como son las distintas funcionalidades y su utilizacion mediante handlebars para la vista de frontend.

## Estado del proyecto

Como todo proyecto nunca se enuentra terminado dado que siempre puede mejorarse, actualmente cuenta con todas las funcionalidades aprendidas en el curso. Este proyecto se encuentra basado en un Ecommerce de Celulares y Accesorios.

### Instalación ⚙️

- Clonar el repositorio.
- Ejecute 'npm install' para instalar dependencias y crear la carpeta 'node_modules'.
- Ejecute 'npm run dev' para levantarlo en servidor local.

>_[!WARNING]_
> Asegurate de instalar todas las dependencias para su correcta utilización!

### Utilización 💻

- En el buscador ejecute la siguiente direccion [http://localhost:8080](http://localhost:8080), esto le permitira ingresar a la pagina web por defecto para poder ver las distintas interacciones que surgen.
- A continuacion mediante postman puede realizar distintas request para verificar la funcionalizacion de las rutas, para esto puede utilizar distintos metodos:
    - get(para poder encontrar todo/s el/los producto/s o usuario/s).
    ![image](/public/img/get_prod.png) ![image](/public/img/get_oneprod.png) ![image](/public/img/get_user.png) ![image](/public/img/get_oneuser.png)
    - post (para crear un nuevo producto/usuario).
    ![image](/public/img/post_prod.png) ![image](/public/img/post_user.png)
    - put (para actualizar algun producto/usuario).
    ![image](/public/img/put_prod.png) ![image](/public/img/put_user.png)
    - delete (para eliminar un producto/usuario).
    ![image](/public/img/del_prod.png) ![image](/public/img/del_user.png)
    - get /products/pages (para visualizar la paginación de los productos).
    ![image](/public/img/pages_prod.png) ![image](/public/img/prod_page2.png)

- Ademas en postman se puede realizar otras request pero en los carritos mediante dintintos metodos:
    - get (para leer todos los productos que tiene un usuario en su carrito y para identificar el total a pagar de este usuario)
    ![image](/public/img/get_cart.png) ![image](/public/img/get_total.png)
    - post (para agregar los productos a un carrito de usuario)
    ![image](/public/img/post_cart.png)
    - put (para actualizar la cantidad del producto a comprar)
    ![image](/public/img/put_cart.png)
    - delete (para eliminar el carrito del usuario)
    ![image](/public/img/delete_cart.png)

#### MongoDb
Todos estos metodos utilizados anteriormente en postman son enviados automaticamente a Mongo Compass para su correcta visualizacion:
- Users: 
![image](/public/img/compass_user.png)
- Products:
![image](/public/img/compass_prod.png)
- Carts:
![image](/public/img/compass_cart.png)

### Visualizaciones
Mediante Handlebars se crearon las distintas vistas que va a tener este Ecommerce, a continuación se muestran algunos ejemplos:
- Home: en esta pestaña los productos se encuentran ordenados por categoria, ademas el nav cambia automaticamente si el usuario se encuentra logueado o no, y si el usuario tiene un role de admin le aparecera una opcion extra para registrar productos en el navbar.
![image](/public/img/index.png) ![image](/public/img/index_admin.png)
- Product: en esta pestaña se puede ver al producto seleccionado, ademas permite identificar cuanto stock queda y tiene la opcion de agregar al carrito.
![image](/public/img/product.png)
- Profile: en esta pestaña se encuentran los datos del usuario, con el nombre, email y avatar.
![image](/public/img/profile.png)
- Cart: en esta página se encuentra el carrito del usuario, con el precio de cada producto y el total a pagar.
![image](/public/img/cart.png)

### Tecnologías utilizadas en este proyecto 🤖

- [Express](https://expressjs.com)
- [Socket.io](https://socket.io)
- [Morgan](https://github.com/expressjs/morgan)
- [Faker](https://fakerjs.dev)
- [Express-Handlebars](https://handlebarsjs.com)
- [MongoDb](https://www.mongodb.com)
- [Mongo-Compass](https://www.mongodb.com/es/products/tools/compass)
- [Mongoose](https://mongoosejs.com)
- [Mongoose-Paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2)

# Desarrollado por Mauro Luque 

### LinkedIn: [https://www.linkedin.com/in/mauro-luque/](https://www.linkedin.com/in/mauro-luque/)