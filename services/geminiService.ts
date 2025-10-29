import { GoogleGenAI, Type } from "@google/genai";
import type { UserPreferences, PartListResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    parts: {
      type: Type.ARRAY,
      description: 'List of PC components.',
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING, description: 'The type of component (e.g., CPU, GPU, Motherboard).' },
          name: { type: Type.STRING, description: 'The specific model name of the component.' },
          price: { type: Type.NUMBER, description: 'The estimated price of the component.' },
          justification: { type: Type.STRING, description: 'A brief reason for choosing this component.' },
          imageUrl: { type: Type.STRING, description: 'A publicly accessible URL for a representative image of the component.' },
        },
        required: ['category', 'name', 'price', 'justification', 'imageUrl'],
      },
    },
    totalCost: {
      type: Type.NUMBER,
      description: 'The total estimated cost of all components combined.',
    },
    summary: {
      type: Type.STRING,
      description: 'A brief summary of the overall build and its expected performance.',
    },
  },
  required: ['parts', 'totalCost', 'summary'],
};

export const generatePcParts = async (preferences: UserPreferences): Promise<PartListResponse> => {
  const prompt = `
    You are an expert PC builder AI. Based on the user's preferences, create a complete PC parts list.
    User Preferences:
    - Budget: ${preferences.budget} ${preferences.currency}
    - Primary Use Case: ${preferences.useCase}
    - CPU Preference: ${preferences.cpuPreference}
    - GPU Preference: ${preferences.gpuPreference}

    Your task is to generate a compatible list of PC components that fits within the budget.
    The list must include: CPU, Motherboard, Memory (RAM), Storage (SSD), Video Card (GPU), Case, and Power Supply (PSU).
    For each part, provide a brief justification for why it was chosen based on the user's preferences and budget.
    For each part, also provide a 'imageUrl' field with a direct link to a representative image of the product.
    Calculate the total estimated cost.
    Provide a brief overall summary of the build.
    Ensure the total cost is as close as possible to the budget without exceeding it. All prices should be in ${preferences.currency}.
    The 'price' and 'totalCost' fields in the JSON response should be numbers, not strings.
    Return the response ONLY in the specified JSON format. Do not add any markdown formatting like \`\`\`json.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const text = response.text.trim();
    const parsedResponse = JSON.parse(text);
    return parsedResponse as PartListResponse;
    
  } catch (error) {
    console.error("Error generating PC parts:", error);
    throw new Error("Failed to generate PC parts. The AI model might be busy or the request could not be processed. Please try again later.");
  }
};