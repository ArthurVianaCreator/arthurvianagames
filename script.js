document.addEventListener('DOMContentLoaded', () => {
    const langSwitchButton = document.getElementById('lang-switch-btn');
    const translatableElements = document.querySelectorAll('[data-pt]');

    const setLanguage = (lang) => {
        translatableElements.forEach(el => {
            if (el.dataset[lang]) {
                el.innerText = el.dataset[lang];
            }
        });

        langSwitchButton.innerText = lang === 'pt' ? langSwitchButton.dataset.langPt : langSwitchButton.dataset.langEn;
        localStorage.setItem('savamption_lang', lang);
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    };

    langSwitchButton.addEventListener('click', () => {
        const currentLang = localStorage.getItem('savamption_lang') || 'pt';
        const newLang = currentLang === 'pt' ? 'en' : 'pt';
        setLanguage(newLang);
    });

    const savedLang = localStorage.getItem('savamption_lang') || 'pt';
    setLanguage(savedLang);

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const imageUrl = item.getAttribute('href');
            basicLightbox.create(`<img src="${imageUrl}" class="pixel-art">`).show();
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(section => {
        observer.observe(section);
    });
});
