import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: 'YX4FFIBJEfjkSAl6JoEAS5KPjHuQn2ilTkcfpRIk', // reemplaza esto con tu API key real
});

let lastCall = 0;
const cooldown = 5000; // 5 segundos entre llamadas

export async function askCohere(prompt: string): Promise<string> {
  const now = Date.now();
  if (now - lastCall < cooldown) {
    return 'Por favor espera un momento antes de preguntar otra vez.';
  }

  try {
    const response = await cohere.chat({
      message: prompt,
      model: 'command',
      temperature: 0.3,
    });

    lastCall = now;

    if (response.text) {
      return response.text;
    } else {
      return 'No se obtuvo respuesta del asistente.';
    }
  } catch (error: any) {
    return `Error al consultar Cohere: ${error.message || error}`;
  }
}

