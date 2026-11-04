// -------------------------- CAMBIO DE TEMA (principal / alternativo) --------------------------
// Activa o quita data-theme="alt" en <html>. stylesalternativa.css solo actúa con ese atributo.
// Se carga en el <head> (sin defer) para aplicar el tema guardado antes de pintar la
// página y evitar el parpadeo del tema claro.

(function () { // 
  var CLAVE = "tema-medicos-del-mundo"; // Variable donde almacena el tema en localStorage
  var raiz = document.documentElement; // <html> para ponerle el atributo data-theme="alt" si se activa el tema alternativo

  // localStorage puede estar bloqueado (modo privado, etc.): siempre dentro de try/catch
  function leerTema() { // Función
    try { // Intenta leer el tema que está en localStorage
        return localStorage.getItem(CLAVE); // Devuelve el valor guardado en CLAVE
    } catch (e) { // Si hay un error
        return null; // Devuelve null
    }
  }

  function guardarTema(valor) { // Función para guardar el tema seleccionado en localStorage
    try { // Intenta guardar el tema en localStorage
        localStorage.setItem(CLAVE, valor); // Le guarda el valor en (item) CLAVE
    } catch (e) { // Si hay un error
         // No hace nada
        }
  }

  function aplicarTema(tema) { // Función para aplicar el tema seleccionado
    if (tema === "alt") { // Si el tema es el alternativo
      raiz.setAttribute("data-theme", "alt"); // Se le asigna los atributos "data-theme" y "alt"
    } else { // Si no,
      raiz.removeAttribute("data-theme"); // Se le quita el atributo "data-theme", dejando el tema principal
    }
  }

  // Aplica el tema guardado en localStorage al cargar la página web
  aplicarTema(leerTema());

  // Una vez cargado, se crea el botón de cambio del tema.
  document.addEventListener("DOMContentLoaded", function () { // A
    var boton = document.createElement("button"); // Crea un nuevo elemento, siendo este un botón
    boton.type = "button"; // Asignación del tipo de botón
    boton.className = "theme-toggle"; // Asignación de la clase del botón
    boton.textContent = "Tema oscuro"; // Asignación del texto de contenido del botón
    // Asignación del atributo "aria-pressed", indica si el botón está activo o no
    boton.setAttribute("aria-pressed", raiz.getAttribute("data-theme") === "alt" ? "true" : "false"); 

    boton.addEventListener("click", function () { // Cuando un usuario hace click en el botón
      var activo = raiz.getAttribute("data-theme") === "alt"; // Comprueba si el tema alternativo está ya activo
      var nuevo = activo ? "claro" : "alt"; // Si lo está, el tema que se aplicará será el principal, en caso contrario, será el alternativo
      aplicarTema(nuevo); // Se aplica el tema seleccionado
      guardarTema(nuevo); // Se guarda el tema seleccionado
      // Se actualiza el atributo "aria-pressed", indicando si está activado el botón o no
      boton.setAttribute("aria-pressed", activo ? "false" : "true");  
    });

    // Login: debajo de los botones del formulario.
    // Menú lateral: debajo del selector de idioma.
    var traductor = document.querySelector(".translator"); // Recoge el elemento con la clase "translator" (el selector de idioma)
    var botonesLogin = document.querySelector(".button-group"); // Recoge el elemento con la clase "button-group" (botones del login)
    if (botonesLogin && botonesLogin.parentNode) { // Si existen los botones del login y su nodo padre
      boton.classList.add("theme-toggle--login"); // Se le añade la clase "theme-toggle--login" al botón
      botonesLogin.parentNode.insertBefore(boton, botonesLogin.nextSibling); // Inserta el botón justo debajo de los botones del login
    } else if (traductor && traductor.parentNode) { // Si existe el selector de idioma y su nodo padre (traductor)
      traductor.parentNode.insertBefore(boton, traductor.nextSibling); // Inserta el botón justo debajo del selector de idioma
    }
  });
})();