//home
document.addEventListener('DOMContentLoaded', init, false);
let TypeList, card;
async function init() {
    card = document.querySelector('.card-container')
    let res = await fetch(`https://62cfe5951cc14f8c087fabdf.mockapi.io/api/type`);
    TypeList = await res.json();
    renderCard()
}

function renderCard() {
    let result = '';
    TypeList.forEach((type, index) => {
        result += `
        <div class="card">
            <a href="product.html">
                <img src="${type.image}">
                <span>${type.name}</span>
            </a>
        </div>
        `
    })
    card.innerHTML = result;
}