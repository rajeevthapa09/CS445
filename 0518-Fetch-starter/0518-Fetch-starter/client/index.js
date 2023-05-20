window.onload = function(){
    fetchProducts();
}

function fetchProducts(){
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(products => console.log(products));
}