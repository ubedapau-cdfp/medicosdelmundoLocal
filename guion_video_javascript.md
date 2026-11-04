# Guion para el vídeo: funciones JavaScript del proyecto

## Introducción

Hola. En este vídeo voy a explicar qué hacen las principales funciones de JavaScript de mi proyecto. El código se encarga de añadir interactividad a la página: permite mostrar u ocultar la contraseña, controlar los errores del inicio de sesión, cambiar el idioma, abrir y cerrar el menú lateral y desplegar los subapartados.

JavaScript trabaja principalmente con el DOM. El DOM es la representación de la página HTML, y permite buscar elementos, modificar sus propiedades y reaccionar a las acciones del usuario.

## 1. Archivo `login.js`

El primer archivo es `login.js`, relacionado con el formulario de inicio de sesión.

### Función `cambiarContrasena`

La primera función se llama `cambiarContrasena`.

Primero, mediante `document.getElementById('contrasena')`, se busca el campo HTML donde se escribe la contraseña. El resultado se guarda en la variable `contrasena`.

Después se busca el botón que permite mostrar u ocultar la contraseña. Ese botón tiene el identificador `mostrarContrasena`, y se guarda en la variable `boton`.

A continuación aparece una condición `if`. Esta condición comprueba si el tipo del campo es exactamente `password`. Cuando un campo es de tipo `password`, sus caracteres aparecen ocultos.

Si la condición se cumple, el tipo del campo cambia a `text`. De esta forma, la contraseña se vuelve visible.

Después se elimina la clase CSS `is-hidden` utilizando `classList.remove`. También se modifica el atributo `aria-label` para indicar a los lectores de pantalla que el botón ahora sirve para ocultar la contraseña. Además, se actualiza la propiedad `title`, que muestra una pequeña ayuda al pasar el cursor sobre el botón.

Si la condición no se cumple, se ejecuta el bloque `else`. En este caso significa que la contraseña está visible.

El código cambia el tipo del campo otra vez a `password`, por lo que los caracteres vuelven a ocultarse. Después añade la clase `is-hidden`, cambia el texto accesible a `Mostrar contraseña` y actualiza también el título del botón.

En resumen, esta función alterna entre mostrar y ocultar la contraseña y mantiene actualizados los textos de accesibilidad.

### Función `mostrarErrorLogin`

La segunda función se llama `mostrarErrorLogin`.

Primero busca el elemento que contiene el aviso de error y lo guarda en la variable `alerta`.

Después busca el campo de contraseña y lo guarda en la variable `contrasena`.

La instrucción `alerta.hidden = false` hace que el mensaje de error deje de estar oculto y se muestre en la página.

A continuación se añade el atributo `aria-invalid` con el valor `true`. Esto informa a los lectores de pantalla de que el campo contiene un valor no válido.

Finalmente, se utiliza `focus()` para colocar el cursor directamente en el campo de contraseña. Así, la persona puede corregirlo sin tener que volver a pulsar sobre él.

### Eventos del formulario

Después se busca el formulario con el identificador `loginForm` y se añade un evento `submit`.

Este evento se ejecuta cuando la persona pulsa el botón de enviar o presiona la tecla Enter.

Dentro de la función se utiliza `preventDefault()`. Esta instrucción evita el comportamiento normal del formulario, que sería enviar los datos y recargar la página.

En su lugar, se llama a `mostrarErrorLogin()` para mostrar el aviso de contraseña incorrecta.

Por último, se añade un evento `click` al botón `forzarError`. Cuando se pulsa este botón, también se ejecuta `mostrarErrorLogin`.

## 2. Archivo `translator.js`

El segundo archivo es `translator.js`, que controla el traductor de la página.

El código está dentro de una función autoejecutable, también llamada IIFE. Esto significa que la función se ejecuta inmediatamente y que sus variables no interfieren con otros archivos JavaScript.

Al principio se guarda en `widgetId` el identificador del contenedor donde Google Translate creará su selector.

Después se buscan el selector de idiomas y el mensaje de estado mediante `getElementById` y `querySelector`.

La condición `if (!select) return` comprueba si el selector existe. Si la página no tiene selector de idiomas, la función termina y no ejecuta el resto del código.

### Función `restoreOriginalLanguage`

La función `restoreOriginalLanguage` sirve para volver al idioma original, que es el español.

Primero obtiene el nombre del dominio actual con `window.location.hostname`.

Después divide la ruta de la página en partes utilizando `split("/")` y elimina las partes vacías con `filter(Boolean)`.

Se crea una lista llamada `paths`, que empieza con la ruta principal `/`.

El bucle `while` añade diferentes rutas posibles. Esto es necesario porque la cookie del traductor podría haberse creado en distintas rutas de la página.

Después se crea la lista `domains`, con el dominio actual y sus posibles variantes.

