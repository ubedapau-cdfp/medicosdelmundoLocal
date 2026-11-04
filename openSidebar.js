// -------------------------- MENÚ LATERAL - P. ÚBEDA  --------------------------------
// Escritorio (más de 900px): el menú empuja el contenido y se cierra con la X.
// Tablet y móvil (900px o menos): el menú es un panel superpuesto, cerrado por
// defecto. Todo el control se hace con CLASES (is-open / is-closed / nav-open):
// el CSS decide cómo se ve, así no hace falta ningún estilo en línea.

// Cumple la misma condición que el @media de los estilos: si la anchura de la ventana es 900px o menos, se considera tablet/móvil.
const NAV_MOVIL = window.matchMedia("(max-width: 900px)");

// Abre el menú lateral (sidenav)
function openNav() {
  const sidenav = document.getElementById("sidenav"); // Recoge el id sidenav para reconocer al menú
  if (!sidenav) return; // Si no existe, no hace nada

  // Escritorio: quita "is-closed". Tablet/móvil: añade "is-open"
  sidenav.classList.remove("is-closed"); // Se quita la clase de cerrado, escondiendo el botón de abrir menú.
  sidenav.classList.add("is-open"); // Se añade la clase is-open, puesto que el menú está abierto/abriéndose.

  if (NAV_MOVIL.matches) { // Si es tablet o móvil (match)
    document.body.classList.add("nav-open"); // Muestra la capa oscura y bloquea el scroll de la página

    const cerrar = sidenav.querySelector(".closebtn"); // Recoge el botón de cerrar dentro del menú
    if (cerrar) cerrar.focus(); // Se enfoca el botón de cerrar para su uso.
  }
}

// Cierra el menú lateral (sidenav)
function closeNav() {
  const sidenav = document.getElementById("sidenav"); // Recoge el id sidenav para reconocer al menú
  if (!sidenav) return; // Si no existe, no hace nada

  sidenav.classList.add("is-closed"); // El menú se cierra, enseñando el botón de abrir menú
  sidenav.classList.remove("is-open"); // La clase de is-open se quita, porque el menú ya no está abierto.
  document.body.classList.remove("nav-open"); // Quita la clase nav-open del body, que es la que bloquea el scroll y muestra la capa oscura detrás del menú.

  const abrir = document.querySelector(".open-nav-button"); // Recoge el botón de abrir el menú
  if (abrir) abrir.focus(); // Se enfoca el botón de abrir (si existe), que ahora está visible
}

// Estado inicial de cada tamaño: sin clases, el CSS deja el menú abierto en
// escritorio y cerrado en tablet/móvil. Se repite al cambiar de tamaño
// (girar el móvil, redimensionar la ventana...).

function reiniciarMenu() { // 
  const sidenav = document.getElementById("sidenav"); // Recoge el id sidenav para reconocer al menú
  if (!sidenav) return; // Si no existe, no hace nada
  sidenav.classList.remove("is-open", "is-closed"); // Quita las clases de abierto y cerrado, dejando el menú en su estado inicial según el tamaño de la ventana
  document.body.classList.remove("nav-open"); // Quita la clase nav-open del body, que es la que bloquea el scroll y muestra la capa oscura detrás del menú.
}

// Capa oscura detrás del menú: se crea aquí para no tocar el HTML de cada página.
// Al tocarla se cierra el menú.
const backdrop = document.createElement("div"); // Crea un div nuevo para oscurecer el fondo detrás del menú lateral (para móvil y tablet).
backdrop.className = "nav-backdrop"; // Le da la clase nav-backdrop, que es la que lo hace visible y con fondo oscuro
backdrop.setAttribute("aria-hidden", "true"); // Se pone aria-hidden="true" para que los lectores de pantalla ignoren este div, que no tiene contenido ni función para el usuario.
backdrop.addEventListener("click", closeNav); // Al hacer click en el fondo oscuro, el menú se cierra.
document.body.appendChild(backdrop); // Añade el div al final del body, para que quede detrás del menú lateral y delante del resto de la página

// Tecla Escape: cierra el menú cuando está abierto en tablet/móvil
document.addEventListener("keydown", function (evento) { // Escucha el pulsado de teclas en la página
  if (evento.key === "Escape" && document.body.classList.contains("nav-open")) { // Si la tecla es Escape, y el menú está abierto
    closeNav(); // Se cierra el menú
  }
});

NAV_MOVIL.addEventListener("change", reiniciarMenu); // Cuando el tamaño de la ventana cambia, y pasa de escritorio a tablet o móvil, se reinicia el estado del menú.
reiniciarMenu(); // Ejecutado al cargar la página.