function showToast() {
    var toastLiveExample = document.getElementById('liveToast')
    var toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
}

var DishList = [];

fetch(`https://62cfe5951cc14f8c087fabdf.mockapi.io/api/products`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        const dishes = JSON.stringify(data);
        if (dishes === null) {
            DishList = []
        } else {
            DishList = JSON.parse(dishes);
            DishList.forEach((dish, index) => {
            })
        }
    })
    .catch((e) => {
        alert("Error " + e)
    });