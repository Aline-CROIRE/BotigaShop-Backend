const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { query, category, minPrice, maxPrice, sort } = req.query;
    
    let searchQuery = {};
    
    // Text search
    if (query) {
      searchQuery.$text = { $search: query };
    }
    
    // Category filter
    if (category) {
      searchQuery.category = category;
    }
    
    // Price range filter
    if (minPrice || maxPrice) {
      searchQuery.price = {};
      if (minPrice) searchQuery.price.$gte = Number(minPrice);
      if (maxPrice) searchQuery.price.$lte = Number(maxPrice);
    }
    
    // Build sort object
    let sortQuery = {};
    if (sort) {
      switch (sort) {
        case 'price_asc':
          sortQuery.price = 1;
          break;
        case 'price_desc':
          sortQuery.price = -1;
          break;
        case 'newest':
          sortQuery.createdAt = -1;
          break;
        case 'rating':
          sortQuery['ratings.average'] = -1;
          break;
      }
    }

    const products = await Product.find(searchQuery)
      .sort(sortQuery)
      .populate('category');

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Add these codes to productcontroller.js

exports.updateProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  exports.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };