function openNav() { // Función para abrir el sidenav
  const sidenav = document.getElementById("sidenav"); // Obtiene el elemento con id "sidenav"
  sidenav.style.height = "100vh"; // Estilo del sidenav de la altura a 100vh (viewport height)
  sidenav.classList.remove("is-closed"); // Elimina la clase is-closed del sidenav (indica que está abierto)
  document.getElementById("main").style.marginLeft = "260px"; // Estilo del main con margen a la izquierda a 260px (el contenido es empujado a la derecha 260 píxeles)

  // Indica a los lectores de pantalla que el menú lateral está abierto (true)
  sidenav.querySelector(".closebtn").setAttribute("aria-expanded", "true"); // El botón de cerrar está abierto/aparece (true)
  document.querySelector(".open-nav-button").setAttribute("aria-expanded", "true"); // El menú lateral está abierto (true)
}

function closeNav() { // Función para cerrar el sidenav
  const sidenav = document.getElementById("sidenav"); // Obtiene el elemento con id "sidenav"
  sidenav.style.height = "0"; // Estilo del sidenav de la altura a 0
  sidenav.classList.add("is-closed"); // Agrega la clase is-closed al sidenav (indica que está cerrado)
  document.getElementById("main").style.marginLeft = "0"; // Estilo del main con margen a la izquierda a 0

  // Indica a los lectores de pantalla que el menú lateral está cerrado (false)
  sidenav.querySelector(".closebtn").setAttribute("aria-expanded", "false"); // El botón de cerrar está cerrado/no aparece (false)
  document.querySelector(".open-nav-button").setAttribute("aria-expanded", "false"); // El menú lateral está cerrado (false) 
}

