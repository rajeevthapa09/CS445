window.onload = function(){
    document.getElementById('saveBtn').onclick = saveProduct;
}

function saveProduct(event){
    event.preventDefault();
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;

    fetch('http://localhost:3000/products', {
        method: 'POST',
        body: JSON.stringify({
            title,
            price,
            description
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(data => {
            //TODO: display data
            console.log(data);
            document.getElementById('productSaveForm').reset();
        })
        .catch(err => console.log(err));

}