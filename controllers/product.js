const {
    Product
} = require('../models/index')

exports.addNewProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body)
        const results = await newProduct.save()
        return res.json({
            status: 'success',
            content: results,
            message: 'New Product added successfully'
        })
    } catch (error) {
        return res.json({
            status: 'error',
            message: error.message
        })
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}, {
            __v: 0,
            bids: 0
        })
        return res.json({
            status: 'success',
            total: products.length,
            content: products
        })
    } catch (error) {
        return res.json({
            status: 'error',
            message: error.message
        })
    }
}

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id, {
            __v: 0,
            // bids: 0
        })
        return res.json({
            status: 'success',
            content: product
        })
    } catch (error) {
        return res.json({
            status: 'error',
            message: error.message
        })
    }
}




