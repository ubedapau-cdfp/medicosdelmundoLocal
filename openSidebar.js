function openNav() {
  const sidenav = document.getElementById("sidenav");
  sidenav.style.height = "100vh";
  sidenav.classList.remove("is-closed");
  document.getElementById("main").style.marginLeft = "260px";
  sidenav.querySelector(".closebtn").setAttribute("aria-expanded", "true");
  document.querySelector(".open-nav-button").setAttribute("aria-expanded", "true");
}

function closeNav() {
  const sidenav = document.getElementById("sidenav");
  sidenav.style.height = "0";
  sidenav.classList.add("is-closed");
  document.getElementById("main").style.marginLeft = "0";
  sidenav.querySelector(".closebtn").setAttribute("aria-expanded", "false");
  document.querySelector(".open-nav-button").setAttribute("aria-expanded", "false");
}
