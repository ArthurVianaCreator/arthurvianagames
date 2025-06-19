document.addEventListener('DOMContentLoaded', () => {

    // ---- LÓGICA DO SELETOR DE IDIOMAS ----
    const langSwitchButton = document.getElementById('lang-switch-btn');
    const translatableElements = document.querySelectorAll('[data-pt]');
    
    // Função para trocar o idioma na página
    const setLanguage = (lang) => {
        translatableElements.forEach(el => {
            // Pega o texto do atributo 'data-pt' ou 'data-en'
            el.innerText = el.dataset[lang];
        });
        
        // Atualiza o texto do botão para mostrar a outra opção de idioma
        langSwitchButton.innerText = lang === 'pt' ? langSwitchButton.dataset.langPt : langSwitchButton.dataset.langEn;
        
        // Guarda a preferência do usuário no localStorage
        localStorage.setItem('savamption_lang', lang);
    };

    // Evento de clique no botão de troca de idioma
    langSwitchButton.addEventListener('click', () => {
        const currentLang = localStorage.getItem('savamption_lang') || 'pt';
        const newLang = currentLang === 'pt' ? 'en' : 'pt';
        setLanguage(newLang);
    });

    // Ao carregar a página, verifica se já existe um idioma salvo
    const savedLang = localStorage.getItem('savamption_lang');
    if (savedLang) {
        setLanguage(savedLang);
    } else {
        // Se não houver, define o padrão como português
        setLanguage('pt');
    }

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

    // ---- Feedback do Formulário da Newsletter ----
    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        alert('Obrigado por se inscrever!');
        event.target.reset();
    });
});