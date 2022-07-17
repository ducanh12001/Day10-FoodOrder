document.addEventListener('DOMContentLoaded', init3, false);

function init3() {
    renderCart();
    renderNumCart()
    PlusMinus();
    renderAddress()
}

let cartList;
function renderCart() {
    cartList = localStorage.getItem('dishInCart');
    cartList = JSON.parse(cartList);
    let cartTable = document.querySelector('#cart-list');
    let payTable = document.querySelector('#pay-list');
    let priceCart = localStorage.getItem('totalPrice');
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
                        <button type="button" value="${dish.id}" class="minusBtn"">-</button>
                        <span class="item-num">${dish.quantity}</span>
                        <button type="button" value="${dish.id}" class="plusBtn">+</button>
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
    if (cartList && payTable) {
        payTable.innerHTML = '';
        Object.values(cartList).map(dish => {
            payTable.innerHTML += `
            <tr>
                <td><img src="${dish.image}" ></td>
                <td>${dish.name}</td>
                <td>${dish.price}đ</td>
                <td>${dish.quantity}</td>
                <td>${dish.quantity * dish.price}đ</td>
            </tr>
            `
        })
        payTable.innerHTML += `
        <tfoot>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td style="font-weight: bold;">Tổng tiền:</td>
                <td id="totalPrice">${priceCart}đ</td>
            </tr>
        </tfoot>
        `
    }
}

function PlusMinus() {
    let totalPrice = localStorage.getItem('totalPrice');
    totalPrice = parseFloat(totalPrice);
    let numInCart = localStorage.getItem('numInCart');
    numInCart = parseFloat(numInCart);
    let minusBtns = document.querySelectorAll('.minusBtn')
    for (let i=0; i<minusBtns.length; i++) {
        minusBtns[i].addEventListener('click', (e) => {
            Object.values(cartList).map(dish => {
                if (dish.id === e.target.value && cartList[dish.id].quantity > 0) {
                    cartList[dish.id].quantity -=1;
                    localStorage.setItem('dishInCart', JSON.stringify(cartList));
                    numInCart = numInCart - 1;
                    localStorage.setItem('numInCart', numInCart);
                    totalPrice = totalPrice - cartList[dish.id].price;
                    localStorage.setItem('totalPrice', totalPrice);
                }
            })
            var a = Object.values(cartList).filter(dish => cartList[dish.id].quantity !==0)
            init3()
        })
    }
    
    let plusBtns = document.querySelectorAll('.plusBtn');
    for (let i=0; i<plusBtns.length; i++) {
        plusBtns[i].addEventListener('click', (e) => {
            Object.values(cartList).map(dish => {
                if (dish.id === e.target.value) {
                    cartList[dish.id].quantity +=1;
                    localStorage.setItem('dishInCart', JSON.stringify(cartList));
                    numInCart = numInCart + 1;
                    localStorage.setItem('numInCart', numInCart);
                    totalPrice = totalPrice + cartList[dish.id].price;
                    localStorage.setItem('totalPrice', totalPrice);
                }
            })
            init3()
        })
    }
}

async function renderAddress() {
    renderCity();
    let citySelect = document.querySelector('#city');
    citySelect?.addEventListener('change', () => {
        if (citySelect.value) {
            renderQuan(citySelect.value);
        }
    })
    
    let quanSelect = document.querySelector('#quan');
    quanSelect?.addEventListener('change', () => {
        if (quanSelect.value) {
            renderPhuong(quanSelect.value)
        }
    })
}

async function renderCity() {
    let citySelect = document.querySelector('#city');
    let res = await fetch(`https://provinces.open-api.vn/api/p/`);
    let CityList = await res.json();
    if (CityList !== null) {
        let result =`<option selected="selected" value="">Chọn thành phố--</option>`;
        CityList.forEach((city) => {
            result += `
            <option value="${city.code}">${city.name}</option>
            `
        })
        citySelect.innerHTML = result;
    }
}

async function renderQuan(cityId) {
    let quanSelect = document.querySelector('#quan');
    let res = await fetch(`https://provinces.open-api.vn/api/d/`);
    let QuanList = await res.json();
    let result =`<option selected="selected" value="">Chọn quận(huyện)--</option>`;
    QuanList.forEach((quan) => {
        if (quan.province_code == cityId) {
            result += `
            <option value="${quan.code}">${quan.name}</option>
            `
        }
    })
    quanSelect.innerHTML = result;
}

async function renderPhuong(phuongId) {
    let phuongSelect = document.querySelector('#phuong');
    let res = await fetch(`https://provinces.open-api.vn/api/w/`);
    let PhuongList = await res.json();
    let result =`<option selected="selected" value="">Chọn phường(xã)--</option>`;
    PhuongList.forEach((phuong) => {
        if (phuong.district_code == phuongId) {
            result += `
            <option value="${phuong.code}">${phuong.name}</option>
            `
        }
    })
    phuongSelect.innerHTML = result;
}

document.querySelector('#payBtn').addEventListener('click', () => {
    document.querySelector('.shopping-cart').style.display = 'none';
    document.querySelector('.ship-container').style.display = 'none';
    document.querySelector('.paysuccess-message').style.display = 'block';
    localStorage.clear()
})

function renderNumCart() {
    let numCart = localStorage.getItem('numInCart');
    if (numCart) {
        document.querySelector('.dish-num .num').innerHTML = numCart;
    }
}

