document.addEventListener('DOMContentLoaded', init, false);

let CommentList, card;
let DishList, dishInfo;

async function init() {
    dishInfo = document.querySelector('.cart-container');
    let res1 = await fetch(`https://62cfe5951cc14f8c087fabdf.mockapi.io/api/products`);
    DishList = await res1.json();
    card = document.querySelector('.comment-container');
    let res = await fetch(`https://62cfe5951cc14f8c087fabdf.mockapi.io/api/comment`);
    CommentList = await res.json();
    renderComment()
    var urlParams = new URLSearchParams(window.location.search);
    var dishId = urlParams.get('dishId');
    dishId = parseFloat(dishId);
    if (dishId) {
        renderDetail(DishList[dishId - 1])
    }
}

function renderComment() {
    let result = '';
    CommentList.forEach((comment, index) => {
        result += `
        <div class="comment-card">
            <div class="user-info">
                <img src="${comment.image}" alt="Image" class="user-image">
                <span>${comment.username}</span>
            </div>
            <div class="comment">${comment.comment}</div>
        </div>
        `
    })
    card.innerHTML = result;
}

function renderDetail(dish) {
    let result = `
    <div class="dish-image">
        <img src="${dish.imageB}" alt="">
    </div>
    <div class="dish-info">
        <h3 class="name-dish">${dish.name}</h3>
        <div class="address">${dish.address}</div>
        <div class="rating">
            <div class="point">${dish.rate}/5</div>
            <div class="number-rating">10</div>
        </div>
        <div class="price">
            <i class="fa-solid fa-dollar-sign"></i>
            ${dish.price}đ
        </div>
        <div class="btn-group">
            <button type="button" class="button cartBtn">Add to cart</button>
            <a href="payUI.html" class="button orderBtn">Order Now</a>
        </div>
    </div>
    `
    dishInfo.innerHTML = result;

    document.querySelector('.dish-info .button.cartBtn').addEventListener('click', () => {
        numInCart(dish)
        totalPrice(dish)
        renderNumCart()
        showToast()
    })

    renderNumCart()
    document.querySelector('.dish-info .button.orderBtn').addEventListener('click', () => {
        numInCart(dish)
        totalPrice(dish)
        renderNumCart();
        window.location.href = 'payUI.html'
    })
}

function numInCart(dish) {
    let numCart = localStorage.getItem('numInCart');
    if (numCart) {
        numCart = parseFloat(numCart);
        localStorage.setItem('numInCart', numCart + 1);
    } else {
        localStorage.setItem('numInCart', 1)
    }
    setInCart(dish)
}

function setInCart(dish) {
    let carts = localStorage.getItem('dishInCart');
    carts = JSON.parse(carts);
    if (carts !== null) {
        if (carts[dish.id] === undefined) {
            carts = {
                ...carts,
                [dish.id]: {
                    id: dish.id,
                    name: dish.name,
                    image: dish.imageS,
                    price: dish.price,
                    quantity: 0
                }
            }
        }
        carts[dish.id].quantity += 1;
    } else {
        //dish.quantity = 1;
        carts = {
            [dish.id]: {
                id: dish.id,
                name: dish.name,
                image: dish.imageS,
                price: dish.price,
                quantity: 1
            }
        };
    }
    localStorage.setItem('dishInCart', JSON.stringify(carts));
}

function totalPrice(dish) {
    let priceCart = localStorage.getItem('totalPrice');
    if (priceCart) {
        priceCart = parseFloat(priceCart);
        localStorage.setItem('totalPrice', priceCart + dish.price);
    } else {
        localStorage.setItem('totalPrice', dish.price);
    }
}

function renderNumCart() {
    let numCart = localStorage.getItem('numInCart');
    if (numCart) {
        document.querySelector('.dish-num .num').innerHTML = numCart;
    }
}
function showToast() {
    var toastLiveExample = document.getElementById('liveToast')
    var toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
}