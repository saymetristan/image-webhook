const OpenAI = require('openai');

const openai = new OpenAI(process.env.OPENAI_API_KEY);

const processImage = async (imageUrl) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Analiza esta imagen de un recibo o factura y extrae la siguiente información: nombre del gasto, monto, fecha y una breve descripción (si está disponible)." },
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