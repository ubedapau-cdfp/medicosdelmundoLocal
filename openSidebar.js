// Abre el menú lateral (sidenav)
function openNav() {
  // Obtiene el elemento con id "sidenav" (el menú lateral)
  const sidenav = document.getElementById("sidenav");

  // Establece la anchura del sidenav en 260px, haciéndolo visible
  sidenav.style.width = "260px";

  // Quita la clase "is-closed": sin ella, el sidenav se considera abierto
  sidenav.classList.remove("is-closed");

  // Aplica un margen izquierdo de 260px al contenido principal (main)
  // para que el menú no lo tape: el contenido se desplaza a la derecha
  document.getElementById("main").style.marginLeft = "260px";
}

// Cierra el menú lateral (sidenav)
function closeNav() {
  // Obtiene el elemento con id "sidenav"
  const sidenav = document.getElementById("sidenav");

  // Reduce la anchura del sidenav a 0, ocultándolo
  sidenav.style.width = "0";

  // Añade la clase "is-closed" para marcar el menú como cerrado
  // (el CSS puede usarla para ocultar el contenido interno, por ejemplo)
  sidenav.classList.add("is-closed");

  // Quita el margen izquierdo del contenido principal (main)
  // para que vuelva a ocupar todo el ancho de la página
  document.getElementById("main").style.marginLeft = "0";
}