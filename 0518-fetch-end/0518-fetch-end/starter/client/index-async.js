window.onload = function () {
    fetchProducts();
    document.getElementById('saveProductBtn').onclick = saveProduct;
}

async function fetchProducts() {
    const response = await fetch('http://localhost:3000/products');
    const products = await response.json();

    let html = `
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Description</th>
                </tr>
            `;
    products.forEach(prod => {
        html += `
                <tr>
                    <td>${prod.id}</td>
                    <td>${prod.title}</td>
                    <td>${prod.price}</td>
                    <td>${prod.description}</td>
                </tr>               
               `;
    })
    document.getElementById('products').innerHTML = html;

}


async function saveProduct(event) {
    event.preventDefault();
    const jsonString = JSON.stringify({
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value
    });

    const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        body: jsonString,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const prod = await response.json();

    let row = `
                <tr>
                    <td>${prod.id}</td>
                    <td>${prod.title}</td>
                    <td>${prod.price}</td>
                    <td>${prod.description}</td>
                </tr>  
            `;
    document.getElementById('products').innerHTML += row;
    document.getElementById('product-form').reset();


}