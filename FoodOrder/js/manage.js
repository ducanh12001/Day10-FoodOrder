function openForm() {
    document.getElementById("addCont").style.display = 'block'
}

function closeForm() {
    document.getElementById("addCont").style.display = 'none';
    clearInput();
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
let DishList, table;
var currentPage = 1;
var itemPerPage = 20;

async function init() {
    table = document.querySelector('#dish-list')
    let res = await fetch(`https://62cfe5951cc14f8c087fabdf.mockapi.io/api/products`);
    DishList = await res.json();
    renderTable()
}

function renderTable() {
    let result ='';
    DishList.filter((dish, index) => {
        let start = (currentPage - 1) * itemPerPage;
        let end = currentPage * itemPerPage;
        changePage(currentPage)
        if (index >= start && index < end) return true;
    }).forEach((dish, index) => {
        result += `<tr>
        <td>${(currentPage-1)*itemPerPage + index + 1}</td>
        <td></td>
        <td><a href="">${dish.name}</a></td>
        <td>${dish.descriptionS}</td>
        <td>${dish.price}</td>
        <td>${dish.rate}</td></tr>
        `
    })
    table.innerHTML = result;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
    }
    renderTable()
}

function nextPage() {
    if (currentPage < DishList.length) {
        currentPage++;
    }
    renderTable()
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

//
function searchValue() {
    var filter = document.getElementById("searchBar").value.toLowerCase();
    var table = document.getElementById("table");
    var tr = table.getElementsByTagName("tr");
    for (var i = 1; i < tr.length; i++) {
        tr[i].style.display = "none";
        const tdArray = tr[i].getElementsByTagName("td");
        for (var j = 0; j < tdArray.length; j++) {
            const cellValue = tdArray[j];
            if (cellValue && cellValue.innerHTML.toLowerCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                break;
            }
        }
    }
}

//add to localStorage
document.querySelector("#saveBtn").addEventListener("click", (e) => {
    e.preventDefault()
    var imageB = document.querySelector("#imageB").value;
    var imageS = document.querySelector("#imageS").value;
    var dishName = document.querySelector("#name").value;
    const descriptionS = document.querySelector("#descriptionS").value;
    const descriptionF = document.querySelector("#descriptionF").value;
    var address = document.querySelector("#address").value;

    if (imageB=== '' || imageS=== '' || dishName=== '' || descriptionS=== '' || descriptionF=== '' || address=== '') {
        document.querySelector('.error-message').innerHTML = 'Điền đủ các mục';
    } else {
        const newDish = new Dish(imageB, imageS, dishName, descriptionS, descriptionF, address)
        addDishStore(newDish);
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        closeForm();
        clearInput();
    }
}) 

function clearInput() {
    document.querySelector('.error-message').innerHTML = ''
    document.querySelector("#imageB").value ='';
    document.querySelector("#imageS").value='';
    document.querySelector("#name").value='';
    document.querySelector("#descriptionS").value='';
    document.querySelector("#descriptionF").value='';
    document.querySelector("#address").value='';
}

function getDishStore() {
    let myLibrary;
    if (localStorage.getItem('dishes') === null) {
        myLibrary = []
    } else {
        myLibrary = JSON.parse(localStorage.getItem('dishes'));
    }
    return myLibrary;
}

function addDishStore(dish) {
    const dishes = getDishStore();
    dishes.push(dish);
    localStorage.setItem("dishes", JSON.stringify(dishes))
}

   