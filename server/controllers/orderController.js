import Order from "../models/order.js";
import Food from "../models/Food.js";

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


export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    // Populate items with food info
    const enrichedOrders = await Promise.all(orders.map(async (order) => {
      const itemsWithTitles = await Promise.all(order.items.map(async (item) => {
        const product = await Food.findById(item.productId).lean();
        return {
          ...item,
          title: product?.title || "Unknown",
          price: product?.price || 0,
        };
      }));

      return {
        ...order.toObject(),
        items: itemsWithTitles,
      };
    }));

    res.json(enrichedOrders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching orders" });
  }
}

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Haddii aad rabto, ku dar sort ama populate
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

export { updateOrderStatus ,getAllOrders };