(function () {
  var widgetId = "google_translate_engine";
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

  function updateLanguageOptions() {
    var googleSelect = document.querySelector("#" + widgetId + " select");

    if (!googleSelect) {
      return;
    }

    languageSelect.disabled = false;
    statusMessage.textContent = "";
  }

  // Google Translate llama a esta función cuando termina de cargar.
  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement(
      {
        pageLanguage: "es",
        includedLanguages: "en,fr,ar,pt,ro,uk,zh-CN",
        autoDisplay: false
      },
      widgetId
    );

    var widget = document.getElementById(widgetId);
    var observer = new MutationObserver(updateLanguageOptions);
    observer.observe(widget, { childList: true, subtree: true });
    updateLanguageOptions();
  };

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

    for (var i = 0; i < languageOptions.length; i++) {
      var option = document.createElement("option");
      option.value = languageOptions[i][0];
      option.textContent = languageOptions[i][1];
      languageSelect.appendChild(option);
    }

    statusMessage = document.createElement("span");
    statusMessage.className = "translator-status";
    statusMessage.setAttribute("role", "status");
    statusMessage.setAttribute("aria-live", "polite");

    languageSelect.addEventListener("change", translatePage);

    container.appendChild(label);
    container.appendChild(languageSelect);
    container.appendChild(statusMessage);
    return container;
  }

  function translatePage() {
    var googleSelect = document.querySelector("#" + widgetId + " select");

    if (!googleSelect) {
      return;
    }

    googleSelect.value = languageSelect.value === "es" ? "" : languageSelect.value;
    googleSelect.dispatchEvent(new Event("change", { bubbles: true }));
    document.documentElement.lang = languageSelect.value;
  }

  function addTranslator() {
    var container = createTranslator();
    var navigation = document.querySelector(".sidenav");

    if (navigation) {
      navigation.insertBefore(container, navigation.querySelector(".menu"));
    } else {
      container.classList.add("translator-floating");
      document.body.appendChild(container);
    }

    var widget = document.createElement("div");
    widget.id = widgetId;
    widget.className = "translator-engine";
    widget.setAttribute("aria-hidden", "true");
    document.body.appendChild(widget);

    var script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onerror = function () {
      languageSelect.disabled = true;
      statusMessage.textContent = "No disponible sin conexión";
    };
    document.head.appendChild(script);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addTranslator, { once: true });
  } else {
    addTranslator();
  }
})();
