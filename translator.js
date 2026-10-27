(function () {
  // id del contenedor oculto donde Google Translate crea su selector
  const widgetId = "google_translate_engine";

  // Nuestro selector y el mensaje de estado, ya escritos en el HTML
  const select = document.getElementById("translator-language");
  const status = document.querySelector(".translator-status");

  // Si esta página no tiene el selector, no hace nada
  if (!select) return;

  // Google llama a esta función cuando su script termina de cargar
  // (coincide con "?cb=googleTranslateElementInit" de la URL)
  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement(
      {
        pageLanguage: "es",                            // idioma original
        includedLanguages: "en,fr,ar,pt,ro,uk,zh-CN",  // debe coincidir con los <option> (menos "es")
        autoDisplay: false                             // no mostrar la barra de Google
      },
      widgetId
    );
  };

  // Al cambiar de idioma en NUESTRO selector
  select.addEventListener("change", () => {
    const lang = select.value; // por ejemplo "fr"

    // Busca el <select> que Google ha creado dentro del contenedor oculto
    const googleSelect = document.querySelector("#" + widgetId + " select");
    if (!googleSelect) return; // Google aún no ha cargado

    // Copia la elección en el selector de Google ("" = idioma original)
    googleSelect.value = lang === "es" ? "" : lang;

    // Dispara "change" para que Google traduzca la página
    googleSelect.dispatchEvent(new Event("change", { bubbles: true }));

    // Mantiene el atributo lang de <html> acorde al idioma
    document.documentElement.lang = lang;
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