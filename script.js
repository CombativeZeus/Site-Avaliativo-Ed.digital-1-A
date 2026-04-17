// Dados otimizados com URLs de imagens oficiais
const pokemonData = [
    { 
        id: 1, 
        name: "Bulbasaur", 
        type: "Grama/Veneno", 
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        desc: "Há uma semente de planta em suas costas desde o dia em que nasceu." 
    },
    { 
        id: 4, 
        name: "Charmander", 
        type: "Fogo", 
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
        desc: "A chama na ponta de sua cauda mostra seus sentimentos." 
    },
    { 
        id: 7, 
        name: "Squirtle", 
        type: "Água", 
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
        desc: "Após o nascimento, suas costas incham e endurecem formando uma concha." 
    }
];

const faqs = [
    { q: "O que é um Pokémon?", a: "Pokémon são criaturas de todas as formas e tamanhos que vivem na natureza." },
    { q: "Como capturar um?", a: "Utilizando Pokébolas durante batalhas ou encontros selvagens." }
];

document.addEventListener('DOMContentLoaded', () => {
    renderCards();
    renderAccordions();
    initScrollReveal();
});

// Renderização performática usando template literals e innerHTML de uma vez só
function renderCards() {
    const grid = document.getElementById('pokemonGrid');
    if (!grid) return;

    grid.innerHTML = pokemonData.map(p => `
        <article class="card">
            <img src="${p.image}" alt="${p.name}" class="pokemon-img" loading="lazy">
            <h3>${p.name}</h3>
            <p class="type-badge"><strong>Tipo:</strong> ${p.type}</p>
            <p>${p.desc}</p>
        </article>
    `).join('');
}

function renderAccordions() {
    const container = document.getElementById('accordionContainer');
    if (!container) return;

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

// Acessibilidade
function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}

function changeFontSize(action) {
    const html = document.documentElement;
    let currentSize = parseFloat(window.getComputedStyle(html).fontSize);
    html.style.fontSize = action === 'increase' ? (currentSize + 2) + 'px' : (currentSize - 2) + 'px';
}

function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: parar de observar após revelar para poupar memória
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
