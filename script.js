document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('a[data-page]');
    const contentSections = document.querySelectorAll('.content-section');
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearchBtn');

    // 1. ระบบเปลี่ยนหน้า (SPA)
    const showPage = (pageId) => {
        contentSections.forEach(section => section.classList.remove('active'));
        const target = document.getElementById(pageId);
        if (target) {
            target.classList.add('active');
            window.scrollTo(0, 0);
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) link.classList.add('active');
        });
    };

    // 2. ระบบค้นหา
    const filterCountries = (query) => {
        const cards = document.querySelectorAll('.country-card');
        const filter = query.toLowerCase().trim();

        cards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const region = card.dataset.region.toLowerCase();
            if (name.includes(filter) || region.includes(filter)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    };

    // Event Listeners
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(link.dataset.page);
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => filterCountries(e.target.value));
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            filterCountries('');
        });
    }
});