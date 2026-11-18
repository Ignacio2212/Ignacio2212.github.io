/*  EFECTO DE ESCRITURA  */
const frases = [
    "Frontend Developer",
    "Estudiante en UADE",
    "Organizador de esports"
];

const typing = document.getElementById("typing");

let fraseActual = 0;
let letraActual = 0;
let borrando = false; // true = esta borrando, false = esta escribiendo

function escribir() {
    const frase = frases[fraseActual];

    if (borrando) {
        letraActual--; // saca una letra
    } else {
        letraActual++; // agrega una letra
    }

    typing.textContent = frase.substring(0, letraActual);

    let espera = borrando ? 50 : 100;

    if (!borrando && letraActual === frase.length) {
        espera = 1800;
        borrando = true;
    } else if (borrando && letraActual === 0) {
        borrando = false;
        fraseActual = (fraseActual + 1) % frases.length;
        espera = 400;
    }

    setTimeout(escribir, espera);
}

if (typing) {
    escribir();
}


/*  MENU QUE MARCA LA SECCION ACTUAL  */
// Todos los links del menu y todas las secciones que tienen id
const linksMenu = document.querySelectorAll(".navlist a");
const secciones = document.querySelectorAll("section[id]");

function marcarSeccion() {
    const scroll = window.scrollY + 150;

    secciones.forEach(function (seccion) {
        const arriba = seccion.offsetTop;
        const abajo = arriba + seccion.offsetHeight;
        const id = seccion.getAttribute("id");

        if (scroll >= arriba && scroll < abajo) {
            linksMenu.forEach(function (link) {
                link.classList.remove("active");
                if (link.getAttribute("href") === "#" + id) {
                    link.classList.add("active");
                }
            });
        }
    });
}

window.addEventListener("scroll", marcarSeccion);
marcarSeccion();


/*  BOTÓN "COPIAR MAIL"  */

const botonCopiar = document.getElementById("copy-email");

if (botonCopiar) {
    botonCopiar.addEventListener("click", function () {
        // El mail esta guardado en el atributo data-email del boton
        const email = botonCopiar.dataset.email;

        // Lo copia al portapapeles
        navigator.clipboard.writeText(email).then(function () {
            // Si salio bien, cambia el texto
            botonCopiar.innerHTML = '<i class="ri-check-line"></i> ¡Copiado!';
            botonCopiar.classList.add("copied");

            // A los 2 segundos vuelve a como estaba
            setTimeout(function () {
                botonCopiar.innerHTML = '<i class="ri-file-copy-line"></i> Copiar mail';
                botonCopiar.classList.remove("copied");
            }, 2000);
        });
    });
}


/*  CERRAR EL MENÚ DEL CELULAR AL TOCAR UN LINK  */
// Cuando tocas un link, lo destildamos para que el menu se cierre solo
const menuToggle = document.getElementById("menu-toggle");

linksMenu.forEach(function (link) {
    link.addEventListener("click", function () {
        if (menuToggle) {
            menuToggle.checked = false;
        }
    });
});
