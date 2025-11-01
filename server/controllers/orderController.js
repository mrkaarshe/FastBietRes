import Order from "../models/order.js";
import { SendMyEmail } from "../config/nodeMailer.js";

const fastBiteEmail = (title, bodyHtml) => `
<html>
<body style=" color: #dfb407; font-family: Arial, sans-serif; padding: 0px;">
    <div style="border-radius: 15px; max-width: 600px; margin: auto; background-color: #1a1a1a; padding: 20px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);">
        <header style="background-color: #dfb407; border-radius: 10px 10px 0px 0px; color: #ffffff; text-align: center; font-weight: bold; padding: 10px;">
            <p style="font-size: 24px; margin: 0;">${title}</p>
        </header>
        
        <div style="padding: 20px; color: #fff;">
            <p style="font-size: 18px; color: #f4f4f4;">Hi there!</p>
            ${bodyHtml}
        </div>

        <hr style="border-color: #dfb407; margin: 20px 0; border-width: 2px;">
         <p style="text-align:center; font-size: 14px; color: #fff;">© ${new Date().getFullYear()} FastBite. All rights reserved.</p>

    </div>
</body>
</html>

</html>


`;

export const placeOrder = async (req, res) => {
  try {
    const { items, contact, paymentMethod ,userId} = req.body;

    // Compose full address string from contact info
    const address = `${contact.address}, ${contact.city}, ${contact.region} ${contact.currency}`;

    const order = await Order.create({
      userId: req.user,
      items,
      contact,
      address,
      paymentMethod, // <-- New field here
      status: "Pending",
    });
    console.log(userId)
    

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Place order error:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
};


// 🟢 USER — Get orders of the logged-in user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Get user orders error:", error);
    res.status(500).json({ message: "Failed to fetch user orders" });
  }
};

// 🔵 ADMIN — Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    console.log("Updating order:", orderId, "to status:", status);

    // Raadinta order-ka
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Update status
    order.status = status || order.status;
    await order.save();

    // Xogta emailka laga dirayo
    const { firstName, lastName, email } = order.contact;
    const fullName = `${firstName || ""} ${lastName || ""}`.trim() || "Customer";

    // Dhisidda farriinta emailka
    const emailSubject = `Your FastBite Order #${order._id.toString().slice(21)} is now ${status}`;
    const emailBody = fastBiteEmail(
      `Hello ${fullName},`,
      `
        <p style="font-size:16px; text-align:center;">
          Your order <strong>#${order._id}</strong> status has been updated to: 
          <span style="color:green; font-weight:bold;">${status}</span>.
        </p>

        ${
          status.toLowerCase() === "delivered"
            ? `<p style="text-align:center;">Your meal has been successfully delivered 🍽️. We hope you enjoy it!</p>`
            : `<p style="text-align:center;">Your order is being prepared and will be delivered within <strong>30 minutes</strong> 🚚.</p>`
        }

        <h4 style="margin-top:20px;">Order Summary:</h4>
        <ul>
          ${order.items
            .map(
              (item) =>
                `<li>${item.productTitle} — ${item.quantity}x — $${item.totalPrice} </li>`
            )
            .join("")}
        </ul>

        <p style="text-align:start; font-size:14px; color:#fff;">
          Delivery Address: <strong>${order.contact.address}, ${order.contact.district}, ${order.contact.country}</strong><br/>
          Phone: ${order.contact.phone}
        </p>

        <p style="text-align:center; margin-top:15px;">
          Thank you for choosing <strong>FastBite</strong> — Fast, Fresh & Delicious!
        </p>
      `
    );

    // Diyaarinta iyo diridda emailka
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: emailSubject,
      html: emailBody,
    };

    await SendMyEmail(mailOptions);

    res.status(200).json({
      message: `Order status updated to '${status}' and email sent successfully.`,
      order,
    });
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};



export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder)
      return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Delete order error:", error);
    res.status(500).json({ message: "Failed to delete order" });
  }
};
