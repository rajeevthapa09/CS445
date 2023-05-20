let products = [{id:1, title: 'DELL', price: 99, description: 'good'}];
let idCounter = 2;

module.exports = class Product {

    constructor(id, title, price, description){
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
    }

    save(){
        this.id = idCounter++;
        products.push(this);
        return this;
    }

    static getById(id){
        return products.find(prod => prod.id == id);
    }

    static getAll(){
        return products;
    }

    static deleteById(id){
        const index = products.findIndex(p => p.id == id);
        const deleteProd = products[index];
        products.splice(index, 1);
        return deleteProd;
    }

    edit(){
        const index = products.findIndex(p => p.id == this.id);
        products[index] = this;
        return this;
    }
}