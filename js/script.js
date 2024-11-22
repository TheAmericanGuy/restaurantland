document.addEventListener("DOMContentLoaded", function () {
    const pendingOrdersContainer = document.getElementById("pending-orders");
    const activeOrdersContainer = document.getElementById("active-orders");

    function displayOrders() {
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        pendingOrdersContainer.innerHTML = "<h2>Pending Orders</h2>";
        activeOrdersContainer.innerHTML = "<h2>Active Orders</h2>";

        orders.forEach(order => {
            const orderCard = createOrderCard(order);
            if (order.status === "pending") {
                pendingOrdersContainer.appendChild(orderCard);
            } else if (order.status === "active") {
                activeOrdersContainer.appendChild(orderCard);
            }
        });
    }

    function createOrderCard(order) {
        const card = document.createElement("div");
        card.classList.add("order-card");

        const orderTitle = document.createElement("h3");
        orderTitle.textContent = `${order.customerName}`;

        const itemsList = document.createElement("p");
        itemsList.textContent = `Items: ${order.items.join(", ")}`;

        const actionButton = document.createElement("button");
        actionButton.classList.add("ready-btn");
        actionButton.textContent = order.status === "pending" ? "Mark as Ready" : "Mark as Done";

        actionButton.onclick = () => {
            if (order.status === "pending") {
                updateOrderStatus(order.id, "active");
            } else if (order.status === "active") {
                updateOrderStatus(order.id, "completed");
            }
        };

        const cancelButton = document.createElement("button");
        cancelButton.classList.add("cancel-btn");
        cancelButton.textContent = "Cancel Order";
        cancelButton.onclick = () => updateOrderStatus(order.id, "canceled");

        card.appendChild(orderTitle);
        card.appendChild(itemsList);
        card.appendChild(actionButton);
        card.appendChild(cancelButton);

        return card;
    }

    function updateOrderStatus(orderId, newStatus) {
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.status = newStatus;
            localStorage.setItem("orders", JSON.stringify(orders));
            displayOrders();
        }
    }

    displayOrders();
});
