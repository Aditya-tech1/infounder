module.exports = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    
    // Log headers
    console.log('Headers:', req.headers);
    
    // Log files if present
    if (req.files) {
      console.log('Files:');
      Object.keys(req.files).forEach(key => {
        const files = req.files[key];
        files.forEach(file => {
          console.log(`- Field: ${key}`);
          console.log(`  Name: ${file.originalname}`);
          console.log(`  Type: ${file.mimetype}`);
          console.log(`  Size: ${file.size} bytes`);
        });
      });
    } else {
      console.log('No files in request');
    }
    
    // Safely log body
    if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
      console.log('Body:', req.body);
    } else {
      console.log('No body in request');
    }
    
    next();
  };