# ⚡ NexTronics E-Commerce Platform (Client)

NexTronics is a modern and responsive e-commerce web application developed with **React**, **Vite**, and **Tailwind CSS**, offering seamless user experiences for both customers and admins. It includes features like product management, customer dashboards, a shopping cart, and secure checkout—all designed for speed and simplicity.

> This is the frontend repo. [Visit Backend Repo](https://github.com/chanukaprabodha/NexTronics-Server)

---

## 🖥️ Tech Stack

- **Frontend**: React + Vite + Redux Toolkit + Axios + Tailwind CSS  
- **Backend**: Node.js + Express (see backend repo)  
- **Database**: MongoDB Atlas  
- **Auth**: JWT (Login, Register)  
- **Email**: Nodemailer with Gmail  
- **UI Tools**: SweetAlert2, Heroicons  

---

## 🚀 Features

### 👤 Customer Features

- Customer registration with email confirmation  
- Login/logout functionality  
- Product browsing and search  
- Add to cart and quantity control  
- Secure checkout process  
- Order summary and payment (coming soon)

### 🛠️ Admin Features

- Admin dashboard with order and customer overview  
- Product management (add/update/delete)  
- View customer details  

### 💌 Email Notifications

- Welcome email sent after successful registration  

---

## 📸 Screenshots

### 🔐 Admin Dashboard
<img width="1897" height="916" alt="Image" src="https://github.com/user-attachments/assets/af95fb73-b928-4d5d-8657-3c5175324f48" />

### 👤 Customer Dashboard
<img width="1898" height="918" alt="Image" src="https://github.com/user-attachments/assets/e87853bd-470c-42ee-ade1-5e77999e4c05" />

### 🛒 Cart Drawer
<img width="1919" height="916" alt="Image" src="https://github.com/user-attachments/assets/1737832a-3832-4f5e-b6a0-2eb256ee37c9" />

### 💳 Checkout Page
<img width="1900" height="914" alt="Image" src="https://github.com/user-attachments/assets/e6b21267-33c4-48ba-868f-ff7d2b19e383" />

### 📧 Welcome Email
<img width="1506" height="740" alt="Image" src="https://github.com/user-attachments/assets/1627a0b2-333e-4dce-ac88-c83c43201066" />

---

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/chanukaprabodha/NexTronics-Client.git
cd NexTronics-Client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file in the root directory and add the following:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Run Application

```bash
npm run dev
```

### 🔒 Authentication

- Admin and customers can log in using their credentials  
- Auth tokens are stored securely  
- Protected routes are used for dashboard access  

### 📦 Folder Structure

```bash
NexTronics-Client/
│
├── public/              # Static assets and favicon
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Route-level components
│   ├── redux/           # Redux Toolkit slices and store
│   ├── services/        # API calls using Axios
│   ├── App.jsx          # Main app entry
│   └── main.jsx         # Vite entry file
├── .env                 # Environment config
├── index.html
└── README.md
```

## 📧 Contact & Credits

Developed by **Chanuka Prabodha**  
Special thanks to **IJSE** for the academic guidance

---

