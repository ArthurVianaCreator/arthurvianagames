document.addEventListener('DOMContentLoaded', () => {

    // ---- LÓGICA DO SELETOR DE IDIOMAS (CORRIGIDA) ----
    const langSwitchButton = document.getElementById('lang-switch-btn');
    const translatableElements = document.querySelectorAll('[data-pt]');

    const setLanguage = (lang) => {
        // Itera sobre todos os elementos que têm o atributo 'data-pt'
        translatableElements.forEach(el => {
            // Verifica se existe uma tradução para o idioma escolhido ('pt' ou 'en')
            if (el.dataset[lang]) {
                // Se existir, atualiza o texto do elemento
                el.innerText = el.dataset[lang];
            }
        });

        // Atualiza o texto do botão para mostrar a outra opção de idioma
        langSwitchButton.innerText = lang === 'pt' ? langSwitchButton.dataset.langPt : langSwitchButton.dataset.langEn;
        
        // Salva a preferência do usuário no navegador para a próxima visita
        localStorage.setItem('savamption_lang', lang);
        
        // Atualiza o atributo 'lang' da tag <html> (bom para SEO e acessibilidade)
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    };

    // Adiciona o evento de clique ao botão
    langSwitchButton.addEventListener('click', () => {
        // Verifica qual o idioma atual e define o novo idioma como o oposto
        const currentLang = localStorage.getItem('savamption_lang') || 'pt';
        const newLang = currentLang === 'pt' ? 'en' : 'pt';
        setLanguage(newLang);
    });

    // Ao carregar a página, define o idioma salvo ou o padrão (Português)
    const savedLang = localStorage.getItem('savamption_lang');
    setLanguage(savedLang || 'pt');


    // ---- LÓGICA DO ZOOM NA GALERIA (LIGHTBOX) ----
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const imageUrl = item.getAttribute('href');
            basicLightbox.create(`<img src="${imageUrl}" class="pixel-art">`).show();
        });
    });


    // ---- Animação de Fade-in ao Rolar a Página ----
    const sections = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
});