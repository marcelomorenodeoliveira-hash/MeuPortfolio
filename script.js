const competencias = [
    "HTML",
    "CSS",
    "JavaScript",
    "Manutenção de sistemas elétricos.",
    "Utilização de ferramentas e equipamentos de manutenção.",
];

document.addEventListener("DOMContentLoaded", () => {
    menuMobile();
    imprimeCv();
    scrollSpy();
    revelarElementos();
    animarBarras();
    contadores();
    formulario();
});

function mostrar() {
    const lista = document.getElementById("lista");

    lista.innerHTML = "";

    competencias.forEach((comp, i) => {
        const li = document.createElement("li");
        li.textContent = comp;
        li.style.animationDelay = (i * 0.08) + "s";
        lista.appendChild(li);
    });
}

function menuMobile() {
    const btn = document.getElementById("btnMenu");
    const nav = document.getElementById("nav");

    btn.addEventListener("click", () => {
        const aberto = nav.classList.toggle("aberto");
        btn.classList.toggle("ativo", aberto);
        btn.setAttribute("aria-expanded", String(aberto));
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("aberto");
            btn.classList.remove("ativo");
        });
    });
}

function imprimeCv() {
    const botoes = [
        document.getElementById("btnImprimir"),
        document.getElementById("btnImprimirHero"),
        document.getElementById("btnImprimirCta"),
    ];

    botoes.forEach(botao => {
        if (botao) botao.addEventListener("click", () => window.print());
    });
}

function scrollSpy() {
    const secoes = document.querySelectorAll("main section[id]");
    const links = document.querySelectorAll(".nav a");

    const observer = new IntersectionObserver(entradas => {
        entradas.forEach(entrada => {
            if (!entrada.isIntersecting) return;

            links.forEach(link => {
                link.classList.toggle("ativo", link.getAttribute("href") === "#" + entrada.target.id);
            });
        });
    }, { rootMargin: "-40% 0px -55% 0px" });

    secoes.forEach(secao => observer.observe(secao));
}

function revelarElementos() {
    const elementos = document.querySelectorAll(".cartao, .stat, .timeline-item, .secao-cabecalho");
    const revelar = (entradas, obs) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("revelado");
                entrada.target.style.opacity = 1;
                obs.unobserve(entrada.target);
            }
        });
    };

    const observer = new IntersectionObserver(revelar, { threshold: 0.12 });

    elementos.forEach(el => {
        el.style.opacity = 0;
        el.style.transition = "opacity .6s ease, transform .6s ease";
        observer.observe(el);
    });
}

function animarBarras() {
    const barras = document.querySelectorAll(".barra i, .progresso-barra i");

    const observer = new IntersectionObserver(entradas => {
        entradas.forEach(entrada => {
            if (!entrada.isIntersecting) return;

            const dado = entrada.target.getAttribute("data-valor");
            const variavel = getComputedStyle(entrada.target).getPropertyValue("--valor");
            const valor = (dado ? dado + "%" : variavel).trim();

            entrada.target.style.width = valor;
            observer.unobserve(entrada.target);
        });
    }, { threshold: 0.4 });

    barras.forEach(barra => observer.observe(barra));
}

function contadores() {
    const contadoresEl = document.querySelectorAll(".contador");

    const observer = new IntersectionObserver(entradas => {
        entradas.forEach(entrada => {
            if (!entrada.isIntersecting) return;

            const alvo = parseInt(entrada.target.dataset.objetivo, 10);
            const sufixo = entrada.target.dataset.sufixo || "";
            let atual = 0;

            const passo = Math.max(1, Math.round(alvo / 30));

            const intervalo = setInterval(() => {
                atual = Math.min(alvo, atual + passo);
                entrada.target.textContent = atual + sufixo;
                if (atual >= alvo) clearInterval(intervalo);
            }, 40);

            observer.unobserve(entrada.target);
        });
    }, { threshold: 0.4 });

    contadoresEl.forEach(c => observer.observe(c));
}

function formulario() {
    const form = document.getElementById("formContacto");
    const nota = document.getElementById("formNota");

    form.addEventListener("submit", event => {
        event.preventDefault();

        const nome = document.getElementById("nome");
        const email = document.getElementById("email");
        const mensagem = document.getElementById("mensagem");

        let valido = true;

        [nome, email, mensagem].forEach(campo => {
            campo.style.borderColor = "";
        });

        if (nome.value.trim().length < 2) {
            nome.style.borderColor = "#dc2626";
            nota.textContent = "⚠️ Preenche o teu nome.";
            valido = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            email.style.borderColor = "#dc2626";
            nota.textContent = "⚠️ Indica um email válido.";
            valido = false;
        } else if (mensagem.value.trim().length < 10) {
            mensagem.style.borderColor = "#dc2626";
            nota.textContent = "⚠️ Escreve uma mensagem com pelo menos 10 caracteres.";
            valido = false;
        }

        if (valido) {
            nota.style.color = "#16a34a";
            nota.textContent = "✅ Mensagem enviada! Obrigado pelo contacto.";
            form.reset();
        } else {
            nota.style.color = "#dc2626";
        }
    });
}