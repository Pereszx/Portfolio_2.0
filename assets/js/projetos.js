document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Anima o título
    gsap.from("#titulo", {
        scrollTrigger: {
            trigger: "#titulo",
            start: "top 80%", // começa quando 80% da tela atinge o topo do título
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
    });

    // Anima cada card individualmente em cascata
    gsap.from(".card", {
        scrollTrigger: {
            trigger: "#cards",
            start: "top 85%",
            toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 2,
        stagger: 0.2,
        ease: "power3.out"
    });
});
