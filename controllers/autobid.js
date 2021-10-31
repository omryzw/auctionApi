const {
    Autobid
} = require('../models/index');

exports.addNewAutobid = async (req, res) => {
    try {
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