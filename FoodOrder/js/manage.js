function openForm() {
    document.getElementById("addCont").style.display = 'block'
}

function closeForm() {
    document.getElementById("addCont").style.display = 'none';
    clearInput();
}

function closeDetailForm() {
    document.querySelector('.detail-container').style.display = 'none';
}

class Dish {
    constructor(imageB, imageS, name, descriptionS, descriptionF, address) {
        this.imageB = imageB;
        this.imageS = imageS;
        this.name = name;
        this.descriptionS = descriptionS;
        this.descriptionF = descriptionF;
        this.address = address;
    }
}

//pagination
document.addEventListener('DOMContentLoaded', init, false);
let DishList, table, CurrentList;
var currentPage = 1;
var itemPerPage = 20;

async function init() {
    table = document.querySelector('#dish-list')
    let res = await fetch(`https://62cfe5951cc14f8c087fabdf.mockapi.io/api/products`);
    DishList = await res.json();
    localStorage.setItem("products", JSON.stringify(DishList))
    CurrentList = getProductStore();
    renderTable(CurrentList)
}

document.getElementById('sortName')?.addEventListener('click', (e) => {
    let a = e.target.children[0].className;
    var iTag = document.querySelector('.content #sortName i');
    let temp = DishList;
    if (a === '') {
        var sortUp = temp.sort((a, b) => {
            let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        })
        renderTable(sortUp)
        iTag.className = iTag.className.replace('', 'fa-solid fa-arrow-up-long');
    }
    if (a === 'fa-solid fa-arrow-up-long') {
        var sortDown = temp.sort((a, b) => {
            let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();
            if (fa > fb) {
                return -1;
            }
            if (fa < fb) {
                return 1;
            }
            return 0;
        })
        renderTable(sortDown);
        iTag.className = iTag.className.replace('fa-solid fa-arrow-up-long', 'fa-solid fa-arrow-down-long');
    }
    if (a === 'fa-solid fa-arrow-down-long') {
        renderTable(getProductStore());
        iTag.className = iTag.className.replace('fa-solid fa-arrow-down-long', '');
    }
})

document.getElementById('sortDes')?.addEventListener('click', (e) => {
    let a = e.target.children[0].className;
    var iTag = document.querySelector('.content #sortDes i');
    let temp = DishList;
    if (a === '') {
        var sortUp = temp.sort((a, b) => {
            let fa = a.descriptionS.toLowerCase(),
                fb = b.descriptionS.toLowerCase();
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        })
        renderTable(sortUp)
        iTag.className = iTag.className.replace('', 'fa-solid fa-arrow-up-long');
    }
    if (a === 'fa-solid fa-arrow-up-long') {
        var sortDown = temp.sort((a, b) => {
            let fa = a.descriptionS.toLowerCase(),
                fb = b.descriptionS.toLowerCase();
            if (fa > fb) {
                return -1;
            }
            if (fa < fb) {
                return 1;
            }
            return 0;
        })
        renderTable(sortDown);
        iTag.className = iTag.className.replace('fa-solid fa-arrow-up-long', 'fa-solid fa-arrow-down-long');
    }
    if (a === 'fa-solid fa-arrow-down-long') {
        renderTable(getProductStore());
        iTag.className = iTag.className.replace('fa-solid fa-arrow-down-long', '');
    }
})

document.getElementById('sortPrice')?.addEventListener('click', (e) => {
    let a = e.target.children[0].className;
    var iTag = document.querySelector('.content #sortPrice i');
    let temp = DishList;
    if (a === '') {
        var sortUp = temp.sort((a, b) => { return a.price - b.price })
        renderTable(sortUp)
        iTag.className = iTag.className.replace('', 'fa-solid fa-arrow-up-long');
    }
    if (a === 'fa-solid fa-arrow-up-long') {
        var sortDown = temp.sort((a, b) => { return b.price - a.price })
        renderTable(sortDown);
        iTag.className = iTag.className.replace('fa-solid fa-arrow-up-long', 'fa-solid fa-arrow-down-long');
    }
    if (a === 'fa-solid fa-arrow-down-long') {
        renderTable(getProductStore());
        iTag.className = iTag.className.replace('fa-solid fa-arrow-down-long', '');
    }
})

document.getElementById('sortRate')?.addEventListener('click', (e) => {
    let a = e.target.children[0].className;
    var iTag = document.querySelector('.content #sortRate i');
    let temp = DishList;
    if (a === '') {
        var sortUp = temp.sort((a, b) => { return a.rate - b.rate })
        renderTable(sortUp)
        iTag.className = iTag.className.replace('', 'fa-solid fa-arrow-up-long');
    }
    if (a === 'fa-solid fa-arrow-up-long') {
        var sortDown = temp.sort((a, b) => { return b.rate - a.rate })
        renderTable(sortDown);
        iTag.className = iTag.className.replace('fa-solid fa-arrow-up-long', 'fa-solid fa-arrow-down-long');
    }
    if (a === 'fa-solid fa-arrow-down-long') {
        renderTable(getProductStore());
        iTag.className = iTag.className.replace('fa-solid fa-arrow-down-long', '');
    }
})

