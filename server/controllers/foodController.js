import Food from "../models/Food.js";

// Get all foods
export const addFood = async (req, res) => {
  try {
    const { title, subtitle, price, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!image) return res.status(400).json({ message: "Image is required" });

    const food = await Food.create({ title, subtitle, price, category, image });
    res.status(201).json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    // Isticmaal findByIdAndDelete
    const deletedFood = await Food.findByIdAndDelete(id);

    if (!deletedFood) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.json({ message: "Food deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
