<<<<<<<<<<<<< PROYECTO FINAL BACKEND CODER >>>>>>>>>>>>>

Abajo se delallan las rotas del Usuario en Api
http://localhost:8080/login
Se tiene que enviar por Body {email, password}

http://localhost:8080/register
Se crea un usuario nuevo
Se tiene que enviar por Body { first_name, last_name, email, age, password }

http://localhost:8080/logout
Falta solucinar esto

http://localhost:8080/current


http://localhost:8080/reset-password
Se tien que enviar por Body { email, password } el password tiene que ser la nueva contraseña, falta mejorar esto

<---------------------------------------------------------------------------------------------------------->

Abajo se delallan las rotas de Productos en Api
http://localhost:8080/apiP/post
Se crea un producto nuevo, tiene que ser un usuario con rol "admin" o "premium"
Se envia por Body { name , price, category, code, description, thumbnail, stock}

http://localhost:8080/apiP/get
Se traen de la DB todos los productos creados

http://localhost:8080/get/:id
Se trae de la DB el producto por Id segun la query

http://localhost:8080/put/:id
Se modifica un producto por id segun la query, tener en cuenta que por body se tiene que enviar algunos de los siguientes parametros { name , price, category, code, description, thumbnail, stock}

http://localhost:8080/delete/:id
Se elimina un producto por Id

http://localhost:8080/:category
Se traen los productos por categoria segun la query


<---------------------------------------------------------------------------------------------------------->

Abajo se delallan las rotas del Carrito en Api

http://localhost:8080/apiC/post
Se crea un carrito

http://localhost:8080/apiC/get/:cid
Se trae de la DB un carrito por id segun la query

http://localhost:8080/apiC/post/:cid
Se agrega un producto al carrito que se envia por id, se rquiere pasar por Body { productId, cartsId }

http://localhost:8080/apiC/put/:cid
Se elimina un producto del carrito, se requiere pasar por Body { productId, cartsId }

http://localhost:8080/apiC/delete/:cid
Se elimina un carrito por id, se requiere pasar por Body { cartsId }

<---------------------------------------------------------------------------------------------------------->

La siguiente ruta se encarga de simular un Ticket al finalizar la compra con el total de productos y precios 
http://localhost:8080/purchase/:cartsId
Se requiere :cartsId que es el Id del carrito.

<---------------------------------------------------------------------------------------------------------->

Abajo se delallan las rotas de Mensaje en Api

http://localhost:8080/apiM/post

http://localhost:8080/apiM/get

http://localhost:8080/apiM/get/messages/:id

http://localhost:8080/apiM/put/messages/:id

http://localhost:8080/apiM/delete/messages/:id