// Menu Data
const menuItems = [
    {
        id: '1',
        name: 'Chicken Tandoori',
        description: 'Juicy, yogurt-marinated chicken roasted to perfection in a tandoor.',
        price: 220,
        category: 'Starters',
        image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&q=80&w=400',
        badge: 'Popular',
        isFeatured: true
    },
    {
        id: '2',
        name: 'Honey Chilli Potato',
        description: 'Crispy potato fingers tossed in a sweet & spicy honey chili glaze.',
        price: 160,
        category: 'Starters',
        image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&q=80&w=400',
        badge: ''
    },
    {
        id: '3',
        name: 'Afghani Momos',
        description: 'Creamy, rich, and perfectly roasted momos served with spicy dip.',
        price: 180,
        category: 'Momos',
        image: 'https://images.unsplash.com/photo-1626776876729-bab43bfe02ef?auto=format&fit=crop&q=80&w=400',
        badge: 'Chef\'s Special',
        isFeatured: true
    },
    {
        id: '4',
        name: 'Butter Naan',
        description: 'Soft, fluffy Indian bread baked in tandoor, brushed with butter.',
        price: 40,
        category: 'Breads',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400',
        badge: ''
    },
    {
        id: '5',
        name: 'Gup Shup Special Pizza',
        description: 'Loaded with paneer, olives, jalapenos, and our secret crust.',
        price: 260,
        category: 'Pizza',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400',
        badge: 'Most Ordered',
        isFeatured: true
    },
    {
        id: '6',
        name: 'Cold Coffee',
        description: 'Thick, creamy cold coffee topped with chocolate syrup.',
        price: 90,
        category: 'Drinks',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=400',
        badge: 'Popular'
    },
    {
        id: '7',
        name: 'Oreo Milkshake',
        description: 'Vanilla ice cream blended with crushed Oreos and milk.',
        price: 120,
        category: 'Drinks',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=400',
        badge: ''
    },
    {
        id: '8',
        name: 'Stuffed Paratha',
        description: 'Whole wheat flatbread stuffed with spiced potato filling.',
        price: 110,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=400',
        badge: ''
    },
    {
        id: '9',
        name: 'Hot Chocolate Brownie',
        description: 'Warm, gooey brownie served with vanilla ice cream and fudge.',
        price: 150,
        category: 'Desserts',
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400',
        badge: 'Sweet Tooth',
        isFeatured: true
    }
];

// App State
let cart = [];
let currentCategory = 'all';
let searchQuery = '';
let orderType = 'delivery'; // delivery or takeaway

// DOM Elements
const menuGrid = document.getElementById('menuGrid');
const recsGrid = document.getElementById('recsGrid');
const categoryTabs = document.getElementById('categoryTabs');
const currentCategoryTitle = document.getElementById('currentCategoryTitle');
const searchInput = document.getElementById('searchInput');

// Cart DOM
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const subtotalPrice = document.getElementById('subtotalPrice');
const taxPrice = document.getElementById('taxPrice');
const deliveryPrice = document.getElementById('deliveryPrice');
const totalPrice = document.getElementById('totalPrice');
const deliveryFeeLine = document.getElementById('deliveryFeeLine');
const checkoutBtn = document.getElementById('checkoutBtn');
const viewCartBtn = document.getElementById('viewCartBtn');
const estTime = document.getElementById('estTime');

// Toggles & Modals
const orderToggles = document.querySelectorAll('.toggle-btn');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartBtn = document.getElementById('closeCartBtn');
const checkoutModal = document.getElementById('checkoutModal');
const closeModal = document.querySelector('.close-modal');
const checkoutForm = document.getElementById('checkoutForm');
const addressGroup = document.getElementById('addressGroup');
const checkoutTotal = document.getElementById('checkoutTotal');

// Initialize
function init() {
    renderMenu();
    renderRecs();
    setupEventListeners();
}

function renderMenu() {
    menuGrid.innerHTML = '';
    
    let filteredItems = menuItems.filter(item => {
        const matchesCategory = currentCategory === 'all' 
            || (currentCategory === 'featured' && item.isFeatured) 
            || item.category === currentCategory;
            
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              item.description.toLowerCase().includes(searchQuery.toLowerCase());
                              
        return matchesCategory && matchesSearch;
    });

    if (filteredItems.length === 0) {
        menuGrid.innerHTML = '<p class="text-brown-light" style="grid-column: 1/-1;">No items found. Try a different search!</p>';
        return;
    }

    filteredItems.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'order-card';
        
        let badgeHtml = item.badge ? `<span class="card-badge">${item.badge}</span>` : '';
        
        itemCard.innerHTML = `
            <div class="card-img-wrapper">
                ${badgeHtml}
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="card-content">
                <div class="d-flex justify-between">
                    <h4>${item.name}</h4>
                    <span class="card-price">₹${item.price}</span>
                </div>
                <p class="card-desc">${item.description}</p>
                <div class="card-actions">
                    <button class="btn btn-outline btn-sm" onclick="addToCart('${item.id}')">Add to Cart</button>
                    ${renderRatingSnippet()}
                </div>
            </div>
        `;
        menuGrid.appendChild(itemCard);
    });
}

