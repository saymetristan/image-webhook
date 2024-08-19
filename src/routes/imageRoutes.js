const express = require('express');
const multer = require('multer');
const imageController = require('../controllers/imageController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), imageController.processImage);

module.exports = router;