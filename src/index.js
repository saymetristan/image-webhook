const express = require('express');
const imageRoutes = require('./routes/imageRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/images', imageRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
