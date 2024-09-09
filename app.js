const express = require('express');
const app = express();
const PORT = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files from the "public" folder
app.use(express.static('public'));

// Parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Store posts in an array
let posts = [];

// Home route - Display posts
app.get('/', (req, res) => {
    res.render('index', { posts });
});

// Route to handle form submission (creating a new post)
app.post('/add-post', (req, res) => {
    const { title, content } = req.body;
    posts.push({ title, content });
    res.redirect('/');
});

// Route to handle deleting a post
app.post('/delete-post/:id', (req, res) => {
    const postId = req.params.id;
    posts.splice(postId, 1); // Remove post based on the index
    res.redirect('/');
});

// Route to show the edit page for a specific post
app.get('/edit-post/:id', (req, res) => {
    const postId = req.params.id;
    const post = posts[postId]; // Get the post based on the index
    res.render('edit', { post, postId });
});

// Route to handle updating a post
app.post('/update-post/:id', (req, res) => {
    const postId = req.params.id;
    posts[postId].title = req.body.title;
    posts[postId].content = req.body.content;
    res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
