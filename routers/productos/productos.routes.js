const express = require('express');
const fs = require('fs');
const router = express.Router();
const products = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));


router.get('/', (req, res) => {
    res.send(products)
});


router.get('/:productId', (req, res) => {
    const { productId } = req.params;
    const product = products.find(product => product.id === +productId);
    if (!product) {
        return res.status(404).json({ success: false, error: `Producto con id: ${productId} no existe` });
    }
    return res.json({ success: true, result: product });
});


router.post('/', (req, res) => {
    const { name, price, image } = req.body;
    if (!name || !price || !image) {
        return res.status(400).json({ succes: false, error: 'Formato de cuerpo incorrecto' });
    }
    const newProduct = {
        id: products.length + 1,
        name,
        price: +price,
        image,
    };
    products.push(newProduct);
    fs.writeFileSync('./data.json', JSON.stringify(products, null, 2));
    return res.json(newProduct);
});


router.put('/:productId', (req, res) => {
    const { params: { productId }, body: { name, price, image } } = req;
    if (!name || !price || !image) {
        return res.status(400).json({ success: false, error: 'Formato de cuerpo incorrecto' });
    };
    const productIndex = products.findIndex((product) => product.id === +productId);
    if (productIndex < 0) return res.status(404).json({ success: false, error: `Producto con id: ${productId} no existe` });
    const newProduct = {
        ...products[productIndex],
        name,
        price,
        image
    };
    products[productIndex] = newProduct;
    fs.writeFileSync('./data.json', JSON.stringify(products, null, 2));
    return res.json({ success: true, result: newProduct });
});


router.delete('/:productId', (req, res) => {
    const { productId } = req.params;
    const productIndex = products.findIndex(product => product.id === +productId);
    if (productIndex < 0) return res.status(404).json({ success: false, error: `Producto con id: ${productId} no existe` });
    products.splice(productIndex, 1);
    fs.writeFileSync('./data.json', JSON.stringify(products, null, 2));
    return res.json({ success: true, result: 'producto eliminado' });
});

module.exports = router;