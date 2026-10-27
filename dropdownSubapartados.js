const dropdownButtons = document.querySelectorAll(".dropbtn"); // Creación del array dropdownButtons, selecciona todos los "dropbtn" del documento

function getSubmenu(button) { // Función para obtener los subapartados
    const submenu = document.getElementById(button.getAttribute("aria-controls")); // Obtiene el subapartado correspondiente al botón
    if (!submenu) { // Si no se encuentra el subapartado, lanza un error
        throw new Error(`No se encontró el subapartado de "${button.textContent.trim()}".`);
    }
    return submenu; // Devuelve el subapartado correspondiente al botón
}

function closeDropdowns() { // Función para cerrar todos los subapartados
    dropdownButtons.forEach((button) => { // Recorre todos los botones del array dropdownButtons
        getSubmenu(button).classList.remove("show"); // Elimina la clase "show" del subapartado correspondiente al botón
        button.setAttribute("aria-expanded", "false"); // El atributo "aria-expanded" pasa a "false" (Dropdown cerrado)
    });
}

dropdownButtons.forEach((button) => { // Recorre todos los botones del array dropdownButtons
    button.addEventListener("click", () => { // Añade un evento de click a cada botón
        const submenu = getSubmenu(button); // Obtiene el subapartado correspondiente al botón
        const isOpen = submenu.classList.toggle("show"); // Alterna solo el subapartado correspondiente
        button.setAttribute("aria-expanded", String(isOpen)); // Actualiza el estado accesible del botón
    });
});


