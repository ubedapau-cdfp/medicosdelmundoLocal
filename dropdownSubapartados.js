// Selecciona TODOS los elementos del HTML que tengan la clase "dropbtn"
// querySelectorAll devuelve una lista con todos ellos.
const dropdownButtons = document.querySelectorAll(".dropbtn");

// Función que recibe un botón y devuelve el submenú que ese botón controla.
function getSubmenu(button) {
    // Cada botón tiene un atributo aria-controls="id-del-submenu" en el HTML.
    // Leemos ese valor y buscamos el elemento que tenga ese id.
    const submenu = document.getElementById(button.getAttribute("aria-controls"));

    // Si no existe ningún elemento con ese id (submenu es null),
    // lanzamos un error con un mensaje claro para saber qué botón falló.
    // trim() quita los espacios sobrantes del texto del botón.
    if (!submenu) {
        throw new Error(`No se encontró el subapartado de "${button.textContent.trim()}".`);
    }

    // Si todo va bien, devolvemos el submenú encontrado.
    return submenu;
}

// Función que cierra todos los menús desplegables.
function closeDropdowns() {
    // Recorremos cada botón de la lista...
    dropdownButtons.forEach((button) => {
        // ...obtenemos su submenú y le quitamos la clase "show"
        // (el CSS usa esa clase para mostrarlo; sin ella, queda oculto).
        getSubmenu(button).classList.remove("show");

        // Actualizamos el atributo de accesibilidad: "false" indica
        // a los lectores de pantalla que el menú está cerrado.
        button.setAttribute("aria-expanded", "false");
    });
}

// Recorremos cada botón para asignarle su comportamiento al hacer clic.
dropdownButtons.forEach((button) => {
    // addEventListener "escucha" el evento click sobre este botón.
    button.addEventListener("click", () => {
        // Obtenemos el submenú asociado a este botón concreto.
        const submenu = getSubmenu(button);

        // classList.toggle("show") hace dos cosas a la vez:
        //  - si el submenú NO tenía la clase "show", se la añade y devuelve true
        //  - si ya la tenía, se la quita y devuelve false
        // Guardamos ese resultado en isOpen (true = abierto, false = cerrado).
        const isOpen = submenu.classList.toggle("show");

        // Sincronizamos aria-expanded con el estado real del menú.
        // String() convierte true/false en "true"/"false", porque los
        // atributos HTML siempre son texto.
        button.setAttribute("aria-expanded", String(isOpen));
    });
});