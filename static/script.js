
const searchInput = document.getElementById('search');
const cards = document.querySelectorAll('.service-cards');

searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    const words = searchTerm.split(' ');

    cards.forEach(card => {
        const name = card.textContent.toLowerCase();
        const matches = words.every(word => name.includes(word));
        if (matches) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    })
});