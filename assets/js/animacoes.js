// Animações do site (GSAP + ScrollTrigger)
document.addEventListener("DOMContentLoaded", () => {
    if (!window.gsap || !window.ScrollTrigger) return; // sem GSAP o site continua funcionando, só sem animação
    gsap.registerPlugin(ScrollTrigger);

    // Barra de progresso de leitura (sempre ativa, é só indicador)
    gsap.to("#scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 }
    });

    // Destaca no menu a seção que está na tela
    const secoes = [
        { link: 'a[href="#sobre-mim"]', trigger: "#sobre-mim" },
        { link: 'a[href="#stack"]', trigger: "#stack" },
        { link: 'a[href="#projetos"]', trigger: "#projetos", endTrigger: "#cards" },
        { link: 'a[href="#contatos"]', trigger: "#contatos" }
    ];
    secoes.forEach(({ link, trigger, endTrigger }) => {
        const el = document.querySelector(`#links ${link}`);
        if (!el || !document.querySelector(trigger)) return;
        ScrollTrigger.create({
            trigger,
            endTrigger: endTrigger || trigger,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => el.classList.toggle("ativo-link", self.isActive)
        });
    });

    // Animações de movimento: desligadas para quem prefere menos movimento
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {

        // Revela elementos ao entrarem na tela
        const revelar = (alvos, opcoes = {}, trigger) => {
            const lista = gsap.utils.toArray(alvos);
            if (!lista.length) return;
            // Transições CSS (usadas no hover) brigam com o GSAP: desliga durante a entrada
            lista.forEach((el) => (el.style.transition = "none"));
            gsap.from(lista, {
                y: 40,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.12,
                ...opcoes,
                onComplete: () => lista.forEach((el) => {
                    el.style.transition = "";
                    gsap.set(el, { clearProps: "transform,opacity" });
                }),
                scrollTrigger: {
                    trigger: trigger || lista[0],
                    start: "top 85%",
                    once: true
                }
            });
        };

        // ---------- Primeira seção ----------
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
            .from("#profile-img", { scale: 0.7, opacity: 0, duration: 1.2, ease: "back.out(1.4)" })
            .from("#profile-title > *", { y: 30, opacity: 0, duration: 0.8, stagger: 0.15 }, "-=0.8")
            .from("#navbar", { y: -40, opacity: 0, duration: 0.6 }, "-=0.6");

        // Parallax: ao rolar, a foto desce mais devagar e o texto se afasta
        gsap.to("#profile-img", {
            y: 90,
            ease: "none",
            scrollTrigger: { trigger: "#banner", start: "top top", end: "bottom top", scrub: true }
        });
        gsap.to("#profile-text", {
            y: 50,
            opacity: 0.2,
            ease: "none",
            scrollTrigger: { trigger: "#banner", start: "center top", end: "bottom top", scrub: true }
        });

        // ---------- Terminal ----------
        revelar("#terminal", { y: 60, scale: 0.96, duration: 1 });

        // ---------- Sobre mim ----------
        revelar("#sobre-mim-title", { x: -40, y: 0 });
        revelar("#badges .badge", { y: 20, scale: 0.9, stagger: 0.1 }, "#badges");
        revelar("#sobre-mim-info > ul li", { x: -30, y: 0, stagger: 0.08 }, "#sobre-mim-info");
        revelar("#text", { y: 30 });
        revelar(".small-tec-card", { y: 30, scale: 0.85, stagger: 0.08, ease: "back.out(1.6)" }, "#tec-cards");

        // ---------- Skills ----------
        revelar("#stack-title > *", { stagger: 0.15 }, "#stack-title");
        gsap.fromTo("#stack .glow-bg",
            { scale: 0.6, opacity: 0.3 },
            {
                scale: 1.1, opacity: 1, ease: "none",
                scrollTrigger: { trigger: "#stack", start: "top bottom", end: "center center", scrub: true }
            });
        revelar("#stack-lists-bg", { y: 80, duration: 1.1 });
        gsap.utils.toArray(".stack-list").forEach((grupo, i) => {
            gsap.from(grupo.querySelectorAll("h4, li"), {
                x: -20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.05,
                delay: i * 0.1,
                ease: "power2.out",
                scrollTrigger: { trigger: grupo, start: "top 88%", once: true }
            });
        });

        // ---------- Projetos ----------
        // Título gigante desliza na horizontal conforme a rolagem
        gsap.fromTo("#titulo",
            { xPercent: -12 },
            {
                xPercent: 8, ease: "none",
                scrollTrigger: { trigger: "#projetos", start: "top bottom", end: "bottom top", scrub: true }
            });
        revelar("#titulo", { y: 60, duration: 1.2 });

        // Cards entram em cascata, linha por linha
        gsap.set(".card", { y: 60, opacity: 0, scale: 0.96 });
        ScrollTrigger.batch(".card", {
            start: "top 90%",
            once: true,
            onEnter: (cards) => gsap.to(cards, {
                y: 0, opacity: 1, scale: 1,
                duration: 1, stagger: 0.15, ease: "power3.out"
            })
        });

        // ---------- Contatos ----------
        revelar(".cta-container h2", { y: 50, scale: 0.95, duration: 1 }, "#contatos");
        revelar(".cta-container p", { delay: 0.2 }, "#contatos");
        revelar(".cta-btn", { y: 20, scale: 0.9, stagger: 0.1, delay: 0.3, ease: "back.out(1.8)" }, "#contatos");
    });
});
