# BotigaShop Backend API - REST API for a BotigaShop E-commerce 🛍️🛒

This repository contains the backend REST API for BotigaShop, a fictional e-commerce platform. This API provides endpoints for managing products, categories, users, orders, and other essential e-commerce functionalities.

**GitHub Repository:**

[https://github.com/Aline-CROIRE/BotigaShop-Backend](https://github.com/Aline-CROIRE/BotigaShop-Backend) 🌐

**Live API Documentation (Swagger UI):**

[https://botigashop-api.onrender.com/api/api-docs/#/](https://botigashop-api.onrender.com/api/api-docs/#/) 💻

**Overview**

The BotigaShop Backend API provides the server-side logic and data management for the BotigaShop e-commerce application. It's built using Node.js, Express.js and Mongoose.  It follows RESTful principles for predictable and efficient data access and manipulation.

**Key Features** ✨

*   **Product Management:**
    *   Create, read, update, and delete (CRUD) products. 📦➕ 📦👁️ 📦✏️ 📦🗑️
    *   Search products by name, description, and category. 🔍🏷️
    *   Retrieve product details, including images, pricing, and availability. 🖼️💰✔️
*   **Category Management:**
    *   Create, read, update, and delete product categories. 📂➕ 📂👁️ 📂✏️ 📂🗑️
    *   Organize products into hierarchical categories. 🌳
*   **User Management:**
    *   User registration and authentication (login/logout). 👤🔑
    *   Manage user profiles (e.g., address, contact information). 👤ℹ️
    *   Implement role-based access control (RBAC) if applicable (e.g., admin vs. customer). 🛡️
*   **Order Management:**
    *   Place orders and manage order status. 🛒🚚
    *   Track order history. 🧾🕒
    *   Calculate order totals and shipping costs. 💳🚚
*   **Payment Processing:**
    *   Integration with Stripe for secure payment processing. 💳
*   **Authentication and Authorization:**
    *   Secure API endpoints using JWT. 🔒🔑
    *   Authorize users to access specific resources based on their roles. 🛡️

**Technologies Used** ⚙️

*   **Node.js:** The JavaScript runtime environment for server-side development. 🌍
*   **Express.js:** A minimalist web application framework for Node.js. 🚀
*   **Mongoose:** An Object-Document Mapper (ODM) for interacting with MongoDB. 🔄
*   **MongoDB:** Database used for storing application data. 🗄️
*   **JSON Web Tokens (JWT):** For secure authentication and authorization. 🔑
*   **Bcrypt:** For password hashing and security. 🛡️
*   **Nodemailer:** For sending emails (e.g., order confirmations, password resets). 📧
*   **Swagger:** For API documentation and testing (generates the Swagger UI). 📚
*   **Stripe:** For processing payments. 💳
*   **Render:** Hosting platform for the API. ☁️

**Installation and Setup** 🛠️

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Aline-CROIRE/BotigaShop-Backend.git
    cd BotigaShop-Backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install  
    ```

3.  **Configure environment variables:**

    *   Create a `.env` file in the root directory.
    *   Set the following environment variables (adjust values as needed):

        ```
        PORT=3000
        DATABASE_URL=[YOUR_MONGODB_CONNECTION_STRING]
        JWT_SECRET=[YOUR_JWT_SECRET_KEY]
        STRIPE_SECRET_KEY=[YOUR_STRIPE_SECRET_KEY]
        STRIPE_PUBLIC_KEY=[YOUR_STRIPE_PUBLIC_KEY]
        NODEMAILER_EMAIL=[YOUR_NODEMAILER_EMAIL]
        NODEMAILER_PASSWORD=[YOUR_NODEMAILER_PASSWORD]
        NODE_ENV=development  # or production
        # Add other necessary environment variables (e.g., email configuration)
        ```

    *   **Important:** Do not commit your `.env` file to the repository. ⚠️

4.  **Start the server:**

    ```bash
    npm run dev  # or yarn dev (for development with hot reloading)
    npm start    # or yarn start (for production)
    ```

**API Endpoints**

Refer to the live Swagger UI documentation for a complete list of available endpoints and their specifications:

[https://botigashop-api.onrender.com/api/api-docs/#/](https://botigashop-api.onrender.com/api/api-docs/#/)

**Example Usage**

*   **Get all products:**  `GET /api/products` 📦👁️
*   **Get a specific product by ID:** `GET /api/products/:id` 📦🔎
*   **Create a new product:** `POST /api/products` (requires admin authentication) 📦➕
*   **Register a new user:** `POST /api/users/register` 👤➕
*   **Login a user:** `POST /api/users/login` 👤🔑

**Authentication** 🔒🔑

The API uses JWT for authentication. After successful login, the API will return a JWT token. Include this token in the `Authorization` header of subsequent requests to protected endpoints:Authorization: Bearer <YOUR_JWT_TOKEN>

**Payment Processing** 💳

The API utilizes Stripe for processing payments. Refer to the Stripe documentation and API endpoints for details on integrating payment functionality. You'll need to configure Stripe with your secret and publishable keys.

**Error Handling** 🚨

The API returns standard HTTP status codes to indicate the success or failure of a request. Error responses typically include a JSON body with an error message.

**Contributing** 🤝

We welcome contributions! Please follow these guidelines:

*   Fork the repository. 🍴
*   Create a new branch for your feature or bug fix. 🌿
*   Write clear and concise commit messages. ✍️
*   Submit a pull request with a detailed description of your changes. 📤
*   Adhere to the coding style and conventions used in the project. 💻

**License**

MIT License 📜

**Contact** 📧
Please feel free to reach out if you have any questions, suggestions, or bug reports related to the BotigaShop Backend API. I am happy to help!

*   **Email:** niyocroirealine@gmail.com ✉️
*   **Instagram:** [https://www.instagram.com/croire_aline/](https://www.instagram.com/croire_aline/) 📸
*   **LinkedIn:** [https://www.linkedin.com/in/niyonizera-aline-105884291/](https://www.linkedin.com/in/niyonizera-aline-105884291/) 💼
*   **Twitter:** [https://x.com/AlineNiyon99024](https://x.com/AlineNiyon99024) 🐦
*   **Phone:** +250 790635120 📞 


**Disclaimer** ⚠️

This README provides a general overview of the BotigaShop Backend API. Refer to the code, Swagger UI documentation, and contributing guidelines for more detailed information.