Los dos bucles `for` prueban todas las combinaciones de rutas y dominios. En cada combinación se crea una instrucción que establece la cookie `googtrans` con una fecha pasada. Al tener una fecha de caducidad anterior, la cookie se elimina.

Después se establece el idioma del documento como español mediante `document.documentElement.lang = "es"`.

Por último, `window.location.reload()` recarga la página para mostrar de nuevo el contenido original.

### Inicialización de Google Translate

La función `googleTranslateElementInit` es llamada por Google cuando su script termina de cargarse.

Dentro de ella se crea un nuevo objeto `google.translate.TranslateElement`.

Se indica que el idioma original es español, se especifican los idiomas disponibles y se desactiva la barra automática de Google.

El segundo parámetro indica el contenedor HTML donde debe aparecer el traductor.

### Cambio de idioma

Después se añade un evento `change` al selector propio de la página. Este evento se ejecuta cuando la persona selecciona otro idioma.

Primero se guarda el idioma elegido en la variable `lang`.

Si el idioma elegido es español, se llama a `restoreOriginalLanguage()` y se utiliza `return` para terminar la función.

Si se selecciona otro idioma, se busca el selector interno que Google Translate creó dentro del contenedor.

Si todavía no existe, la función termina para evitar errores.

Después se copia el idioma elegido en el selector de Google y se lanza un nuevo evento `change`. Así Google recibe la selección y traduce la página.

También se actualiza el atributo `lang` del elemento HTML para indicar el idioma actual.

Finalmente se crea dinámicamente un elemento `script` y se carga el archivo de Google Translate de forma asíncrona.

Si la carga falla, se desactiva el selector y se muestra el mensaje `No disponible sin conexión`.

## 3. Archivo `openSidebar.js`

El tercer archivo es `openSidebar.js`, que controla el menú lateral.

### Función `openNav`

La función `openNav` abre el menú.

Primero busca el elemento con el identificador `sidenav`.

Después establece su anchura en `260px`. Esto hace que el menú aparezca.

A continuación elimina la clase `is-closed`, para que el CSS deje de considerar el menú como cerrado.

Finalmente cambia el margen izquierdo del elemento `main` a `260px`. Esto desplaza el contenido para que no quede tapado por el menú.

### Función `closeNav`

La función `closeNav` hace lo contrario.

Primero busca de nuevo el menú lateral.

Después establece su anchura en `0`, por lo que el menú se oculta.

A continuación añade la clase `is-closed`, que permite mostrar el botón para volver a abrirlo.

Finalmente devuelve el margen izquierdo de `main` a `0`, permitiendo que el contenido ocupe todo el ancho disponible.

La animación de apertura y cierre se consigue gracias a las transiciones definidas en el archivo CSS.

## 4. Archivo `dropdownSubapartados.js`

El último archivo es `dropdownSubapartados.js`, que controla los subapartados desplegables.

Al principio se seleccionan todos los elementos que tienen la clase `dropbtn`. El método `querySelectorAll` devuelve una colección con todos esos botones.

### Función `getSubmenu`

La función `getSubmenu` recibe un botón como parámetro.

Cada botón tiene un atributo `aria-controls`, que indica qué submenú controla.

La función lee ese atributo con `getAttribute` y busca el elemento correspondiente mediante `getElementById`.

Si no encuentra el submenú, se ejecuta `throw new Error`. Esto detiene la ejecución y muestra un mensaje indicando qué botón tiene el problema.

Si el submenú existe, la función lo devuelve para poder utilizarlo después.

### Evento de los botones

Finalmente se recorren todos los botones con `forEach`.

A cada botón se le añade un evento `click`.

Cuando se pulsa un botón, se llama a `getSubmenu` para obtener su submenú correspondiente.

Después se utiliza `classList.toggle("show")`. Si el submenú estaba cerrado, se añade la clase `show` y se abre. Si ya estaba abierto, se elimina la clase y se cierra.

El resultado de `toggle` se guarda en la variable `isOpen`. Esta variable vale `true` si el menú queda abierto y `false` si queda cerrado.

Por último, se actualiza el atributo `aria-expanded`. Se utiliza `String` porque los atributos HTML siempre guardan sus valores como texto.

## Conclusión

En conclusión, estos archivos JavaScript hacen que la página sea interactiva.

`login.js` controla la contraseña y los mensajes de error del formulario.

`translator.js` permite cambiar el idioma y volver al español.

`openSidebar.js` abre y cierra el menú lateral.

Y `dropdownSubapartados.js` muestra y oculta los subapartados.

En todos los casos, JavaScript busca elementos del HTML, modifica sus propiedades o clases y responde a eventos producidos por el usuario. Además, el código utiliza atributos como `aria-label`, `aria-invalid` y `aria-expanded`, por lo que también tiene en cuenta la accesibilidad.

Muchas gracias por vuestra atención.
