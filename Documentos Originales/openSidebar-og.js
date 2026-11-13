// -------------------------- MENÚ LATERAL - P. ÚBEDA  --------------------------------

// Abre el menú lateral (sidenav)
function openNav() {
  // Obtiene el menú lateral por su id "sidenav"
  const sidenav = document.getElementById("sidenav");

  // Fija la anchura en 260px. Al ser un estilo en línea, tiene prioridad sobre
  // el CSS, y la transición "width 0.5s" de .sidenav hace que se anime
  sidenav.style.width = "260px";

  // Quita la clase "is-closed": así el botón de abrir (.open-nav-button)
  // deja de mostrarse, porque el CSS solo lo muestra si existe esa clase
  sidenav.classList.remove("is-closed");

  // Margen izquierdo de 260px en main para que el contenido no quede
  // tapado por el menú (se anima con "margin-left 0.5s" del CSS)
  document.getElementById("main").style.marginLeft = "260px";
}

// Cierra el menú lateral (sidenav)
function closeNav() {
  // Obtiene el menú lateral por su id "sidenav"
  const sidenav = document.getElementById("sidenav");

  // Anchura 0: el menú se encoge hasta desaparecer. El contenido queda
  // oculto por el "overflow-x: hidden" del CSS
  sidenav.style.width = "0";

  // Añade "is-closed": el CSS usa esta clase para mostrar el botón de abrir
  // el menú dentro de main
  sidenav.classList.add("is-closed");

  // Quita el margen de main para que el contenido ocupe todo el ancho
  document.getElementById("main").style.marginLeft = "0";
}