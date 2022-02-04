nota: Al diagrama uml le faltan terminar un par de cosas como relaciones, pero es en general como esta planteado para que se entienda la base de datos.
La carpeta para abrir el backend en el eclipse es ("semm/semm-backend").

El frontend esta en la carpeta ("semm-front")

para iniciar el backend se debe ejecutar desde la clase "DemoApplication" utilizando el "run as: java application"

El front solamente tiene elementos de angular-boostrap;

Para el registro de usuario: La longitud de la contraseña no la verifique, por lo tanto puede tener cualquiera.

Una vez dentro de la sesion:
	El listado de patentes y las opciones para operar sobre una patente se acceden a traves del boton "Gestionar estacionamiento"

	Lo botones "iniciar estacionamiento" solo seran visibles si se registran patentes.

	Y el boton "finalizar" estacionamiento solo sera visible si se presiono "iniciar estacionamiento".

	Tiene implementado que no se pueda eliminar ni editar una patente con un estacionamiento iniciado.

	Para iniciar un estacionamiento es necesario tener saldo -> para cargar saldo se puede hacer desde el boton "mi cuenta";

	Te redirige al menu con tus datos de cuenta y se debe presionar "cargar" que habilitara un input para ingresar el monto.


El backend-> Realiza la carga automatica de una ciudad con horario operable de 8-20hs, costo de estacionamiento por hora de: $10.

Realiza la carga de roles (user, admin) que al final no le di uso.

Por ultimo realiza la carga de una tabla con los dias feriados para la verificacion de los dias operables.

En el modelo del parking tiene un metodo implementado para verificar los dias feriados, la hora operable, y sabados y domingos,

para verificar que se haga bien la validacion de los dias se puede modificar el codigo de los dias en la validacion.


les dejo el link del github donde esta todo subido: 
https://github.com/MatiasCabral1





