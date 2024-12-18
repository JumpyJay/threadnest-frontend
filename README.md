# ThreadNest Backend

ThreadNest is a Rails API backend that powers the ThreadNest forum platform, handling authentication, threads, comments, and more.

---

## Quick Start

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/threadnest-backend.git
   cd threadnest-backend
   ```

2. Install dependencies:

   ```bash
   bundle install
   ```

3. Set up the database:

   ```bash
   rails db:create db:migrate db:seed
   ```

4. Start the Rails server:
   ```bash
   rails server
   ```

---

## Features

- Token-based user authentication.
- CRUD operations for threads and comments.
- RESTful API for frontend integration.

---

## Technologies Used

- **Ruby on Rails** - API development framework.
- **PostgreSQL** - Database for data storage.
