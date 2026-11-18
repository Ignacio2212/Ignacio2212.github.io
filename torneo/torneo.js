const llaves = [
    {
        ronda: "Cuartos",
        partidos: [
            { jugador1: "Fabiana",  jugador2: "Lautaro",  ganador: "Lautaro" },
            { jugador1: "Santiago", jugador2: "Ignacio",  ganador: "Santiago" },
            { jugador1: "Segundo",  jugador2: "Eleonora", ganador: "Segundo" },
            { jugador1: "Matias",   jugador2: "Gonzalo",  ganador: "Matias" }
        ]
    },
    {
        ronda: "Semifinal",
        partidos: [
            { jugador1: "Lautaro", jugador2: "Santiago", ganador: "Santiago" },
            { jugador1: "Segundo", jugador2: "Matias",   ganador: "Segundo" }
        ]
    },
    {
        ronda: "Final",
        partidos: [
            { jugador1: "Santiago", jugador2: "Segundo", ganador: "Santiago" }
        ]
    }
];


function crearJugador(nombre, goles, esGanador) {
    const jugador = document.createElement("div");
    jugador.classList.add("player");

    if (esGanador) {
        jugador.classList.add("winner");
    }

    const spanNombre = document.createElement("span");
    spanNombre.classList.add("name");
    spanNombre.textContent = nombre;
    jugador.appendChild(spanNombre);

    const spanScore = document.createElement("span");
    spanScore.classList.add("score");
    if (goles !== undefined) {
        spanScore.textContent = goles;
    } else if (esGanador) {
        spanScore.innerHTML = '<i class="ri-check-line"></i>';
    }
    jugador.appendChild(spanScore);

    return jugador;
}


function armarLlaves() {
    const contenedor = document.getElementById("bracket");
    if (!contenedor) return;

    // Recorremos cada ronda (Cuartos, Semifinal, Final)
    llaves.forEach(function (ronda) {
        // Columna de la ronda
        const columna = document.createElement("div");
        columna.classList.add("round");

        // Titulo de la ronda
        const titulo = document.createElement("h4");
        titulo.textContent = ronda.ronda;
        columna.appendChild(titulo);

        // Contenedor de los partidos de esa ronda
        const listaPartidos = document.createElement("div");
        listaPartidos.classList.add("matches");

        // Recorremos cada partido de la ronda
        ronda.partidos.forEach(function (partido) {
            const caja = document.createElement("div");
            caja.classList.add("match");

            caja.appendChild(crearJugador(partido.jugador1, partido.goles1, partido.ganador === partido.jugador1));
            caja.appendChild(crearJugador(partido.jugador2, partido.goles2, partido.ganador === partido.jugador2));

            listaPartidos.appendChild(caja);
        });

        columna.appendChild(listaPartidos);
        contenedor.appendChild(columna);
    });

    // Ultima columna: el campeon
    const ultimaRonda = llaves[llaves.length - 1];
    const campeon = ultimaRonda.partidos[0].ganador;

    const columnaCampeon = document.createElement("div");
    columnaCampeon.classList.add("round");
    columnaCampeon.innerHTML = `
        <h4>Campeón</h4>
        <div class="matches">
            <div class="champion">
                <i class="ri-trophy-fill"></i>
                <p>Campeón</p>
                <h3>${campeon}</h3>
            </div>
        </div>
    `;
    contenedor.appendChild(columnaCampeon);
}

armarLlaves();


/*  MENU EN CELULAR  */

const menuBtn = document.getElementById("menu-btn");
const navlist = document.getElementById("navlist");

if (menuBtn && navlist) {
    menuBtn.addEventListener("click", function () {
        navlist.classList.toggle("open");

        const icono = menuBtn.querySelector("i");
        if (navlist.classList.contains("open")) {
            icono.className = "ri-close-line";
        } else {
            icono.className = "ri-menu-line";
        }
    });

    // Al tocar un link del menu, se cierra solo
    navlist.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navlist.classList.remove("open");
            menuBtn.querySelector("i").className = "ri-menu-line";
        });
    });
}


/*  ANIMACIONES AL SCROLLEAR  */

const elementosAnimados = document.querySelectorAll(
    ".section-title, .format-card, .round, .podium-card, .rules li, .sponsor-banner, .sponsor p, .gallery, .ig-link"
);

elementosAnimados.forEach(function (elemento) {
    elemento.classList.add("reveal");
    const hermanos = Array.from(elemento.parentElement.children);
    const posicion = hermanos.indexOf(elemento);
    elemento.style.transitionDelay = Math.min(posicion * 0.1, 0.5) + "s";
});

const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            observador.unobserve(entrada.target);
        }
    });
}, { threshold: 0.15 });

elementosAnimados.forEach(function (elemento) {
    observador.observe(elemento);
});


/*  BOTON "VOLVER ARRIBA"  */

const botonArriba = document.getElementById("back-to-top");

if (botonArriba) {
    window.addEventListener("scroll", function () {
        if (window.scrollY > 500) {
            botonArriba.classList.add("show");
        } else {
            botonArriba.classList.remove("show");
        }
    });

    // Al tocarlo, sube hasta arriba de todo suavemente
    botonArriba.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}