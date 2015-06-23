// Serve static files
app.use(express.static(path.join(__dirname, 'public'))); 

// NEW: Handle requests for a single book
app.get('/books/:id', function(req, res){
  res.send('The details of book ' + req.params.id + ' should go here');
});

// NEW: Handle request for a list of all books
app.get('/books', function(req, res){
  res.send('A list of books should go here');
});

// Route for everything else.
app.get('*', function(req, res){
  res.send('Hello World');
});