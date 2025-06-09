import notification from "./notification.model.js";

export const getUserNotifications = async (req, res) => {
  const userId = req.params.userId;

  try {
    const notifications = await notification.find({ user: userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notifications' });
  }
};