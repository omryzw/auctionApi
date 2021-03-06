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
    // if a filter exists, then filter the results by either category, current price, highest bid to lowest bid, or lowest bid to highest bid
    try {
        const products = await Product.find({active:true}, {
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

// change status  of product from active to inactive
exports.changeProductStatus = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        product.active = false
        const results = await product.save()
        return res.json({
            status: 'success',
            content: results,
            message: 'Product status changed successfully'
        })
    }
    catch (error) {
        return res.json({
            status: 'error',
            message: error.message
        })
    }
}





// // helper function to auto bid on a product
// const autoBid = async (product) => {
//     try {
//         // if there are more than one auto bidders then we need to loop through them and bid on the product with the one with the highest maxAmount but a dollar amount more than the second highest maxAmount bid
//         // this was not fully implemented since we won't have more than one auto bidder
//         if (product.autoBidders.length > 1) {
//             const maxAmount = product.autoBidders.reduce((max, current) => {
//                 return current.maxAmount > max ? current.maxAmount : max
//             }, 0)
//             const autoBidders = product.autoBidders.filter(autoBidder => autoBidder.maxAmount === maxAmount)
//             const autoBidder = autoBidders[Math.floor(Math.random() * autoBidders.length)]
//             const currentBid = {
//                 amount: autoBidder.maxAmount,
//                 user: autoBidder.user
//             }
//             if (currentBid.amount > product.currentBid.amount) {
//                 product.currentBid = currentBid
//                 product.bids.push(currentBid)
//                 await product.save()
//             }
//         } else {
//             // if there is only one auto bidder then we can just bid on the product with the highest maxAmount
//             const autoBidder = product.autoBidders[0]
//             if (product.autoBidders[0].maxAmount > product.currentBid.amount) {
//                 const currentBid = {
//                     amount: product.currentBid.amount + 1,
//                     user: autoBidder.user
//                 }
//                 product.currentBid = currentBid
//                 product.bids.push(currentBid)
//                 await product.save()
//             }
//         }
//     } catch (error) {
//         console.log(error)
//         return false
//     }
// }
