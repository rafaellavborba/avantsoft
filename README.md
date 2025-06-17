# 🧾 Client Management Dashboard

A React-based application to manage clients, track their purchase data, and visualize sales statistics using dynamic charts and intelligent insights.

## 🚀 Features

- 📥 **Add Clients**: Register clients with name, email, and birthdate.
- 📋 **Client List**: View a detailed list of all clients, including:
  - Number of purchases
  - Total amount spent
  - Frequency of purchases
  - Average sale value
  - A missing alphabet letter from their name
- 🔐 **Simple Authentication**: Basic login system to protect routes.
- 📊 **Sales Statistics**:
  - Line chart showing total sales per day
  - Visual highlight for:
    - Client with the highest sales volume
    - Client with the highest average value per sale
    - Client with the highest purchase frequency
- 🧼 **API Data Normalization**: Automatically cleans and structures disorganized or redundant data from the API.

## 🛠️ Tech Stack

- **React + TypeScript**
- **Redux** for state management
- **React Router** for navigation
- **Sass (SCSS)** for styling
- **Recharts** for charts and statistics

## 📦 Installation

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
