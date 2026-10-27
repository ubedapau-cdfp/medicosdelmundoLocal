// Abre el menú lateral (sidenav)
function openNav() {
  // Obtiene el menú lateral por su id "sidenav"
  const sidenav = document.getElementById("sidenav");

  // F ija la altura en 100vh (100% del alto de la ventana). Es un estiloen línea,
  // necesario para anular el height: 0 que puso closeNav(). La transición
  // "height 0.5s" del CSS hace que el menú se despliegue con animación
  sidenav.style.height = "100vh";

  // Quita la clase "is-closed": se restaura el padding-top del menú y el CSS
  // deja de mostrar el botón de abrir (.open-nav-button)
  sidenav.classList.remove("is-closed");

  // Margen izquierdo de 260px en main para que el contenido no quede tapado
  // por el menú (animación con "margin-left 0.5s" del CSS)
  document.getElementById("main").style.marginLeft = "260px";

  // Accesibilidad: aria-expanded="true" indica a los lectores de pantalla
  // que el menú controlado por cada botón está desplegado
  sidenav.querySelector(".closebtn").setAttribute("aria-expanded", "true");
  document.querySelector(".open-nav-button").setAttribute("aria-expanded", "true");
}

// Cierra el menú lateral (sidenav)
function closeNav() {
  // Obtiene el menú lateral por su id "sidenav"
  const sidenav = document.getElementById("sidenav");

  // Altura 0: el menú se encoge hacia arriba hasta desaparecer. El contenido
  // queda recortado por el "overflow-x: hidden" del CSS
  sidenav.style.height = "0";

  // Añade "is-closed": el CSS pone padding-top a 0 (si no, el menú seguiría
  // midiendo 20px) y muestra el botón de abrir dentro de main
  sidenav.classList.add("is-closed");

  // Quita el margen de main para que el contenido ocupe todo el ancho
  document.getElementById("main").style.marginLeft = "0";

  // Accesibilidad: aria-expanded="false" indica que el menú está plegado
  sidenav.querySelector(".closebtn").setAttribute("aria-expanded", "false");
  document.querySelector(".open-nav-button").setAttribute("aria-expanded", "false");
}