function renderRecs() {
    // Just grab 3 random or top items
    const recs = menuItems.slice(0, 3);
    recsGrid.innerHTML = '';
    recs.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'order-card mini';
        itemCard.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="card-content">
                <div class="d-flex justify-between align-center">
                    <h5>${item.name}</h5>
                    <span class="card-price">₹${item.price}</span>
                </div>
                <button class="btn btn-primary btn-sm w-100 mt-1" onclick="addToCart('${item.id}')">Add</button>
            </div>
        `;
        recsGrid.appendChild(itemCard);
    });
}

function renderRatingSnippet() {
    const ratings = ['⭐ 4.8 (120)', '⭐ 4.5 (89)', '⭐ 4.9 (200)', '⭐ 4.7 (150)'];
    const randomRating = ratings[Math.floor(Math.random() * ratings.length)];
    return `<span class="mini-rating">${randomRating}</span>`;
}

// Cart Logic
window.addToCart = function(id) {
    const item = menuItems.find(i => i.id === id);
    const existing = cart.find(i => i.id === id);
    
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    updateCartUI();
    
    // Auto open cart on mobile when item added
    if (window.innerWidth <= 900) {
        cartSidebar.classList.add('open');
    }
}

window.updateQuantity = function(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxaAmount = Math.round(subtotal * 0.05);
    const delivery = orderType === 'delivery' && subtotal > 0 ? 40 : 0;
    const finalTotal = subtotal + taxaAmount + delivery;

    // Update Text
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;
    subtotalPrice.innerText = '₹' + subtotal;
    taxPrice.innerText = '₹' + taxaAmount;
    deliveryPrice.innerText = '₹' + delivery;
    totalPrice.innerText = '₹' + finalTotal;
    checkoutTotal.innerText = '₹' + finalTotal;
    
    checkoutBtn.disabled = cart.length === 0;

    // Render Items
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    } else {
        cart.forEach(item => {
            const el = document.createElement('div');
            el.className = 'cart-item';
            el.innerHTML = `
                <div class="cart-item-info">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">₹${item.price * item.quantity}</span>
                </div>
                <div class="cart-item-actions">
                    <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                </div>
            `;
            cartItemsContainer.appendChild(el);
        });
    }
}

// Event Listeners
function setupEventListeners() {
    // Tabs
    categoryTabs.addEventListener('click', (e) => {
        if(e.target.tagName === 'LI') {
            document.querySelectorAll('#categoryTabs li').forEach(li => li.classList.remove('active'));
            e.target.classList.add('active');
            
            currentCategory = e.target.getAttribute('data-category');
            currentCategoryTitle.innerText = e.target.innerText.replace('⭐ ', '');
            renderMenu();
        }
    });

    // Search
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderMenu();
    });

    // Delivery / Takeaway Toggles
    orderToggles.forEach(btn => {
        btn.addEventListener('click', (e) => {
            orderToggles.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            orderType = e.target.getAttribute('data-type');
            if(orderType === 'takeaway') {
                deliveryFeeLine.style.display = 'none';
                addressGroup.style.display = 'none';
                estTime.innerText = '🕒 Estimated Pickup: 20 mins';
            } else {
                deliveryFeeLine.style.display = 'flex';
                addressGroup.style.display = 'block';
                estTime.innerText = '🕒 Estimated Delivery: 45 mins';
            }
            updateCartUI();
        });
    });

    // Mobile Sidebar Toggles
    viewCartBtn.addEventListener('click', () => {
        cartSidebar.classList.toggle('open');
    });

    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });

    // Checkout Modal
    checkoutBtn.addEventListener('click', () => {
        checkoutModal.style.display = 'flex';
        cartSidebar.classList.remove('open');
    });

    closeModal.addEventListener('click', () => {
        checkoutModal.style.display = 'none';
    });

    // Checkout Submit
    checkoutForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const taxaAmount = Math.round(subtotal * 0.05);
        const delivery = orderType === 'delivery' && subtotal > 0 ? 40 : 0;
        const finalTotal = subtotal + taxaAmount + delivery;

        const orderData = {
            cart: cart,
            orderType: orderType,
            total: finalTotal
        };

        try {
            // Send order to backend
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message + '\nOrder ID: ' + result.orderId);
                cart = []; // clear cart
                updateCartUI();
                checkoutModal.style.display = 'none';
                checkoutForm.reset();
            } else {
                alert('There was an issue placing your order. Please try again.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            // Fallback for when backend isn't running
            alert('Order placed successfully! (Fallback mode - Backend not connected)');
            cart = []; 
            updateCartUI();
            checkoutModal.style.display = 'none';
            checkoutForm.reset();
        }
    });
}

// Start app
init();
