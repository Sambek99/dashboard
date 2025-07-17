import { useState } from 'react';
import { askCohere } from '../functions/CohereAssistant';

export default function AssistantUI() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAsk = async () => {
    const result = await askCohere(question);
    setAnswer(result);
  };

  return (
    <div>
      <h3>Asistente del Clima</h3>
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="¿Qué deseas saber del clima?"
      />
      <button onClick={handleAsk}>Preguntar</button>
      <p><strong>Respuesta:</strong> {answer}</p>
    </div>
  );
}
