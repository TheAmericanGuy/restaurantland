document.addEventListener("DOMContentLoaded", function () {
    const selectedItemsList = document.getElementById("selected-items");
    const menuItemButtons = document.querySelectorAll(".menu-item-btn");
    const sendOrderButton = document.getElementById("send-order");
    const customerNameInput = document.getElementById("customer-name");

    let selectedItems = [];

    menuItemButtons.forEach(button => {
        button.addEventListener("click", function () {
            const item = this.getAttribute("data-item");

            if (!selectedItems.includes(item)) {
                selectedItems.push(item);
                updateSelectedItems();
            }
        });
    });

    function updateSelectedItems() {
        selectedItemsList.innerHTML = "";
        selectedItems.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            selectedItemsList.appendChild(li);
        });
    }

    sendOrderButton.addEventListener("click", function (event) {
        event.preventDefault();
        const customerName = customerNameInput.value.trim();

        if (!customerName) {
            alert("Please enter a customer name!");
            return;
        }

        if (selectedItems.length === 0) {
            alert("Please select at least one item!");
            return;
        }

        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        const newOrder = {
            id: orders.length + 1,
            customerName,
            items: selectedItems,
            status: "pending",
        };

        orders.push(newOrder);
        localStorage.setItem("orders", JSON.stringify(orders));

        alert("Order successfully added to Pending Orders!");
        customerNameInput.value = "";
        selectedItems = [];
        updateSelectedItems();
    });
});
