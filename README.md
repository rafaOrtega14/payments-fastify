# README

Payments es un proyecto en el framework fastify que tiene el objetivo de manejar pagos con multiples proveedores

Adicionalmente se han creado unas queries como respuesta a la necesidad de encontrar pokemons de unas determinadas características

## Pokemons

Vamos a comenzar con los pokemons

### 1. Todos los pokemon que tengan 1 o más evoluciones, se debe proporcionar por cada evolución: nombre, número y spawn time.

#### samples_pokemon.find({'next_evolution.0': {$exists: true}}, {num: 1, name: 1, spawn_time: 1})

El objeto next_evolution contiene las siguientes evoluciones de un pokemon de modo que si queremos obtener los pokemos con una o mas evoluciones deberemos comprobar que el elemento 0 exista, eso quiere decir que al pokemon le queda un recorrido de por lo menos 1 evolución.

Adicionalmente se han proyectado los campos pedidos num, name y spawn_time.

### 2. Todos los pokemon de primera evolución que tengan alguna evolución con un avg spawn mayor de 4, se necesita el nombre y número de cada pokemon que cumpla.

#### [{$match: { $and: [{ 'prev_evolution.0': { $exists: true }}, { avg_spawns: {$gt: 4}}]}}, {$project: {prev_evolution: {$arrayElemAt: ['$prev_evolution',0]}}}]

Esta query la he resuelto en primer lugar filtrando todos los pokemos que son evolución de otro es decir que sean primera evolución además de la condición principal 
de que el spawn sea mayor a 4

Una vez tenemos este set de datos he jugado con la proyección para hacer el subset deseado al solo necesitar num y name lo tengo en el subdocumento de pre_evolution
de modo que solo estoy proyectando el primer elemento de ese array dandome así el resultado esperado

## Payments
Para hacer la aplicación he decidido utilizar fastify, un framework de API REST con TypeScript, la elección del framework ha sido para tener una implementación sencilla de los providers de pago, creo la funcionalidad de plugin era muy interesante, a continuación lo explico mas en detalle.

1. En primer lugar lo que he hecho ha sido crear unos endpoints de payments en la capa de controllers para poder exponer el codigo en un API y así poder probarlo 
2. A continuación he creado el servicio de pagos el cual cuenta con varios elementos bastante interesantes :
 - Factory: Distingue un provider u otro y lo instancia, si queremos implementar un provider en el futuro será tan sencillo como colocar otro caso en esta factoria de objetos
 - GenericPayments: Clase abstracta donde se implementan los metodos comunes y se definen los abstractos que mas adelante serán implementados por las clases mas concretas
 - Clases concretas: Aqui se implementan los metodos propios de cada clase la misión de estas clases será atendar a las necesidades concretas de cada uno de los proveedores 
3. Después he añadido un plugin con el factory de modo que desde las variables de entorno podamos setear el proveedor (Stripe o Paypal) lo bueno de esto es que es un solo punto donde podemos cambiar el proveedor de pagos y desde un punto muy temprano de la aplicación
4. Como los puligns en fastify decoran la request llamo a mi clase payment que contiene la instancia concreta del proveedor que vamos a usar 

