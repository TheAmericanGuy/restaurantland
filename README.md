
##  Description

**Restaurant Land** is a web app to help restaurant owners with their day to day task of placing orders and recieving them properly. By using **Node.js** and **PostgreSQL** we present a trstful and reliable app for those that need manage their restaurant

---

## Features

- **Login by PIN (Backend Integration):**  
  Secure login system where user PINs are stored in the backend, ensuring centralized management and improved security.

- **Reservation System with Prioritization:**  
  An intuitive reservation system that automatically organizes reservations by the earliest arrival time for efficient management.

- **New Orders Management:**  
  A dynamic system for managing new orders, including categorization and seamless tracking.

- **Timezone API and Configuration:**  
  Integration with a timezone API, allowing users to configure and display date and time based on their selected timezone.

- **User Management:**  
  Comprehensive user management system enabling admins to add, view, and delete users with roles and PINs.

- **Automatic Log Off:**  
  A built-in inactivity tracker that automatically logs users out after a specified period of inactivity to enhance security.


---

## 🛠️ Technologies Used

- **Node.js**: Server-side runtime for building the CLI.
- **PostgreSQL**: Relational database for storing and querying data.

---

## Installation

Follow these steps to set up the project on your local machine:

### Prerequisites

1. **Node.js:**  
   Install Node.js from [Node.js official website](https://nodejs.org/).
   
2. **PostgreSQL:**  
   Install and set up PostgreSQL. Ensure the database is running on your machine.

3. **Git:**  
   Ensure Git is installed. [Download Git](https://git-scm.com/).

## 🚀 Usage
- Start the application by using (node server.js)
- Use the interactive menu and follow its guides;

## 🗄️ Usage
## Usage

Follow these steps to use the application effectively:

### 1. **Login**
   - Open the `login.html` page in your browser.
   - Enter your **PIN** and click "Login".
   - The application supports:
     - **Admin Login**: Access to user management and other administrative features.
     - **User Login**: Limited access to create reservations and orders.

---

### 2. **Managing Reservations**
   - Navigate to the reservations page (`reservation.html`).
   - Fill out the form with:
     - **Name**: Name of the customer.
     - **Phone**: Phone number (auto-formatted).
     - **Date & Time**: Select the desired reservation time.
   - Submit the form to add the reservation.
   - Reservations are automatically sorted by earliest arrival time.

---

### 3. **Creating Orders**
   - Go to the orders page (`new-orders.html`).
   - Select the items and order type (pickup or delivery).
   - Provide the customer's name and additional details as required.
   - Submit the form to add the order.

---

### 4. **User Management (Admin Only)**
   - Navigate to the user management page (`edit_users.html`).
   - **Add User:**
     - Fill out the form with the new user’s name, PIN, and role.
     - Click "Add User" to save the user in the backend.
   - **Delete User:**
     - View the list of users.
     - Click "Delete" next to the user you want to remove.

---

### 5. **Timezone Configuration**
   - Open the `options.html` page.
   - Select a timezone from the dropdown menu to configure the displayed time and date.
   - The selected timezone is saved for future visits.

---

### 6. **Automatic Log Off**
   - For security, the application will automatically log out users after **10 minutes of inactivity**.
   - Activity is tracked by mouse movements, clicks, or scrolling.

---

### Notes
   - Ensure the backend is running at `http://localhost:3000` to use all features.
   - Admin users have additional privileges, such as managing other users and accessing administrative options.
   - Use the default admin PIN (`1234`) for the initial setup.


## 📸 Preview

There is currently not a preview video to display... we keep you posted

## Future Enhancements

Here are some features planned for future updates to improve the application:

- **Menu Management:**  
  Allow admins to add, edit, and remove items from the menu dynamically via the application.

- **Special Discounts:**  
  Add a dedicated section for discounted items, enabling promotions and special offers.

- **Pricing System:**  
  Integrate a price management system for menu items, enabling total cost calculation for orders.

- **Table View Design:**  
  Provide a visual table layout for the restaurant, allowing admins to assign reservations to specific tables.

- **Delivery Management:**  
  Add a management feature where admins can toggle delivery options (enable/disable) for the restaurant.

- **Improved Layout and Design:**  
  Enhance the CSS to create a more intuitive and visually appealing user interface.

- **Company Branding Options:**  
  Add features to customize the application with the company logo, name, and address.

These enhancements aim to make the application more robust, flexible, and tailored to restaurant operations.

##  Contributing
Contributions are welcome! Follow these steps to contribute:
- Fork the repository
- Create a feature branch (git checkout -b feature/your-feature).
- Commit your changes (git commit -m "Add your feature").
- Push to the branch (git push origin feature/your-feature).
- Open a pull request.

## 📜 License
This project is licensed under the MIT License.
