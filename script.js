// script.js (versión mejorada)

// estado del menú (compatible con tu código actual)
let menuVisible = false;

// Actualiza atributos aria del botón toggle si existe
function updateAria(open) {
  const btn = document.querySelector('.nav-responsive');
  if (!btn) return;
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

// Mostrar / ocultar menú (mantiene el nombre para el onclick en HTML)
function mostrarOcultarMenu() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  if (menuVisible) {
    nav.classList.remove('responsive');
    menuVisible = false;
    updateAria(false);
  } else {
    nav.classList.add('responsive');
    menuVisible = true;
    updateAria(true);
  }
}

// Seleccionar (cerrar menú al elegir un enlace)
function seleccionar() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  nav.classList.remove('responsive');
  menuVisible = false;
  updateAria(false);
}

/* ---------- Mejoras de UX / accesibilidad ---------- */

// Asegurar que el botón toggle tenga atributos ARIA y sea activable con teclado
(function setupToggleAccessibility(){
  const btn = document.querySelector('.nav-responsive');
  const nav = document.getElementById('nav');
  if (!btn) return;

  btn.setAttribute('aria-controls', nav ? nav.id : 'nav');
  if (!btn.hasAttribute('aria-expanded')) btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('role', 'button');
  btn.setAttribute('tabindex', '0');

  // Enter / Space abren/cierra el menú
  btn.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      mostrarOcultarMenu();
    }
  });
})();

// Cerrar el menú al pulsar ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuVisible) {
    seleccionar();
  }
});

// Cerrar el menú al clicar fuera (cuando está abierto)
document.addEventListener('click', (e) => {
  if (!menuVisible) return;
  const clickedInsideNav = Boolean(e.target.closest('#nav'));
  const clickedToggle = Boolean(e.target.closest('.nav-responsive'));
  if (!clickedInsideNav && !clickedToggle) {
    seleccionar();
  }
});

/* ---------- Scroll handling ---------- */
/* En lugar de asignar window.onscroll (que sobrescribe), añadimos listener. 
   Si ya tienes una función efectoHabilidades() definida en tu proyecto, se llamará. */
if (typeof efectoHabilidades === 'function') {
  window.addEventListener('scroll', efectoHabilidades);
}

/*let menuVisible = false;
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}

function seleccionar(){
    document.getElementById("nav").classList = "";
    menuVisible = false;
}

window.onscroll = function(){
    efectoHabilidades();
} */