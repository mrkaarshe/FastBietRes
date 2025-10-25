import Order from "../models/order.js";

// Create a new order for the logged-in user
export const createUserOrder = async (req, res) => {
  try {
    const { items, contact , totalPrice } = req.body;

    // Create a new order, make sure to save user under "user" field (matches schema)
    const newOrder = await Order.create({
      user: req.user._id,  // Correct field name for user
      items,
      contact,
      totalPrice,
      status: "Pending",
    });

    res.status(201).json({ message: "Order created", Order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};

// Get all orders for the logged-in user
export const getUserOrders = async (req, res) => {
  const userId = req.user._id;
  console.log('userId', userId)

  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Delete an order for the logged-in user

export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const userId = req.user._id;
    const userRole = req.user.role; 
    console.log('userId', userId)
    console.log('orderId', orderId)
    console.log('userRole', userRole)
     // Assuming req.user.role is set by your auth middleware

    let orderToDelete;

    if (userRole === "admin") {
      // Admin can delete any order
      orderToDelete = await Order.findById(orderId);
    } else {
      // Regular user can delete only their own orders
      orderToDelete = await Order.findOne({ _id: orderId, user: userId });
    }

    if (!orderToDelete) {
      return res.status(404).json({ message: "Order not found or you do not have permission to delete this order." });
    }

    await orderToDelete.deleteOne();

    res.status(200).json({ message: "Order deleted successfully!" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Failed to delete order", error: error.message });
  }
};

