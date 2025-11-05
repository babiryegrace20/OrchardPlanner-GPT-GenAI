import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage } from "../types";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const alertResponseSchema = {
  type: Type.OBJECT,
  properties: {
    risk: {
      type: Type.STRING,
      enum: ["Low", "Medium", "High"],
      description: "The calculated risk level."
    },
    recommendation: {
      type: Type.STRING,
      description: "A clear, actionable recommendation for the user."
    }
  },
  required: ["risk", "recommendation"]
};

/**
 * Generates a proactive alert based on a user's field log and weather data.
 */
export const generateAlert = async (logText: string, weatherData: string): Promise<{ risk: 'Low' | 'Medium' | 'High'; recommendation: string; }> => {
  const systemInstruction = `You are 'OrchardAI,' an expert agronomist and data analyst for small fruit farms. Your advice must be based only on the provided context (user logs, weather data) and your internal knowledge of horticultural best practices (e.g., pest and disease models). Be concise, clear, and actionable. Always state your confidence level and advise users to consult a local expert for high-stakes decisions. When providing a recommendation, cite the source of your model (e.g., 'Based on the Cornell University model...'). Your response must be a valid JSON object matching the provided schema.`;

  const prompt = `Context: User 'FarmA' has an apple orchard. 
  Weather: ${weatherData}. 
  User Log: '${logText}'. 
  Task: Analyze the user log in the context of the weather forecast to determine the risk of pests or disease. Generate a high-priority alert and recommendation if necessary.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: alertResponseSchema,
        temperature: 0.5,
      },
    });
    
    const jsonText = response.text.trim();
    // In case the model returns markdown with json, extract the json part
    const jsonMatch = jsonText.match(/```json\n([\s\S]*?)\n```/);
    const parsableText = jsonMatch ? jsonMatch[1] : jsonText;
    
    return JSON.parse(parsableText);
  } catch (error) {
    console.error("Gemini API error in generateAlert:", error);
    throw new Error("Failed to get a valid response from the AI model.");
  }
};

/**
 * Gets a response from the AI for the chat assistant.
 */
export const getChatResponse = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  const systemInstruction = `You are 'OrchardAI,' an expert agronomist and data analyst for small fruit farms. Your advice must be based on your internal knowledge of horticultural best practices. Be concise, clear, and actionable. Keep your answers brief and to the point. Include a disclaimer to 'always confirm with your local extension office' when recommending specific actions.`;
  
  const contents = [
    ...history.map(msg => ({
      role: msg.sender === 'user' ? 'user' as const : 'model' as const,
      parts: [{ text: msg.text }]
    })),
    { role: 'user' as const, parts: [{ text: newMessage }] }
  ];

  try {
     const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    // Clean up markdown-like formatting (e.g., asterisks for bolding)
    const cleanedText = response.text.replace(/[*#_`]/g, '');
    return cleanedText;
    
  } catch (error) {
    console.error("Gemini API error in getChatResponse:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
};