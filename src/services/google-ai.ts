'use client';

import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_AI_KEY });

export async function AIRequest(prompt: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt
  });

  return extractFirstJsonObject(response.text || '');
}

function extractFirstJsonObject(text: string): any | null {
  try {
    // Remove Markdown code block wrappers
    const cleanedText = text.replace(/```json|```/g, '').trim();

    // Try direct parsing first
    try {
      return JSON.parse(cleanedText);
    } catch {
      console.log('JSON parsing failed:', cleanedText);
    }

    // Fallback: try to extract the first full JSON object manually
    const start = cleanedText.indexOf('{');
    if (start === -1) return null;

    let openBraces = 0;
    let end = -1;

    for (let i = start; i < cleanedText.length; i++) {
      if (cleanedText[i] === '{') openBraces++;
      else if (cleanedText[i] === '}') openBraces--;

      if (openBraces === 0) {
        end = i + 1;
        break;
      }
    }

    if (end !== -1) {
      const jsonString = cleanedText.slice(start, end);

      return JSON.parse(jsonString);
    }

    return null;
  } catch (error) {
    console.error('JSON parsing failed:', error);

    return null;
  }
}
