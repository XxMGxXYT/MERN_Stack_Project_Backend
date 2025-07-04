import Product from "../models/Product.js";

const getAllProductsHandler = async (req, res) => {
    try {
        const products = await Product.find({}); // Get all products from the database
        res.status(200).json({ success: true, products })
    } catch (err) {
        console.error("Error in getting products from database")
        res.status(500).json({ success: false, message: err.message })
    }
};

const createProductHandler = async (req, res) => {
    // Create a new product
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }
    try {
        const newProduct = new Product(product);
        await newProduct.save();
        res.status(201).json({ success: true, product: newProduct });
    } catch (err) {
        console.error("Error in creating product: ", err.message)
        res.status(500).json({ success: false, message: err.message });
    }
}

const updateProductHandler = async (req, res) => {
    const id = req.params.id
    try {
        const updates = req.body
        const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, product: updatedProduct });
    } catch (err) {
        console.error("Error in updating product: ", err.message)
        res.status(500).json({ success: false, message: err.message });
    }
};

const deleteProductHandler = async (req, res) => {
    const id = req.params.id
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (err) {
        console.error("Error in deleting product: ", err.message)
        res.status(500).json({ success: false, message: err.message });
    }
}

export {
    getAllProductsHandler,
    createProductHandler,
    updateProductHandler,
    deleteProductHandler
};