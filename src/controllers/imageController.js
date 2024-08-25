const openaiService = require('../services/openaiService');
const axios = require('axios');

const processImage = async (req, res) => {
  try {
    const { imageUrl, uuid } = req.body;
    const result = await openaiService.processImage(imageUrl);

    // Enviar la respuesta al webhook de Discord
    const webhookUrl = 'https://discord.com/api/webhooks/1274059578975322296/DBIsFvQApxZS1uojZMDy8mVcbnntYriEn89Dp4Ez8HMzz-Z3eSgusoFqWES0nD5w6s0R';
    await axios.post(webhookUrl, {
      content: `Resultado del análisis de la imagen:\nUUID: ${uuid}\nNombre del gasto: ${result.nombre_gasto}\nMonto: ${result.monto}\nFecha: ${result.fecha}\nDescripción: ${result.descripcion || 'N/A'}\nProductos: ${result.productos.map(p => `\n- ${p.nombre}: ${p.precio}`).join('')}`
    });

    res.json({ uuid, ...result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  processImage,
};