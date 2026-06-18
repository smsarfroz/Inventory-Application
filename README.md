<img width="1515" height="693" alt="image" src="https://github.com/user-attachments/assets/070443ec-047b-4627-8720-5a60bf6cf5a1" />

# Inventory-Application

An inventory management app for repository of competitive programmers on Codeforces!

## Features

- Browse items by category
- Full CRUD operations for both items and categories
- Create new categories and items
- Read and view category and item details
- Update existing items and categories
- Delete items and categories (with safety measures!)
- Category-item relationships with proper constraints

## Tech Stack

- Node.js & Express
- PostgreSQL
- EJS for templating
- Method-override for PUT/DELETE requests

## Database Design

This inventory app features a relational database with:

- Categories table - each category has a name and description
- Items table - each item has a name, description, price, stock quantity, and belongs to a category
- Foreign key constraints ensure data integrity
- Cascading deletes or nullify options depending on your business logic

Example relationships:
- One Category can have many Items
- Each Item belongs to one Category

## Getting Started

1. Clone the repo
2. Run `npm install`
3. Set up your PostgreSQL database
4. Create a `.env` file with your database credentials
5. Run the dummy data script: `npm run seed`
6. Run `npm start`

## Safety Features

- Admin password protection for destructive actions (delete and update)
- Confirmation dialogs before deletion
- Cascading delete logic - decide what happens when deleting categories with items

## What I Learned

- Database design and relationships
- CRUD operations with PostgreSQL
- Route and controller organization
- Form handling and validation
- Data seeding for development
- Protecting routes with passwords
- Deployment strategies for full-stack apps

---

Made with ❤️ as part of The Odin Project curriculum
