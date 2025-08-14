document.addEventListener('DOMContentLoaded', () => {
    // 1. Desplazamiento suave para los enlaces del menú de navegación
    document.querySelectorAll('.nav-menu a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Evita el comportamiento predeterminado del enlace

            const targetId = this.getAttribute('href').substring(1); // Obtiene el ID de la sección
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Calcula la posición de desplazamiento
                const offsetTop = targetSection.offsetTop - document.querySelector('.header').offsetHeight; // Ajusta por la altura del header fijo

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth' // Desplazamiento suave
                });
            }
        });
    });

    // 2. Animación de fade-in para las secciones al hacer scroll (Intersection Observer)
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        root: null, // El viewport es el elemento raíz
        rootMargin: '0px', // No hay margen extra
        threshold: 0.1 // Cuando el 10% de la sección es visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si la sección es visible, añade la clase 'is-visible'
                entry.target.classList.add('is-visible');
                // Deja de observar una vez que ha aparecido
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section); // Empieza a observar cada sección
    });

    // 3. Animación de llenado de barras de habilidad al ser visibles
    const skillBars = document.querySelectorAll('.skill-level .level-bar');

    const skillObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Cuando el 50% de la barra es visible
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillWidth = entry.target.style.width; // Obtiene el ancho final del estilo inline
                // Establece una variable CSS personalizada para la animación
                entry.target.style.setProperty('--skill-width', skillWidth);
                entry.target.style.width = skillWidth; // Asegura que el ancho final se aplique
                entry.target.style.animation = 'fillBar 1.5s ease-out forwards'; // Activa la animación
                observer.unobserve(entry.target); // Deja de observar una vez animado
            }
        });
    }, skillObserverOptions);

    skillBars.forEach(bar => {
        skillObserver.observe(bar); // Observa cada barra de habilidad
    });

    // 4. Efecto de texto tipo "máquina de escribir" para el subtítulo del héroe
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const textToType = heroSubtitle.textContent;
    heroSubtitle.textContent = ''; // Limpia el contenido inicial
    let charIndex = 0;
    const typingSpeed = 50; // Velocidad de escritura en ms

    function typeWriter() {
        if (charIndex < textToType.length) {
            heroSubtitle.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        }
    }

    // Retrasa el inicio del efecto de escritura hasta que el héroe sea visible
    const heroSection = document.getElementById('hero');
    const heroObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(typeWriter, 1000); // Inicia la escritura después de 1 segundo de que la sección sea visible
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // Observa cuando el 50% de la sección hero es visible

    heroObserver.observe(heroSection);
});
