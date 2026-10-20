// "function" crea una función, es decir, un bloque de instrucciones que podremos ejecutar cuando haga falta.
// El nombre cambiarContrasena se usa desde el botón de login.html para llamar a esta función.
function cambiarContrasena() {
    // "var" crea una variable para guardar un dato y poder utilizarlo más adelante.
    // "document" representa esta página web; getElementById busca un elemento por el valor de su atributo id.
    // Aquí se busca el input cuyo id es "contrasena" y el resultado se guarda en la variable contrasena.
    var contrasena = document.getElementById('contrasena');

    // Esta línea busca el botón cuyo id es "mostrarContrasena" y guarda el elemento encontrado en boton.
    // El signo "=" asigna o guarda el resultado de la derecha dentro de la variable que está a la izquierda.
    var boton = document.getElementById('mostrarContrasena');

    // "if" significa "si": ejecuta las instrucciones entre llaves solo cuando la condición es verdadera.
    // "contrasena.type" consulta el tipo del input; puede ser "password" (oculto) o "text" (visible).
    // El operador "===" compara dos valores y también comprueba que sean del mismo tipo.
    // En esta condición se pregunta si el tipo del campo es exactamente el texto "password".
if (contrasena.type === 'password') {
        // El signo "=" asigna un valor; aquí cambia el tipo del campo a "text" para mostrar los caracteres.
        contrasena.type = 'text';

        // classList permite modificar las clases CSS del botón.
        // remove("is-hidden") quita esa clase para que el CSS muestre el ojo sin la barra de ocultar.
        boton.classList.remove('is-hidden');

        // setAttribute cambia un atributo HTML; aria-label indica a lectores de pantalla qué hará el botón.
        boton.setAttribute('aria-label', 'Ocultar contraseña');

        // title asigna el texto que aparece como ayuda cuando se deja el cursor sobre el botón.
        boton.title = 'Ocultar contraseña';
    } else {
        // "else" significa "si no": ejecuta estas instrucciones cuando la condición del if es falsa.
        // Por tanto, llegamos aquí cuando la contraseña ya se está mostrando.

        // Asigna el tipo "password" al campo para que el navegador vuelva a ocultar sus caracteres.
        contrasena.type = 'password';

        // add("is-hidden") añade la clase CSS que dibuja una barra sobre el ojo para indicar que está oculto.
        boton.classList.add('is-hidden');

        // Cambia el nombre accesible del botón para anunciar que al pulsarlo se mostrará la contraseña.
        boton.setAttribute('aria-label', 'Mostrar contraseña');

        // Actualiza también el texto de ayuda que aparece al dejar el cursor sobre el botón.
        boton.title = 'Mostrar contraseña';
    }
}
