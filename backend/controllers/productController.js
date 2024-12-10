const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
    const { name, price, description, category, height, thickness } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';  // Use the URL of the uploaded image

    const product = new Product({ 
        name, 
        price, 
        description, 
        category, 
        height, 
        thickness, 
        imageUrl 
    });
    
    await product.save();
    res.redirect('/admin-dashboard');
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products' });
    }
};

exports.updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
};

exports.editProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('edit-product', { title: 'Edit Product', product });
};

exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
};

exports.toggleProductListing = async (req, res) => {
    const product = await Product.findById(req.params.id);
    product.isListed = !product.isListed;
    await product.save();
    res.json(product);
};
