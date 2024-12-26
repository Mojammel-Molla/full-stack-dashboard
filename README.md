# [Hekto (E-Commerce Application)](https://hekto-1a747.web.app/)  
 
**[Live Link](https://hekto-1a747.web.app/)**

**Admin Credentials**  
- **Email:** abdul@gmail.com  
- **Password:** 1234

---

### **Project Description**  
**Hekto** is a comprehensive full-stack web application built to deliver a complete online shopping experience. It serves as a robust platform catering to three primary user roles: customers, vendors, and administrators. Users can explore and purchase products seamlessly, vendors can manage their shops and inventories effectively, and administrators oversee the entire system for smooth operations. This project emphasizes scalability, responsiveness, and secure transactions, creating a feature-rich ecosystem for e-commerce interactions.  

---

### **Technology Stack**  
**Frontend**  
- **React.js:** Framework for building responsive and scalable UI.  
- **TypeScript:** Ensures type safety and robust development practices.  
- **Redux:** Manages global state efficiently.  

**Backend**  
- **Node.js with Express:** Handles server-side logic and RESTful APIs.  
- **Prisma:** Simplifies database interactions with PostgreSQL.  
- **Cloudinary:** Manages product image uploads and storage.  

**Database**  
- **PostgreSQL:** For storing user data, products, orders, and reviews.  

**Additional Tools**  
- **JWT (JSON Web Tokens):** Secures authentication and session management.  
- **Aamarpay:** Enables secure payment processing for purchases.  

---

### **Project Features**  

#### **Admin Features**  
- Manage users (suspend/delete accounts).  
- Moderate vendor shops (approve/blacklist).  
- Dynamically handle product categories.  
- Monitor platform metrics, payments, and activities.  

#### **Vendor Features**  
- Create and manage shop profiles.  
- Add, edit, duplicate, or delete products.  
- Monitor product inventory and order history.  
- Respond to customer reviews.  

#### **User Features**  
- **Product Browsing:** Explore products with advanced filtering and search.  
- **Cart Management:** Add items to the cart with vendor-specific restrictions.  
- **Checkout:** Secure payments with discount coupon integration.  
- **Order History:** View past purchases with detailed breakdowns.  
- **Social Features:** Follow shops and leave product reviews and ratings.  
<!-- - **Product Comparison:** Compare up to three products within the same category.   -->

---

### **Setup Instructions**  

1. **Clone the repository:**  
   ```bash  
   git clone https://github.com/monishatBaishnab/hekto_client  
   ```  

2. **Navigate to the directory:**  
   ```bash  
   cd hekto_client  
   ```  

3. **Install dependencies:**  
   ```bash  
   npm install  
   ```  

4. **Set up environment variables:**  
   - Create a `.env` file.  
   - Add required keys for database connection, JWT secret, payment gateway, etc.  

5. **Run the application:**  
   ```bash  
   npm run dev  
   ```  

6. **Access the application:**  
   - Open your browser and navigate to `http://localhost:3000`.  

---

### **Key Highlights**  
- **Mobile-First Design:** Fully responsive for all devices.  
- **Scalable Architecture:** Paginated APIs and efficient data handling for large datasets.  
- **Robust Authentication:** Secure JWT-based login and registration.  
- **Dynamic Content:** Infinite scrolling and live updates for product listings.  
