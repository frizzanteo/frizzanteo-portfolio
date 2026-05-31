// Light/Dark mode logic - set immediately to avoid flash of theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Portfolio filter logic
let currentFilter = 'all';

function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.portfolio-tags .pill-button');

    if (currentFilter === category) {
        currentFilter = 'all'; // reset
    } else {
        currentFilter = category;
    }

    buttons.forEach(btn => {
        if (btn.getAttribute('data-filter') === currentFilter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (currentFilter === 'all' || cardCategory === currentFilter) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}
