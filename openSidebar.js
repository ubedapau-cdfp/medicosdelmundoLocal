function openNav() {
  const sidenav = document.getElementById("sidenav");
  sidenav.style.height = "100vh";
  sidenav.classList.remove("is-closed");
  document.getElementById("main").style.marginLeft = "260px";
}

function closeNav() {
  const sidenav = document.getElementById("sidenav");
  sidenav.style.height = "0";
  sidenav.classList.add("is-closed");
  document.getElementById("main").style.marginLeft = "0";
}