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
            bids: 0
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

// bid on a product
exports.bidOnProduct = async (req, res) => {
    try {
        const {
            currentBid
        } = req.body
        const product = await Product.findById(req.params.id)
        if (currentBid.amount > product.currentBid.amount) {
            product.currentBid = currentBid
            product.bids.push(currentBid)
            const results = await product.save()
            return res.json({
                status: 'success',
                content: results,
                message: 'Bid placed successfully'
            })
        } else {
            // this will never happen because the frontend will not allow the user to bid if the current bid is less than the current bid
            return res.json({
                status: 'error',
                message: 'Bid is lower than the current highest bid'
            })
        }
    } catch (error) {
        return res.json({
            status: 'error',
            message: error.message
        })
    }

}


exports.setupAutoBid = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        product.autoBidders = req.body
        const results = await product.save()
        return res.json({
            status: 'success',
            content: results,
            message: 'Auto bid setup successfully'
        })
    } catch (error) {
        return res.json({
            status: 'error',
            message: error.message
        })
    }
}