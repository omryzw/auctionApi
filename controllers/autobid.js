const {
    Autobid,
    Product,
    Notification
} = require('../models/index');

exports.addNewAutobid = async (req, res) => {
    try {
        req.body.controlAmount = req.body.maxAmount
        const newAutobid = new Autobid(req.body);
        const results = await newAutobid.save();
        return res.json({
            status: 'success',
            content: results,
            message: 'Autobid setup successfully'
        })
    } catch (error) {
        return res.json({
            status: 'error',
            message: error.message
        })
    }
}

exports.setupAutoBidOnProduct = async (req, res) => {
    try {
        // first check if does the user have an auto bid setup
        const autoBidder = await Autobid.find({
            user: req.body.user
        });
        if (autoBidder.length > 0) {
            const product = await Product.findById(req.params.id)
            const {
                user,
                action
            } = req.body
            // if there are more than one auto bidder then reject for now
            if (product.autoBidders.length == 1) {
                return res.json({
                    status: 'error',
                    message: 'Only one auto bidder is allowed for now'
                })
            }
            // push to the autoBidders array
            product.autoBidders.push(user)
            await product.save()
            return res.json({
                status: 'success',
                message: 'Auto bid setup successfully'
            })
        } else {
            return res.json({
                status: 'exist',
                message: 'You have no auto bid setup'
            })
        }
    } catch (error) {
        return res.json({
            status: 'error',
            message: error.message
        })
    }
}

// manual bid on a product
exports.bidOnProduct = async (req, res) => {
    try {
        const {
            currentBid
        } = req.body
        const product = await Product.findById(req.params.id)
        if (currentBid.amount > product.currentBid.amount) {
            product.currentBid = currentBid
            product.bids.push(currentBid)
            await product.save()
            autoBid(results)
            return res.json({
                status: 'success',
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


// helper function to auto bid on a product
const autoBid = async (product) => {
    if (product.autoBidders.length > 0) {
        const autoBidder = product.autoBidders[0]
        const autoBidderDetails = await Autobid.find({
            user: autoBidder
        })
        if (autoBidderDetails[0].maxAmount > 0) {
            autoBidderDetails[0].maxAmount = autoBidderDetails[0].maxAmount - 1
            await autoBidderDetails[0].save()
            if (autoBidderDetails[0].maxAmount == 0) {
                const notification = new Notification({
                    user: autoBidder,
                    message: 'The funds reserverd for autobidding have been depleted'
                })
                await notification.save()
            }
            let diff = autoBidderDetails[0].controlAmount - autoBidderDetails[0].maxAmount
            let percent = (diff / autoBidderDetails[0].controlAmount) * 100
            if (percent >= autoBidderDetails[0].alertTrigger) {
                const notification = new Notification({
                    user: autoBidder,
                    message: `The funds reserverd for autobidding are running low, approximately ${percent.toFixed(1)}% has been used so far.`
                })
                await notification.save()
            }
            product.bids.push({
                user: autoBidder,
                amount: product.currentBid.amount + 1
            })
            product.currentBid = {
                user: autoBidder,
                amount: product.currentBid.amount + 1
            }
            await product.save()
        }
    }
}

exports.getBidsWon = async (req, res) => {
    try {
        const bids = await Product.find({
            'currentBid.user': req.query.user,
            active: false
        }, {
            __v: 0
        })
        return res.json({
            status: 'success',
            content: bids,
            message: 'Bids retrieved successfully'
        })
    } catch (error) {
        return res.json({
            status: 'error',
            message: error.message
        })
    }
}