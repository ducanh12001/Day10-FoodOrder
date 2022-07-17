
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
            <div style="flex:2">
                <a href="productDetail.html">
                    <img class="dish-image" src="${dish.imageS}" alt="${dish.name}">
                </a>
            </div>
            <div style="flex:1">
                <a href="productDetail.html">
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

function addToCart() {
    var image = document.querySelector('.dish-image').src;
    var name = document.querySelector('.dish-name').innerHTML;
    var price = document.querySelector('.price').innerHTML;
    var num=1;
    const newDish = new Cart(image, name, price, num);
    addCartStore(newDish);
    showToast();
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
    let dishObj = {
        name: dish.name,
        image: dish.imageS,
        price: dish.price,
        quantity: 1       
    }
    
    if (carts!== null) {
        if (carts[dish.id] === undefined) {
            carts = {
                ...carts,
                [dish.id]: {
                    name: dish.name,
                    image: dish.imageS,
                    price: dish.price,
                    quantity: 1
                }
            }
        }
        carts[dish.id].quantity += 1;
    }  else {
        //dish.quantity = 1;
        carts = {
            [dish.id]: {
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
    console.log(priceCart)
}

function renderNumCart() {
    let numCart = localStorage.getItem('numInCart');
    if (numCart) {
        document.querySelector('.dish-num .num').innerHTML = numCart;
    }
}

function getCartStore() {
    let myCart;
    if (localStorage.getItem('cart') === null) {
        myCart = []
    } else {
        myCart = JSON.parse(localStorage.getItem('cart'));
    }
    return myCart;
}

function addCartStore(dish) {
    const dishes = getCartStore();
    dishes.push(dish);
    localStorage.setItem("cart", JSON.stringify(dishes))
}

async function init2() {
    card2 = document.querySelector('.dish-container')
    let res = await fetch(`https://62cfe5951cc14f8c087fabdf.mockapi.io/api/products`);
    DishList = await res.json();
    renderCard2()
    let carts = document.querySelectorAll('.button.cartBtn');
    for (let i = 0; i < carts.length; i++) {
        carts[i].addEventListener('click', () => {
            numInCart(DishList[i])
            totalPrice(DishList[i])
            renderNumCart()
            showToast()
        })
    }
}
init2();
