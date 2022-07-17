document.addEventListener('DOMContentLoaded', init3, false);
let table3;

async function init3() {
    table3 = document.querySelector('#item-list');
    renderCart();
}

function renderCart1() {
    let result ='';
        result += `
        <tr>
            <td><img src="${dish.image}" ></td>
            <td>${dish.name}</td>
            <td>${dish.price}đ</td>
            <td>${dish.quantity}</td>
            <td>${dish.price}</td>
        </tr>
        `
    
    table3.innerHTML = result;
}

function renderCart() {
    let cartList = localStorage.getItem('dishInCart');
    cartList = JSON.parse(cartList);
    let cartTable = document.querySelector('#cart-list');
    if (cartList && cartTable) {
        cartTable.innerHTML = '';
        Object.values(cartList).map(dish => {
            cartTable.innerHTML += `
            <tr>
                <td><img src="${dish.image}" ></td>
                <td>${dish.name}</td>
                <td>${dish.price}đ</td>
                <td>
                    <div class="item-button">
                        <button type="button" class="minusBtn" onclick="minusItem()">-</button>
                        <span class="item-num">${dish.quantity}</span>
                        <button type="button" class="plusBtn" onclick="plusItem()">+</button>
                    </div>
                </td>
                <td>
                    <a class="trash-icon">
                        <i class="fa-solid fa-trash-can"></i>
                    </a>
                </td>
            </tr>
            `
        })
    }
}

function plusItem() {}

