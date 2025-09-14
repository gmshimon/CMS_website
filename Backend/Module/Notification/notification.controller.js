import notification from "./notification.model.js";

export const getUserNotifications = async (req, res) => {
  const {_id} = req.user

  try {
    const notifications = await notification.find({ user: _id }).populate('user').sort({ createdAt: -1 });
    const unreadCount  = await notification.countDocuments({ user: _id, isRead: false });
    res.status(200).json({
      status:'Success',
      message:'Successfully fetched the notifications',
      data:{  notifications, unreadCount }
    });
  } catch (err) {
    res.status(500).json({ message: err.message});
  }
};