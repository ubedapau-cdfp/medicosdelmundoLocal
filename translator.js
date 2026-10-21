(function () {
  // Identificador del contenedor que usa internamente Google Translate.
  var widgetId = "google_translate_engine";
  // Idiomas que se mostrarán en el selector propio.
  var languageOptions = [
    ["es", "Español"],
    ["en", "English"],
    ["fr", "Français"],
    ["ar", "العربية"],
    ["pt", "Português"],
    ["ro", "Română"],
    ["uk", "Українська"],
    ["zh-CN", "中文"]
  ];
  var languageSelect;
  var statusMessage;

  // Activa el selector cuando Google Translate ya ha creado el suyo.
  function updateLanguageOptions() {
    var googleSelect = document.querySelector("#" + widgetId + " select");

    if (!googleSelect) {
      return;
    }

    languageSelect.disabled = false;
    statusMessage.textContent = "";
  }

  // Google Translate llama a esta función al terminar de cargar.
  window.googleTranslateElementInit = function () {
    // Configura el idioma original y los idiomas disponibles en el motor.
    new google.translate.TranslateElement(
      {
        pageLanguage: "es",
        includedLanguages: "en,fr,ar,pt,ro,uk,zh-CN",
        autoDisplay: false
      },
      widgetId
    );

    // Detecta cuándo Google Translate añade su selector al contenedor oculto.
    var widget = document.getElementById(widgetId);
    var observer = new MutationObserver(updateLanguageOptions);
    observer.observe(widget, { childList: true, subtree: true });
    updateLanguageOptions();
  };

  // Construye el selector de idioma accesible que ve la persona usuaria.
  function createTranslator() {
    var container = document.createElement("aside");
    container.className = "translator";
    container.setAttribute("aria-label", "Idioma de la página");

    var label = document.createElement("label");
    label.className = "translator-label";
    label.htmlFor = "translator-language";
    label.textContent = "Idioma";

    languageSelect = document.createElement("select");
    languageSelect.className = "translator-select";
    languageSelect.id = "translator-language";
    languageSelect.setAttribute("aria-label", "Selecciona el idioma de la página");
    languageSelect.disabled = true;

    // Añade al selector todas las opciones configuradas arriba.
    for (var i = 0; i < languageOptions.length; i++) {
      var option = document.createElement("option");
      option.value = languageOptions[i][0];
      option.textContent = languageOptions[i][1];
      languageSelect.appendChild(option);
    }

    // Reserva un espacio accesible para mostrar el estado del traductor.
    statusMessage = document.createElement("span");
    statusMessage.className = "translator-status";
    statusMessage.setAttribute("role", "status");
    statusMessage.setAttribute("aria-live", "polite");

    languageSelect.addEventListener("change", translatePage);

    // Agrupa los elementos y devuelve el control ya preparado.
    container.appendChild(label);
    container.appendChild(languageSelect);
    container.appendChild(statusMessage);
    return container;
  }

  // Pasa el idioma elegido al selector interno de Google Translate.
  function translatePage() {
    var googleSelect = document.querySelector("#" + widgetId + " select");

    if (!googleSelect) {
      return;
    }

    // El valor vacío representa el idioma original (español).
    googleSelect.value = languageSelect.value === "es" ? "" : languageSelect.value;
    googleSelect.dispatchEvent(new Event("change", { bubbles: true }));
    // Mantiene actualizado el idioma declarado en el documento.
    document.documentElement.lang = languageSelect.value;
  }

  // Inserta el control y carga el motor externo de traducción.
  function addTranslator() {
    var container = createTranslator();
    var navigation = document.querySelector(".sidenav");

    // Lo coloca en la navegación si existe; si no, lo deja flotante.
    if (navigation) {
      navigation.insertBefore(container, navigation.querySelector(".menu"));
    } else {
      container.classList.add("translator-floating");
      document.body.appendChild(container);
    }

    // Crea el contenedor oculto que necesita Google Translate.
    var widget = document.createElement("div");
    widget.id = widgetId;
    widget.className = "translator-engine";
    widget.setAttribute("aria-hidden", "true");
    document.body.appendChild(widget);

    // Carga Google Translate de forma asíncrona y muestra un aviso si falla.
    var script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onerror = function () {
      languageSelect.disabled = true;
      statusMessage.textContent = "No disponible sin conexión";
    };
    document.head.appendChild(script);
  }

  // Espera a que el DOM esté listo antes de insertar el selector.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addTranslator, { once: true });
  } else {
    addTranslator();
  }
})();
