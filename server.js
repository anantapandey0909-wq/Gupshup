const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
// Serve all static files from root directory
app.use(express.static(path.join(__dirname))); 

// API Endpoints
app.post('/api/order', (req, res) => {
    const { cart, orderType, total } = req.body;
    
    // In a real application, you would save this to a database, send an email, etc.
    console.log('--- NEW ORDER RECEIVED ---');
    console.log('Type:', orderType);
    console.log('Total: ₹' + total);
    console.log('Items:', cart);
    console.log('--------------------------');

    res.status(200).json({ 
        success: true, 
        message: 'Order placed successfully! Preparing your authentic Gup Shup experience. 🍽️',
        orderId: 'GS-' + Math.floor(Math.random() * 10000)
    });
});

// Fallback to index.html for any other route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Local: http://localhost:${PORT}`);
});
