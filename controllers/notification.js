const {
    Notification
} = require('../models/index');

exports.getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            user: req.query.user
        },{__v:0,updatedAt:0}).sort({
            createdAt: -1
        });
        return res.json({
            status: 'success',
            content: notifications,
            total: notifications.length
        })
    } catch (error) {
        return res.json({
            status: 'error',
            message: error.message
        })
    }
};

exports.readNotification = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        notification.read = true;
        await notification.save();
        return res.json({
            status: 'success',
            content: notification
        })
    } catch (error) {
        return res.json({
            status: 'error',
            message: error.message
        })
    }
}