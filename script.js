/**
 * Script Principal para Free Tour Cartagena
 * Lógica pura en JavaScript Vanilla (Sin librerías)
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Menú Hamburguesa & Navegación Móvil
       ========================================================================== */
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navbar.classList.toggle('active');
        
        // Evitar scroll cuando está abierto el menú
        document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Cerrar menú al clickear enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    /* ==========================================================================
       2. Cambiar estilo del Header al scrollear
       ========================================================================== */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            header.style.padding = '0.5rem 0'; // Compactar un poco
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
            header.style.padding = '1rem 0';
        }
    });

    /* ==========================================================================
       3. Carrusel de Testimonios
       ========================================================================== */
    const sliderContainer = document.getElementById('testimonial-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dotsContainer = document.getElementById('slider-dots');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;

    // Crear puntos indicadores (dots)
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);
        
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    const dots = document.querySelectorAll('.dot');

    function updateSlider() {
        // Mover contenedor (-100% por slide)
        sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Actualizar dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }

    function goToNextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
        resetAutoPlay();
    }

    function goToPrevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
        resetAutoPlay();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
        resetAutoPlay();
    }

    // Eventos botones Prev/Next
    nextBtn.addEventListener('click', goToNextSlide);
    prevBtn.addEventListener('click', goToPrevSlide);

    // Auto Play
    function startAutoPlay() {
        autoPlayInterval = setInterval(goToNextSlide, 5000); // 5 segundos
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    startAutoPlay(); // Iniciar autoplay

    /* ==========================================================================
       4. Carrusel de Contacto (Autoplay)
       ========================================================================== */
    const contactSliderScroll = document.getElementById('contact-carousel');
    const contactSlides = document.querySelectorAll('.contact-slide');
    const contactDotsContainer = document.getElementById('contact-slider-dots');

    if (contactSliderScroll && contactSlides.length > 0) {
        let currentContactSlide = 0;
        const totalContactSlides = contactSlides.length;

        // Crear puntos indicadores (dots)
        if (contactDotsContainer) {
            contactSlides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('contact-dot');
                if (index === 0) dot.classList.add('active');
                dot.dataset.index = index;
                contactDotsContainer.appendChild(dot);

                dot.addEventListener('click', () => {
                    currentContactSlide = index;
                    updateContactSlider();
                });
            });
        }

        const contactDots = document.querySelectorAll('.contact-dot');

        function updateContactSlider() {
            contactSliderScroll.style.transform = `translateX(-${currentContactSlide * 100}%)`;
            if (contactDots.length > 0) {
                contactDots.forEach(dot => dot.classList.remove('active'));
                if (contactDots[currentContactSlide]) {
                    contactDots[currentContactSlide].classList.add('active');
                }
            }
        }

        function nextContactSlide() {
            currentContactSlide = (currentContactSlide + 1) % totalContactSlides;
            updateContactSlider();
        }

        setInterval(nextContactSlide, 4000); // 4 segundos
    }

    /* ==========================================================================
       5. Formulario de Contacto (Simulación - Solo si existe)
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const contactSuccess = document.getElementById('contact-success');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evitar recarga
            
            // Simular envío de datos
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Enviando...';
            btn.disabled = true;

            setTimeout(() => {
                if (contactSuccess) {
                    contactSuccess.classList.remove('hidden');
                }
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
                
                // Ocultar mensaje después de unos segundos
                setTimeout(() => {
                    if (contactSuccess) {
                        contactSuccess.classList.add('hidden');
                    }
                }, 4000);
            }, 1500);
        });
    }



});

// Función para abrir el Modal de Detalles a pantalla completa
window.openTourDetails = function(btn, title) {
    const card = btn.closest('.tour-card');
    const cardContent = btn.closest('.tour-card-content');
    const imgElement = card.querySelector('.tour-card-img img');
    
    // Tomar la estructura HTML de detalles oculta dentro de la tarjeta
    const detailsHtml = cardContent.querySelector('.tour-more-details').innerHTML;
    
    const modalImgData = imgElement.dataset.modalImg || imgElement.src;
    const images = modalImgData.split(',');
    
    let imagesHtml = '';
    if (images.length > 1) {
        imagesHtml = `
            <div class="modal-carousel" id="modal-carousel" data-current="0">
                <div class="modal-carousel-inner" id="modal-carousel-inner">
                    ${images.map(img => `<img src="${img.trim()}" alt="${imgElement.alt}">`).join('')}
                </div>
                <button class="modal-carousel-btn prev" onclick="moveModalCarousel(-1)">❮</button>
                <button class="modal-carousel-btn next" onclick="moveModalCarousel(1)">❯</button>
            </div>
        `;
    } else {
        imagesHtml = `<img src="${images[0].trim()}" alt="${imgElement.alt}">`;
    }

    // Extraer el botón de reserva real de la tarjeta para mantener el enlace correcto
    const btnReservaOriginal = cardContent.querySelector('.btn-primary');
    const hrefReserva = btnReservaOriginal ? btnReservaOriginal.getAttribute('href') : '#';
    const textoReserva = btnReservaOriginal ? btnReservaOriginal.textContent : 'Reservar';

    // Construir nuevo interior del modal con la imagen y el botón de reserva en su columna
    const enhancedHtml = `
        <div class="modal-layout">
            <div class="modal-text">
                ${detailsHtml}
            </div>
            <div class="modal-image-col">
                <div class="modal-image">
                    ${imagesHtml}
                </div>
                <a href="${hrefReserva}" target="_blank" rel="noopener noreferrer" class="btn btn-primary modal-booking-btn">
                    ${textoReserva}
                </a>
            </div>
        </div>
    `;
    
    // Inyectarlo en el modal
    document.getElementById('details-title').innerHTML = title;
    document.getElementById('details-body').innerHTML = enhancedHtml;
    
    // Mostrar modal
    document.getElementById('details-modal').classList.add('active');
    document.body.style.overflow = 'hidden'; // Previene scroll del fondo
};

window.closeDetailsModal = function() {
    document.getElementById('details-modal').classList.remove('active');
    document.body.style.overflow = '';
};

document.getElementById('details-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('details-modal') || e.target.classList.contains('modal-overlay')) {
        closeDetailsModal();
    }
});

window.moveModalCarousel = function(direction) {
    const carousel = document.getElementById('modal-carousel');
    const inner = document.getElementById('modal-carousel-inner');
    if (!carousel || !inner) return;
    
    const totalSlides = inner.children.length;
    let current = parseInt(carousel.dataset.current, 10);
    
    current = (current + direction + totalSlides) % totalSlides;
    carousel.dataset.current = current;
    
    inner.style.transform = `translateX(-${current * 100}%)`;
};
