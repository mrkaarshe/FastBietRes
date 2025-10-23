import Order from "../models/order.js";
import User from "../models/User.js";

// POST /api/history/orders
export const placeOrder = async (req, res) => {
  try {
    const { items, contact, totalPrice } = req.body;

    // Compose a full address string from contact info
    const address = `${contact.address}, ${contact.city}, ${contact.postal}`;

    // Create order with user from authenticated middleware
    const order = await Order.create({
      user: req.user._id, // from token middleware
      items,
      totalPrice,
      address,
      contact,  // optional: store contact info for reference
      status: "Pending",
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Place order error:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
};


// GET /api/history/orders/myorders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ User: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Get user orders error:", error);
    res.status(500).json({ message: "Failed to fetch user orders" });
  }
};

// GET /api/history/admin/orders
export const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
    console.log("All orders fetched:", orders);
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};


// PUT /api/history/admin/orders/:orderId
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status || order.status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    console.error("Update order error:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

