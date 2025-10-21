import Order from "../models/order.js";


// Update order status by productId
// controllers/ordersController.js
 const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ message: "Status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { userId, items, subtotal, delivery, taxes, total } = req.body;

    const order = new Order({
      userId,
      items,
      subtotal,
      delivery,
      taxes,
      total,
      status: "Pending"
    });

    await order.save();
    res.status(201).json({ message: "Order placed", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to place order" });
  }
};


const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Haddii aad rabto, ku dar sort ama populate
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

export { updateOrderStatus ,getAllOrders };