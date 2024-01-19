const express = require('express');
const path = require('path');
const fs = require('fs'); // Import the File System module
const app = express();

const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname,'..','..', 'dist', 'gww-trp-app', 'browser');

// Serve static files from the Angular app build directory
// Check if the directory exists
if (fs.existsSync(distPath)) {
    console.log("file ok")
    app.use(express.static(distPath));
} else {
    console.error(`The directory ${distPath} does not exist.`);
}

// All other routes should redirect to the index.html
app.get('*', function(req, res) {
  const filePath = path.join(distPath, 'index.html');

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`File not found with path: ${filePath}`);
      return res.status(404).send('File not found');
    } else {
      // If the file exists, serve it
      res.sendFile(filePath);
    }
  });
});

// Start the app by listening on the default port
app.listen(PORT, function(err){
    if (err) {
        console.error("Error in server setup");
    } else {
        console.log(`Server listening on Port ${PORT}`);
    }
});
