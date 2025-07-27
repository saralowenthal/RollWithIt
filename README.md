
# 🧳 RollWithIt
### Personal Touch

**RollWithIt** is a full-stack web application that helps users create and manage customized packing lists with ease. Whether you're preparing for a weekend getaway or an extended adventure, this app helps keep your packing stress-free.

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React (with Vite)
- 🌐 Fetch API
- 💅 Bootstrap for styling
- 🔀 React Router DOM for navigation

### Backend
- 🧩 AWS Lambda (Node.js)
- 🔗 API Gateway
- 📄 DynamoDB
- 🚀 AWS SAM (for deployment)
- 🧪 Vitest & Testing Library for frontend tests

> The backend handles all packing list CRU(D) operations, while the frontend provides a responsive UI.

---

## ✨ Features

- ➕ **Add Items** – Start new packing lists or add to existing ones  
- 📋 **View Lists** – Browse all your saved lists and items  
- ✏️ **Edit Items** – Update list titles or item names  
- ✅ **Check Off Items** – Mark things as packed  
- 🗃️ **Persistent Storage** – Data saved and retrieved via the backend  
- 📱 **Responsive Design** – Works on phones, tablets, and desktops  

---

## 🚀 Getting Started

Here’s how to get **RollWithIt** running on your local machine:

### 📁 1. Clone the Repository

```bash
git clone https://github.com/WITS2025/RollWithIt.git
cd RollWithIt
```

---

### 💻 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

To start the development server:

```bash
npm run dev
```

---

### ⚙️ 3. Set Up the Backend

Make sure you have the **AWS CLI** and **AWS SAM CLI** installed.

```bash
cd backend
sam build
sam deploy
```

This will deploy your Lambda functions and API Gateway endpoints to AWS.

---

### 🔌 4. Connect Frontend to Backend

In the frontend code, update the API base URL to match the **API Gateway URL** from the `sam deploy` output.

---

### ▶️ 5. Run the App Locally

From the `frontend` directory:

```bash
npm run dev
```

This will launch the Vite development server, usually at:

```
http://localhost:5173
```

---

## 🧪 Run Tests

To run the frontend unit tests:

```bash
npm run test
```

---

## 👩‍💻 Authors

Tzipporah Gordon  
Sara (Lowenthal) Miller  
Pessie Mittelman  

Built with 💻, ☕, and dreams of smooth travel ✈️
