# Blog Manager Application

## Description  
The Blog Manager is a simple web application that allows users to create, edit, and delete blog posts. Users can interact with a dynamic interface to manage posts efficiently. The app uses Express.js and EJS for server-side rendering and provides a clean, user-friendly interface.

---

## Why Use This Tool?  
1. **User-Friendly**: Simple and intuitive UI for managing blog posts.  
2. **Dynamic Content**: Leverages EJS templates to render dynamic views.  
3. **Lightweight**: Minimal dependencies and easy setup make it accessible for developers and users.  

---

## Features  
- **Create Blog Posts**: Users can add new posts with a title and content.  
- **Edit Blog Posts**: Modify existing posts directly from the interface.  
- **Delete Blog Posts**: Remove unwanted posts with a simple click.  

---

## Drawbacks  
- **In-Memory Storage**: Posts are stored in memory, meaning all data is lost when the server restarts.  
- **No Authentication**: Currently, the app lacks user authentication or role-based access.  
- **Limited Styling**: Basic design might not suit production environments.  

---

## Architecture  

### 1. **Frontend**  
The frontend is built using EJS templates for server-side rendering. Each view is responsible for displaying and handling different operations on blog posts.

#### File: `index.ejs`  
Displays a list of all blog posts with options to edit or delete.
```html
<h1>Blog Posts</h1>
<div>
    <% posts.forEach(post => { %>
        <div>
            <h2><%= post.title %></h2>
            <p><%= post.content %></p>
            <a href="/edit/<%= post.id %>">Edit</a>
            <form action="/delete/<%= post.id %>" method="POST" style="display:inline;">
                <button type="submit">Delete</button>
            </form>
        </div>
    <% }); %>
</div>
<a href="/new">Create New Post</a>
```

#### File: `new-post.ejs`  
Form for creating a new post.
```html
<h1>Create a New Post</h1>
<form action="/new" method="POST">
    <label for="title">Title</label>
    <input type="text" id="title" name="title" required>
    <label for="content">Content</label>
    <textarea id="content" name="content" required></textarea>
    <button type="submit">Submit</button>
</form>
<a href="/">Back to Home</a>
```

#### File: `edit-post.ejs`  
Form for editing an existing post.
```html
<h1>Edit Post</h1>
<form action="/edit/<%= post.id %>" method="POST">
    <label for="title">Title</label>
    <input type="text" id="title" name="title" value="<%= post.title %>" required>
    <label for="content">Content</label>
    <textarea id="content" name="content" required><%= post.content %></textarea>
    <button type="submit">Update</button>
</form>
<a href="/">Back to Home</a>
```

### 2. **Backend**  
The backend is powered by Express.js and handles routing and in-memory data storage.

#### File: `index.js`  
Key Routes:
- **GET `/`**: Displays all posts.
- **GET `/new`**: Renders the form for creating a new post.
- **POST `/new`**: Adds a new post to the in-memory storage.
- **GET `/edit/:id`**: Renders the form for editing an existing post.
- **POST `/edit/:id`**: Updates the specified post.
- **POST `/delete/:id`**: Deletes the specified post.

```javascript
// Sample posts data (in-memory storage)
let posts = [];

// Routes
app.get('/', (req, res) => {
    res.render('index', { posts });
});

app.get('/new', (req, res) => {
    res.render('new-post');
});

app.post('/new', (req, res) => {
    const { title, content } = req.body;
    posts.push({ id: posts.length + 1, title, content });
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    res.render('edit-post', { post });
});

app.post('/edit/:id', (req, res) => {
    const { title, content } = req.body;
    const post = posts.find(p => p.id === parseInt(req.params.id));
    post.title = title;
    post.content = content;
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id !== parseInt(req.params.id));
    res.redirect('/');
});
```

---

## How to Install  

1. Clone the repository:  
   ```bash
   git clone https://github.com/NicholasBkume/blog-manager.git
   cd blog-manager
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Run the server:  
   ```bash
   node index.js
   ```

4. Open your browser and navigate to:  
   ```
   http://localhost:3000
   ```

---

## Contributing  

1. Fork the repository.  
2. Create a feature branch:  
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:  
   ```bash
   git commit -m 'feat: Add new feature'
   ```
4. Push to your branch:  
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.  

---

## Authors  
**Nicholas Kume**  
[GitHub Profile](https://github.com/NicholasBkume)  

---

## License  
This project is licensed under the MIT License.
