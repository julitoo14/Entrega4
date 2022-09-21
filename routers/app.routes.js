const express = require('express')
const productsRoutes = require('./productos/productos.routes');
const router = express.Router();

router.use(productsRoutes);
module.exports= router;