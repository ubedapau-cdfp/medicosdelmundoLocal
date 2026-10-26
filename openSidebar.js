function openNav() { // Función para abrir el sidenav
  const sidenav = document.getElementById("sidenav"); // Obtiene el elemento con id sidenav
  sidenav.style.height = "100vh"; // Estilo del sidenav de la altura a 100vh (vignette height)
  sidenav.classList.remove("is-closed"); // Elimina la clase is-closed del sidenav (indica que está abierto)
  document.getElementById("main").style.marginLeft = "260px"; // Estilo del main con margen a la izquierda a 260px (el contenido es empujado a la derecha 260 píxeles)
}

function closeNav() { // Funcion para el sidenav
  const sidenav = document.getElementById("sidenav"); // Obtiene el elemento con id sidenav
  sidenav.style.height = "0"; // Estilo del sidenav de la altura a 0
  sidenav.classList.add("is-closed"); // Añáde la clase is-closed del sidenav (indica que está cerrado)
  document.getElementById("main").style.marginLeft = "0"; // Estilo del main con margen a la izquierda a 0 (el contenido está en su posición original)
}