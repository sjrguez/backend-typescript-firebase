# Bienvenido a la app

### Para subir la aplicacion seguimos esta lista de pasos

1. Hace npm install
2. Dejare mi firebase info pero si desea lo puedes cambiar
3. Cambiar el archivo ```.env copy``` a ```.env``` y agregar los datos necesarios
4. npm ```run start-dev``` para correr local


### Estructura del proyecto

- index.js
- src
    - api
        - controllers
        - interfaces
        - middleware
        - repositories
        - routes
        - app.ts
    - config


### Tecnologias

- Awilix: Para utilizar inyeccion de dependencia en nuestro proyecto
- Nodemon: Para en desarrollo poder trabajar sin tener que compilar cada vez que quieremos ver cambios ya que este los monitorea por nosotros facilitando ese proceso en desarrollo
- FireStore: Como base de datos
- Typescript

### Informacion extra

- Por cuestion de tiempo decidi no hacer la implementacion de loguer, espero entiendan
- Hice las pruebas unitarias de esa forma ya que al usar awilix es un poco mas incomodo por cuestion del container y tomaria mas tiempo
