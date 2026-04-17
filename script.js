// Dados dos Pokémon (Gestão de Dados)
const pokemonData = [
    { id: 1, name: "Bulbasaur", type: "Grama/Veneno", desc: "Há uma semente de planta em suas costas desde o dia em que nasceu." },
    { id: 4, name: "Charmander", type: "Fogo", desc: "A chama na ponta de sua cauda mostra seus sentimentos." },
    { id: 7, name: "Squirtle", type: "Água", desc: "Após o nascimento, suas costas incham e endurecem formando uma concha." }
];

const faqs = [
    { q: "O que é um Pokémon?", a: "Pokémon são criaturas de todas as formas e tamanhos que vivem na natureza." },
    { q: "Como capturar um?", a: "Utilizando Pokébolas durante batalhas ou encontros selvagens." }
];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderCards();
    renderAccordions();
    initScrollReveal();
});

// Renderização Dinâmica de Cards
function renderCards() {
    const grid = document.getElementById('pokemonGrid');
    grid.innerHTML = pokemonData.map(p => `
        <article class="card">
            <h3>${p.name}</h3>
            <p><strong>Tipo:</strong> ${p.type}</p>
            <p>${p.desc}</p>
        </article>
    `).join('');
}

// Sistema de Acordeões
function renderAccordions() {
    const container = document.getElementById('accordionContainer');
    container.innerHTML = faqs.map((f, i) => `
        <div class="accordion-item">
            <button class="accordion-header" aria-expanded="false" onclick="toggleAccordion(this)">
                ${f.q}
            </button>
            <div class="accordion-content">
                <p>${f.a}</p>
            </div>
        </div>
    `).join('');
}

function toggleAccordion(btn) {
    const content = btn.nextElementSibling;
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    
    btn.setAttribute('aria-expanded', !isExpanded);
    content.classList.toggle('active');
}

// Funções de Acessibilidade
function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}

function changeFontSize(action) {
    const html = document.documentElement;
    let currentSize = parseFloat(window.getComputedStyle(html).fontSize);
    
    if (action === 'increase') html.style.fontSize = (currentSize + 2) + 'px';
    if (action === 'decrease') html.style.fontSize = (currentSize - 2) + 'px';
}

// Scroll Reveal (Observador de Interseção)
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
