import axios from 'axios';

const openaiAPI = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export async function getFirstAidInfo(query) {
  try {
    const response = await openaiAPI.post('/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are Blue, a first aid chatbot. Only provide information related to first aid. For severe cases, recommend seeking immediate medical attention." },
        { role: "user", content: query }
      ],
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error getting first aid information:', error);
    return 'I apologize, but I am unable to provide first aid information at the moment. Please seek medical attention if needed.';
  }
}