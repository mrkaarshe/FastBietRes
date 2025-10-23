import order from "../models/order.js";

// Create a new order for the logged-in user
export const createUserOrder = async (req, res) => {
  try {
    const { items, contact } = req.body;

    // Create a new order
    const newOrder = await order.create({
      userId: req.user._id,  // Assuming userId is part of the request from JWT middleware
      items,
      contact,
      status: "Pending",
    });

    res.status(201).json({ message: "Order created", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};

// Get all orders for the logged-in user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Delete an order for a specific user
export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId; // Make sure this matches :orderId in your route
    const userId = req.user._id;   // Assuming you have JWT authentication
    
    const orderToDelete = await order.findOne({ _id: orderId, user: userId });

    if (!orderToDelete) {
      return res.status(404).json({ message: "Order not found or you do not have permission to delete this order." });
    }

    await orderToDelete.deleteOne();  // Delete the order

    res.status(200).json({ message: "Order deleted successfully!" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Failed to delete order", error: error.message });
  }
};

