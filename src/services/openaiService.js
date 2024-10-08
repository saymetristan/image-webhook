const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const processImage = async (imageUrl) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Eres un asistente útil diseñado para generar respuestas en formato JSON."
      },
      {
        role: "user",
        content: [
          { type: "text", text: "Analiza esta imagen de un recibo o factura y extrae la siguiente información en formato JSON: nombre del gasto, monto, fecha, una breve descripción (si está disponible) y una lista de productos con sus nombres y precios." },
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
            },
          },
        ],
      },
    ],
    max_tokens: 300,
    response_format: { type: "json_object" },
    functions: [
      {
        name: "extraer_informacion_recibo",
        description: "Extrae información clave de un recibo o factura",
        parameters: {
          type: "object",
          properties: {
            nombre_gasto: {
              type: "string",
              description: "El nombre o tipo de gasto"
            },
            monto: {
              type: "number",
              description: "El monto total del gasto"
            },
            fecha: {
              type: "string",
              description: "La fecha del gasto en formato YYYY-MM-DD"
            },
            descripcion: {
              type: "string",
              description: "Una breve descripción del gasto (opcional)"
            },
            productos: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  nombre: {
                    type: "string",
                    description: "El nombre del producto"
                  },
                  precio: {
                    type: "number",
                    description: "El precio del producto"
                  }
                },
                required: ["nombre", "precio"]
              },
              description: "Una lista de productos con sus nombres y precios"
            }
          },
          required: ["nombre_gasto", "monto", "fecha"]
        }
      }
    ]
  });

  return JSON.parse(response.choices[0].message.function_call.arguments);
};

module.exports = {
  processImage,
};