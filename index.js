import express from "express";
import bodyParser from "body-parser";
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
