// src/components/ChatBot/faqApi.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // FastAPI running locally

export const askFAQ = async (userQuery) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ask`, {
      query: userQuery,
    });

    return response.data.answer || "Sorry, I don't understand the question.";
  } catch (error) {
    console.error("FAQ Bot API error:", error);
    return "Sorry, something went wrong. Please try again later.";
  }
};

