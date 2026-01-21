
const searchInput = document.getElementById('search');
const cards = document.querySelectorAll('.service-cards');
const categoryFilter = document.getElementById('category');
const locationFilter = document.getElementById('location');
const availabilityFilter = document.getElementById('availability');


searchInput.addEventListener("input", filterCards);
categoryFilter.addEventListener("change", filterCards);
locationFilter.addEventListener("change", filterCards);
availabilityFilter.addEventListener("change", filterCards);

/*
function details(element) {
    const card = element.closest('.service-cards');
    const name = card.getAttribute('data-name'); 
    const category = card.getAttribute('data-category');
    const location = card.getAttribute('data-location');
    const description = card.getAttribute('data-description');
    const availability = card.getAttribute('data-availability');

    localStorage.setItem('serviceName', name);
    localStorage.setItem('serviceCategory', category);
    localStorage.setItem('serviceLocation', location);
    localStorage.setItem('serviceDescription', description);
    localStorage.setItem('serviceAvailability', availability);

    document.location.href = 'details.html';

}
*/
const detailsView = document.getElementById("details-view");
const detailsContent = document.getElementById("details-content");
const servicesContainer = document.getElementById("services-container");
const backBtn = document.getElementById("backBtn");


cards.forEach(card => {
    card.addEventListener("click", () => {

        const name = card.querySelector(".card-title").innerText;
        const description = card.querySelector(".card-text").innerText;
        const category = card.dataset.category;
        const location = card.dataset.location;
        const availability = card.dataset.availability;

        detailsContent.innerHTML = `
            <h2>${name}</h2>
            <hr>
            <h4>${description}</h4>          
            <p><strong>Availability:</strong> ${availability}</p>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Location:</strong> ${location}</p>
            <button class="button" id="saveBtn">Shortlist</button>

        `;

        let shortlisted = [];
        
        setTimeout(() => {
            const saveBtn = document.getElementById("saveBtn");
            saveBtn.addEventListener("click", () => {
                if (saveBtn.innerText === "Remove") {
                    shortlisted = shortlisted.filter(service => service.name !== name);
                    localStorage.setItem("shortlistedServices", JSON.stringify(shortlisted));
                    saveBtn.innerText = "Shortlist";
                } else {
                    const service = { name, description, category, location, availability };
                    shortlisted.push(service);
                    localStorage.setItem("shortlistedServices", JSON.stringify(shortlisted));
                    saveBtn.innerText = "Remove";
                }
    });
}, 0);


        servicesContainer.style.display = "none";
        detailsView.style.display = "block";
    });
});

backBtn.addEventListener("click", () => {
    detailsView.style.display = "none";
    servicesContainer.style.display = "block";
    shortlistView.style.display = "none";
});
/*shortlist functionality*/

shortlistBtn.addEventListener("click", () => {
    if (shortlistBtn.innerText === "Shortlisted") {
        shortlistBtn.innerText = "Back to Services";
        const shortlistedList = document.getElementById("shortlisted-list");
        shortlistedList.innerHTML = "";
        const shortlistedServices = JSON.parse(localStorage.getItem("shortlistedServices")) || [];
        shortlistedServices.forEach(service => {
        const li = document.createElement("li");
        li.innerText = service.name;
        shortlistedList.appendChild(li);
    });
    servicesContainer.style.display = "none";
    detailsView.style.display = "none";
    shortlistView.style.display = "block";
    } 
    else {
        shortlistBtn.innerText = "Shortlisted";
        detailsView.style.display = "none";
        servicesContainer.style.display = "block";
        shortlistView.style.display = "none";
    }
    
});



clearShortlistBtn.addEventListener("click", () => {
    localStorage.removeItem("shortlistedServices");
    const shortlistedList = document.getElementById("shortlisted-list");
    shortlistedList.innerHTML = "";
});




function filterCards() {

    loading.style.opacity = 1;
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
        loading.style.opacity = 0;
        emptyState.style.display = cardCount === 0 ? 'block' : 'none';
        }, 1000);

    }

/*

    localStorage.setItem('serviceName', name);
    localStorage.setItem('serviceCategory', category);
    localStorage.setItem('serviceLocation', location);
    localStorage.setItem('serviceDescription', description);
    localStorage.setItem('serviceAvailability', availability);
*/

