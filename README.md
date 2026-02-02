# Grocery Finder

A full-stack web application for finding the best grocery stores based on cart items and price comparison, with user authentication and admin management.

![Node.js](https://img.shields.io/badge/Node.js-11-green)
![Express](https://img.shields.io/badge/Express-4-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-3.1-green)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)

## Overview

A grocery shopping assistant that helps users find the best stores for their shopping cart. Features include cart management with save/restore functionality, store price comparison, responsive design, and an admin dashboard for user management. Built as a CSC309 course project at University of Toronto.

## Features

- **Shopping Cart** - Add/remove items with persistent storage
- **Save/Restore Carts** - Save frequently purchased item lists
- **Store Comparison** - Find best stores by price and distance
- **Filter & Sort** - Search and organize grocery items
- **User Authentication** - Login/logout with session management
- **Admin Dashboard** - User management for administrators
- **Responsive Design** - Mobile-friendly with collapsible navbar

## Tech Stack

| Component | Technology |
|-----------|------------|
| **Backend** | Node.js 11, Express.js |
| **Database** | MongoDB 3.1, Mongoose 5.3 |
| **Frontend** | HTML, CSS (SASS), JavaScript |
| **Auth** | bcrypt, express-session |
| **Styling** | Responsive CSS, SASS |

## Project Structure

```
grocery-finder/
├── server.js             # Express backend entry point
├── mongo/                # MongoDB schemas/models
├── public/
│   ├── js/               # Frontend JavaScript
│   └── css/              # Stylesheets (SASS)
├── views/                # HTML templates
├── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js 11+
- MongoDB

### Setup

```bash
# Clone and install
git clone git@github.com:Kevin-Mok/grocery-finder.git
cd grocery-finder
npm install

# Start MongoDB
mongod

# Run the server
node server.js
```

## Usage

### User Instructions

1. **Login**: Hover profile icon → Login → Enter credentials (user/user)
2. **Add Items**: Click category → Click items to add to cart
3. **Save Cart**: Click floppy disk icon → Name and save
4. **Compare Stores**: Click calculator icon to see best stores

### Admin Instructions

1. Login with admin credentials (admin/admin)
2. Access "Manage Users" from profile dropdown
3. View/modify user accounts (non-admin users only)

## Why This Project is Interesting

### Technical Highlights

1. **Full-Stack Architecture**
   - Express.js REST API backend
   - MongoDB document storage
   - Session-based authentication

2. **User Experience**
   - Responsive design with mobile support
   - Cart persistence across sessions
   - Visual price/distance comparison

3. **Admin System**
   - Role-based access control
   - User management dashboard
   - Protected admin routes

4. **Data Management**
   - Mongoose ODM for MongoDB
   - CRUD operations for carts
   - Filter and sort algorithms

### Skills Demonstrated

- **Backend Development**: Node.js, Express, REST APIs
- **Database**: MongoDB, Mongoose schemas
- **Frontend**: Responsive CSS, JavaScript DOM manipulation
- **Security**: bcrypt hashing, session management
- **Team Collaboration**: University group project

## Credits

CSC309 Winter 2019 course project at University of Toronto.

## Author

[Kevin Mok](https://github.com/Kevin-Mok)
