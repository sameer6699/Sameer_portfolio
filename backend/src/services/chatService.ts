import axios from 'axios';

export const callOpenAI = async (messages: { role: string; content: string }[]) => {
  const API_URL = 'https://api.openai.com/v1/chat/completions';
  const API_KEY = process.env.OPENAI_API_KEY;
  const MODEL = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

  if (!API_KEY) {
    throw new Error('OpenAI API KEY not set in environment variables.');
  }

  const payload = {
    model: MODEL,
    messages,
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  };

  try {
    const response = await axios.post(API_URL, payload, { headers });
    return response.data.choices?.[0]?.message?.content || response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // OpenAI API error details
      const apiError = error.response?.data?.error;
      const message = apiError?.message || error.message;
      const type = apiError?.type || 'OpenAI API Error';
      console.error(`[OpenAI API Error] Type: ${type}, Message: ${message}`);
      throw new Error(`OpenAI API Error: ${message}`);
    } else {
      console.error('[OpenAI Error]', error);
      throw new Error('Unexpected error occurred while communicating with OpenAI API.');
    }
  }
}; 