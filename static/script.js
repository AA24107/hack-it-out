
const searchInput = document.getElementById('search');
const cards = document.querySelectorAll('.service-cards');
const categoryFilter = document.getElementById('category');
const locationFilter = document.getElementById('location');
const availabilityFilter = document.getElementById('availability');



searchInput.addEventListener("input", filterCards);
categoryFilter.addEventListener("change", filterCards);
locationFilter.addEventListener("change", filterCards);
availabilityFilter.addEventListener("change", filterCards);

function filterCards() {

    loading.style.display = 'block';
    let cardCount = 0;

    setTimeout(function() {
        const searchTerm = searchInput.value.toLowerCase();
        const words = searchTerm.split(' ');
        const category = categoryFilter.value;
        const location = locationFilter.value;
        const availability = availabilityFilter.value;

        for (const card of cards) {
            const cardText = card.textContent.toLowerCase();

            let show = true;

            //Search bar
            for (const word of words) {
                if (!cardText.includes(word)) {
                    show = false;
                    break;
                }
            }

            //Category filter
            if (category !== 'all' && !cardText.includes(category.toLowerCase())) {
                show = false;
            }

            //Location filter
            if (location !== 'all' && !cardText.includes(location.toLowerCase())) {
                show = false;
            }

            //Availability filter
            if (availability !== 'all' && !cardText.includes(availability.toLowerCase())) {
                show = false;
            }
            card.style.display = show ? 'block' : 'none';
            if (show) {
                cardCount++;
            }
        }
        loading.style.display = 'none';
        emptyState.style.display = cardCount === 0 ? 'block' : 'none';
        }, 1000);

    }

