// -------------------------- TRADUCTOR DE GOOGLE - D. RIVAS  --------------------------------

// Función que se ejecuta al instante (IIFE) para que sus variables
// no se mezclen con las de otros scripts
(function () {
  // id del contenedor oculto donde Google Translate crea su selector
  const widgetId = "google_translate_engine";

  // Nuestro selector y el mensaje de estado, ya escritos en el HTML
  const select = document.getElementById("translator-language");
  const status = document.querySelector(".translator-status");

  // Si esta página no tiene el selector, no hace nada
  if (!select) return;

  // Vuelve al español borrando la cookie "googtrans", donde Google guarda
  // el idioma elegido (con formato "/es/en"), y recargando la página.
  // Google no tiene una opción para deshacer la traducción, porque
  // modifica el texto de la página directamente; recargar es la forma
  // más fiable de recuperar el original.
  function restoreOriginalLanguage() {
    // Dominio de la página, por ejemplo "midominio.org"
    const hostname = window.location.hostname;

    // Trozos de la ruta sin vacíos: "/web/derechos.html" -> ["web", "derechos.html"]
    const pathSegments = window.location.pathname.split("/").filter(Boolean);

    // Lista de rutas en las que puede estar guardada la cookie. Empieza por "/"
    const paths = ["/"];

    // Va añadiendo rutas cada vez más cortas:
    // "/web/derechos.html/", "/web/"
    while (pathSegments.length) {
      paths.push("/" + pathSegments.join("/") + "/");
      pathSegments.pop(); // quita el último trozo para la siguiente vuelta
    }

    // Variantes de dominio: sin atributo domain, "midominio.org" y ".midominio.org"
    const domains = ["", hostname, "." + hostname];

    // Para borrar una cookie, la ruta y el dominio tienen que coincidir con
    // los usados al crearla. Como no sabemos cuáles usó Google, se prueban
    // todas las combinaciones
    for (const path of paths) {
      for (const domain of domains) {
        // Si domain está vacío, no se añade el atributo
        const domainAttribute = domain ? "; domain=" + domain : "";

        // Una cookie con fecha de caducidad en el pasado (1970) se elimina
        document.cookie =
          "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=" +
          path +
          domainAttribute;
      }
    }

    // Marca el documento como español
    document.documentElement.lang = "es";

    // Recarga la página: sin cookie, Google ya no traduce y se ve el original
    window.location.reload();
  }

  // Google llama a esta función cuando su script termina de cargar
  // (coincide con "?cb=googleTranslateElementInit" de la URL)
  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement(
      {
        pageLanguage: "es",                            // idioma original
        includedLanguages: "en,fr,ar,pt,ro,uk,zh-CN",  // debe coincidir con los <option> (menos "es")
        autoDisplay: false                             // no mostrar la barra de Google
      },
      widgetId // id del contenedor donde Google crea su selector
    );
  };

  // Al cambiar de idioma en NUESTRO selector
  select.addEventListener("change", () => {
    const lang = select.value; // por ejemplo "fr"

    // Si se elige español, se restaura el original y se termina aquí
    if (lang === "es") {
      restoreOriginalLanguage();
      return;
    }

    // Busca el <select> que Google ha creado dentro del contenedor oculto
    const googleSelect = document.querySelector("#" + widgetId + " select");
    if (!googleSelect) return; // Google aún no ha cargado

    // Copia la elección en el selector de Google
    googleSelect.value = lang;

    // Dispara "change" para que Google crea que se ha elegido ahí y traduzca
    googleSelect.dispatchEvent(new Event("change", { bubbles: true }));

    // Mantiene el atributo lang de <html> acorde al idioma
    document.documentElement.lang = lang;
  });

  // --- NAVEGACIÓN POR TECLADO MEJORADA ---
  // Permite salir del selector con Tab/Escape tras elegir una opción
  select.addEventListener("keydown", (event) => {
    const key = event.key;

    // Escape: cierra el selector y mantiene el foco en él
    if (key === "Escape") {
      select.blur(); // Cierra el dropdown nativo
      return;
    }

    // Enter: confirma la selección, cierra el dropdown y mueve el foco al siguiente elemento
    if (key === "Enter") {
      // Usamos un microtask (Promise) que se ejecuta después del handler actual
      // pero antes del siguiente macrotask, asegurando que el evento "change" se haya procesado
      Promise.resolve().then(() => {
        // Fuerza el cierre del dropdown nativo
        select.blur();

        // Busca el siguiente elemento enfocable en el orden de tabulación
        const focusableElements = Array.from(
          document.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        const currentIndex = focusableElements.indexOf(select);
        if (currentIndex !== -1 && currentIndex < focusableElements.length - 1) {
          focusableElements[currentIndex + 1].focus();
        }
      });
    }

    // Tab: permite navegación normal, pero asegura que el select se cierre si estaba abierto
    if (key === "Tab") {
      // Pequeño delay para permitir que el select se cierre naturalmente
      setTimeout(() => {
        select.blur();
      }, 0);
    }
  });

  // También manejamos el evento "blur" para asegurar que el selector se cierra correctamente
  select.addEventListener("blur", () => {
    // Fuerza el cierre del dropdown nativo en algunos navegadores
    select.value = select.value; // No-op que ayuda a cerrar el select en algunos casos
  });

  // Carga el script de Google de forma asíncrona
  const script = document.createElement("script");
  script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;

  // Si falla la carga (sin internet), desactiva el selector y avisa
  script.onerror = () => {
    select.disabled = true;
    status.textContent = "No disponible sin conexión";
  };
  document.head.appendChild(script);
})();