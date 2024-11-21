// Sample orders data
const orders = [
    { id: 1, status: 'pending', customerName: 'John Doe', items: ['Burger', 'Fries'] },
    { id: 2, status: 'active', customerName: 'Jane Smith', items: ['Pizza', 'Salad'] },
    { id: 3, status: 'pending', customerName: 'Mark Johnson', items: ['Pasta', 'Garlic Bread'] },
    { id: 4, status: 'active', customerName: 'Emily Davis', items: ['Sushi', 'Miso Soup'] }
];

// Function to display orders
function displayOrders() {
    const pendingContainer = document.getElementById('pending-orders');
    const activeContainer = document.getElementById('active-orders');
    
    pendingContainer.innerHTML = '';
    activeContainer.innerHTML = '';
    
    orders.forEach(order => {
        const orderCard = createOrderCard(order);
        
        if (order.status === 'pending') {
            pendingContainer.appendChild(orderCard);
        } else if (order.status === 'active') {
            activeContainer.appendChild(orderCard);
        }
    });
}

// Function to create an individual order card
function createOrderCard(order) {
    const card = document.createElement('div');
    card.classList.add('order-card');
    
    const orderTitle = document.createElement('h3');
    orderTitle.textContent = `Order #${order.id} - ${order.customerName}`;
    
    const orderItems = document.createElement('p');
    orderItems.textContent = `Items: ${order.items.join(', ')}`;
    
    const reviewButton = document.createElement('button');
    reviewButton.classList.add('review-btn');
    reviewButton.textContent = 'Review Order';
    reviewButton.onclick = () => reviewOrder(order.id);
    
    const statusButton = document.createElement('button');
    statusButton.classList.add('status-btn');
    statusButton.textContent = order.status === 'pending' ? 'Mark as Active' : 'Mark as Completed';
    statusButton.onclick = () => changeOrderStatus(order.id);
    
    card.appendChild(orderTitle);
    card.appendChild(orderItems);
    card.appendChild(reviewButton);
    card.appendChild(statusButton);
    
    return card;
}

// Function to review an order
function reviewOrder(orderId) {
    alert(`Reviewing Order #${orderId}`);
}

// Function to change the order status
function changeOrderStatus(orderId) {
    const order = orders.find(o => o.id === orderId);
    
    if (order.status === 'pending') {
        order.status = 'active';
    } else if (order.status === 'active') {
        order.status = 'completed';
    }
    
    displayOrders();
}

// Initial display of orders
displayOrders();