function renderTable(myProducts) {
    let result = '';
    myProducts.filter((dish, index) => {
        let start = (currentPage - 1) * itemPerPage;
        let end = currentPage * itemPerPage;
        changePage(currentPage);
        if (index >= start && index < end) return true;
    }).forEach((dish, index) => {
        result += `<tr>
        <td>${(currentPage - 1) * itemPerPage + index + 1}</td>
        <td><img src="${dish.imageS}" alt="${dish.name}"></td>
        <td style="text-align:left"><a href="" class="dish-details">${dish.name}</a></td>
        <td style="text-align:left">${dish.descriptionS}</td>
        <td>${dish.price}đ</td>
        <td>${dish.rate}</td></tr>
        `
    })
    table.innerHTML = result;

    let details = document.querySelectorAll('.dish-details');
    let curPage = document.querySelector('#page').innerHTML;
    curPage = curPage.slice(0, 1);
    curPage = parseFloat(curPage);
    for (let i = 0, j = (curPage - 1) * itemPerPage; i < details.length, j < DishList.length; i++, j++) {
        details[i]?.addEventListener('click', (e) => {
            e.preventDefault();
            //console.log(e.target)
            document.querySelector('.detail-container .details').innerHTML = `
                <div class="input-div">
                    <label for="imageB">Ảnh lớn</label>
                    <img class="detail imageB" src="${DishList[j].imageB}" alt="${DishList[j].name}">
                </div>
                <div class="input-div">
                    <label for="imageS">Ảnh nhỏ</label>
                    <img class="detail imageS" src="${DishList[j].imageS}" alt="${DishList[j].name}">
                </div>
                <div class="input-div">
                    <label for="name">Tên món</label>
                    <div class="detail name">${DishList[j].name}</div>
                </div>
                <div class="input-div">
                    <label for="name">Giá</label>
                    <div class="detail price">${DishList[j].price}đ</div>
                </div>
                <div class="input-div">
                    <label for="name">Đánh giá</label>
                    <div class="detail rate">${DishList[j].rate}</div>
                </div>
                <div class="input-div">
                    <label for="">Mô tả ngắn</label>
                    <div class="detail descriptionS">${DishList[j].descriptionS}</div>
                </div>
                <div class="input-div">
                    <label for="">Mô tả đầy đủ</label>
                    <div class="detail descriptionF">${DishList[j].descriptionF}</div>
                </div>
                <div class="input-div">
                    <label for="address">Thông tin nhà cung cấp</label>
                    <div class="detail address">${DishList[j].address}</div>
                </div>
                `

            document.querySelector('.detail-container').style.display = 'block';
        })
    }
}

function getProductStore() {
    let myProducts;
    if (localStorage.getItem('products') === null) {
        myProducts = []
    } else {
        myProducts = JSON.parse(localStorage.getItem('products'));
    }
    return myProducts;
}

function addDishStore(dish) {
    const dishes = getProductStore();
    dishes.push(dish);
    localStorage.setItem("products", JSON.stringify(dishes))
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
    }
    renderTable(CurrentList)
}

function nextPage() {
    if (currentPage < DishList.length) {
        currentPage++;
    }
    renderTable(CurrentList)
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

function numPages() {
    return Math.ceil(CurrentList.length / itemPerPage);
}

//
document.getElementById('searchBar')?.addEventListener('keyup', (e) => {
    e.preventDefault()
    var filter = document.getElementById("searchBar").value.toLowerCase();
    let temp = DishList;
    //console.log(temp)
    let result = [];
    for (let i = 0; i < temp.length; i++) {
        if (temp[i].name.toString().toLowerCase().indexOf(filter) > -1 || temp[i].descriptionS.toString().toLowerCase().indexOf(filter) > -1) {
            result.push(temp[i]);
        }
    }
    CurrentList = result;
    renderTable(result)
})

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

//add to localStorage
document.querySelector("#addForm").addEventListener("submit", (e) => {
    e.preventDefault()
    var dishName = document.querySelector("#name").value;
    const descriptionS = document.querySelector("#descriptionS").value;
    const descriptionF = document.querySelector("#descriptionF").value;
    var address = document.querySelector("#address").value;

    //base04 image
    var imageB = localStorage.getItem('imageB')
    var imageS = localStorage.getItem('imageS')

    const newDish = new Dish(imageB, imageS, dishName, descriptionS, descriptionF, address)
    addDishStore(newDish);
    //postData('https://62cfe5951cc14f8c087fabdf.mockapi.io/api/products', newDish)
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    closeForm();
    clearInput();
    CurrentList = getProductStore()
    renderTable(CurrentList)
})

//image -> base64
function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        localStorage.setItem('imageB', reader.result)
        document.querySelector('#addForm .imageB').innerHTML = `<img src="${reader.result}" width="100px", height="70px">`
    }
    reader.readAsDataURL(file);
}

function encodeImageFileAsURL2(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        localStorage.setItem('imageS', reader.result)
        document.querySelector('#addForm .imageS').innerHTML = `<img src="${reader.result}" width="100px", height="70px">`
    }
    reader.readAsDataURL(file);
}

function clearInput() {
    document.querySelector('.error-message').innerHTML = ''
    document.querySelector("#imageB").value = '';
    document.querySelector("#imageS").value = '';
    document.querySelector("#name").value = '';
    document.querySelector("#descriptionS").value = '';
    document.querySelector("#descriptionF").value = '';
    document.querySelector("#address").value = '';
}
