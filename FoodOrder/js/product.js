
let DishList, card2;
var currentPage = 1;
var itemPerPage = 20;

function renderCard2() {
    let result = '';
    DishList.filter((dish, index) => {
        let start = (currentPage - 1) * itemPerPage;
        let end = currentPage * itemPerPage;
        changePage(currentPage)
        if (index >= start && index < end) return true;
    }).forEach((dish) => {
        result += `
        <div class="card">
            <div style="flex:1">
                <a class="go-to-detail" href="productDetail.html?dishId=${dish.id}">
                    <img class="dish-image" src="${dish.imageS}" alt="${dish.name}">
                </a>
            </div>
            <div style="flex:2">
                <a class="go-to-detail" href="productDetail.html?dishId=${dish.id}">
                    <div class="dish-name">${dish.name}</div>
                </a>
            </div>
            <div class="data">
                <span class="price">${dish.price}đ</span>
                <span class="rate">${dish.rate}/5</span>
            </div>
            <p class="description">${dish.descriptionS}</p>
            <div class="btn-group">
                <button  class="button cartBtn">Add to cart</button>
                <a href="payUI.html" class="button orderBtn">Order Now</a>
            </div>
        </div>
        `
    })
    card2.innerHTML = result;

    //click add and order
    let carts = document.querySelectorAll('.dish-container .button.cartBtn');
    let curPage = document.querySelector('#page').innerHTML;
    curPage = curPage.slice(0, 1);
    curPage = parseFloat(curPage);
    console.log(curPage);
    for (let i = 0, j=(curPage - 1) * itemPerPage; i < carts.length, j<DishList.length; i++, j++) {
        carts[i]?.addEventListener('click', (e) => {
            e.preventDefault()
            numInCart(DishList[j])
            totalPrice(DishList[j])
            renderNumCart()
            showToast()
        })
    }
    let orders = document.querySelectorAll('.dish-container .button.orderBtn');
    renderNumCart()
    for (let i = 0; i < orders.length; i++) {
        orders[i].addEventListener('click', () => {
            numInCart(DishList[i])
            totalPrice(DishList[i])
            renderNumCart()
            window.location.href='payUI.html'
        })
    }
}


function prevPage() {
    if (currentPage > 1) {
        currentPage--;
    }
    renderCard2()
}

function nextPage() {
    if (currentPage < DishList.length) {
        currentPage++;
    }
    renderCard2()
}

function changePage(page) {
    var btn_next = document.getElementById("nextBtn");
    var btn_prev = document.getElementById("prevBtn");
    var page_span = document.getElementById("page");

    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    page_span.innerHTML = page + '/' + numPages();
    if (page === 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page === numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function numPages()
{
    return Math.ceil(DishList.length / itemPerPage);
}

function showToast() {
    var toastLiveExample = document.getElementById('liveToast')
    var toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
}

function numInCart(dish) {
    let numCart = localStorage.getItem('numInCart');
    if (numCart) {
        numCart = parseFloat(numCart);
        localStorage.setItem('numInCart', numCart+1);
    } else {
        localStorage.setItem('numInCart', 1)
    }
    setInCart(dish)
}

function setInCart(dish) {
    let carts = localStorage.getItem('dishInCart');
    carts = JSON.parse(carts);
    if (carts!== null) {
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
    }  else {
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

async function init2() {
    card2 = document.querySelector('.dish-container')
    let res = await fetch(`https://62cfe5951cc14f8c087fabdf.mockapi.io/api/products`);
    DishList = await res.json();
    renderCard2()
}
document.addEventListener('DOMContentLoaded', init2, false);
