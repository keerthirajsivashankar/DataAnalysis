const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs'); // Add fs module
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploads folder

// Serve HTML files
app.get('/client', (req, res) => {
    res.sendFile(path.join(__dirname, 'client.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// File Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // File naming convention
    }
});
const upload = multer({ storage });

// Upload Route
app.post('/upload', upload.single('file'), (req, res) => {
    const { file } = req;
    const { fileType, uploadDate, deadlineDate } = req.body;

    // Here, you can save the metadata and file information to local storage or a database.

    res.json({ message: 'File uploaded successfully', file });
});

// Add this route to fetch uploaded files
app.get('/uploads', (req, res) => {
    const files = fs.readdirSync(path.join(__dirname, 'uploads')).map(file => ({
        originalname: file,
        uploadDate: new Date().toLocaleString(), // You can store the actual upload date in a better way
    }));
    res.json(files);
});

// Start the Server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
