const Product = require('../model/products');

exports.save = (req, res, next) => {
    const prod = new Product(null, req.body.title, req.body.price, req.body.description);
    res.json(prod.save());
    
}

exports.getById = (req, res, next) => {
    res.json(Product.getById(req.params.id));
}

exports.getAll = (req, res) => {
    res.json(Product.getAll());
}

exports.deleteById = (req, res) => {
    res.json(Product.deleteById(req.params.id));
}

exports.edit = (req, res) => {  
    console.log(req.body); 
    res.json(new Product(req.body.id, req.body.title, req.body.price, req.body.description).edit());
}