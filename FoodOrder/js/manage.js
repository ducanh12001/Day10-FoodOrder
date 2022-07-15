function openForm() {
    document.getElementById("addCont").style.display = 'block'
}

function closeForm() {
    document.getElementById("addCont").style.display = 'none'
}

class Dish {
    constructor(name, descriptionS, descriptionF, address) {
        this.name = name;
        this.descriptionS = descriptionS;
        this.descriptionF = descriptionF;
        this.address = address;
    }
}

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


let addForm = document.getElementById("addForm");
let saveBtn = document.getElementById("saveBtn")
saveBtn.addEventListener("submit", (e) => {
    e.preventDefault()
    let imageB = document.querySelector("#imageB");
    let imageS = document.querySelector("#imageS");
    let dishName = document.querySelector("#name").value;
    let descriptionS = document.querySelector("#descriptionS").value;
    let descriptionF = document.querySelector("#decriptionF").value;
    let address = document.querySelector("#address").value;
    if (dishName === '') {
        alert("Please select")
    } else {
        alert(dishName)
    }
}) 