document.addEventListener('DOMContentLoaded', () => {

    // ---- LÓGICA DO SELETOR DE IDIOMAS ----
    // ... (toda a lógica de idioma continua exatamente a mesma) ...

    // ---- LÓGICA DO ZOOM NA GALERIA (LIGHTBOX) ----
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', (event) => {
            // Previne o comportamento padrão do link (que seria abrir a imagem em outra página)
            event.preventDefault();

            // Pega o caminho da imagem do link
            const imageUrl = item.getAttribute('href');

            // Cria e mostra o lightbox com a imagem clicada
            basicLightbox.create(`
                <img src="${imageUrl}" class="pixel-art">
            `).show();
        });
    });

    // ---- Animação de Fade-in ao Rolar a Página ----
    const sections = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // A LÓGICA DO FORMULÁRIO FOI REMOVIDA DAQUI, POIS O FORMSpree CUIDARÁ DISSO.
});