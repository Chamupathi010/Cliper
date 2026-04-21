import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

/**
 * Fetches an image from a URL and converts it to a base64 string for Gemini.
 * @param {string} url 
 * @returns {Promise<{data: string, mimeType: string}>}
 */
const fetchImageAsBase64 = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
    
    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "image/jpeg";
    
    return {
      inlineData: {
        data: Buffer.from(buffer).toString("base64"),
        mimeType: contentType,
      },
    };
  } catch (error) {
    console.error("Error fetching image for moderation:", error);
    return null;
  }
};

/**
 * Checks if the content (text and optional image) is educational and suitable for a university system.
 * @param {string} title 
 * @param {string} body 
 * @param {string} [imageUrl]
 * @returns {Promise<{isEducational: boolean, reason: string}>}
 */
export const checkIsEducational = async (title, body, imageUrl) => {
  try {
    const prompt = `
      You are a content moderator for a university's question-and-answer platform called "Cliper".
      Your task is to determine if the submitted content (title, body, and optional image) is "Educational" or "Non-Educational".
      
      Educational content includes:
      - Academic subjects (Math, Science, Engineering, Humanities, etc.)
      - University life, administration, and campus facilities
      - Career advice, internships, and professional development
      - Study tips, research, and technical troubleshooting
      
      Non-Educational content includes:
      - General entertainment (movies, music, gaming without academic context)
      - Personal rants, offensive language, or inappropriate imagery
      - Spam, promotional material, or advertisements
      - Random social chatter or off-topic content
      
      Instructions:
      - Analyze the title and body text.
      - If an image is provided, analyze it to ensure it is relevant to the educational context or at least not inappropriate/non-educational.
      - A post is "Non-Educational" if ANY part (title, body, or image) fails the criteria.
      
      Question Title: "${title}"
      Question Body: "${body}"
      
      Respond only with a JSON object in the following format:
      {
        "isEducational": boolean,
        "reason": "Short explanation in one sentence"
      }
    `;

    let contentParts = [prompt];

    if (imageUrl) {
      const imageData = await fetchImageAsBase64(imageUrl);
      if (imageData) {
        contentParts.push(imageData);
      }
    }

    const result = await model.generateContent(contentParts);
    const response = await result.response;
    const text = response.text();

    // Clean potential markdown formatting from AI response
    const cleanedJson = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleanedJson);

    return parsed;
  } catch (error) {
    console.error("Moderation Error:", error);
    // If API fails, we default to allowing the content but logging the error
    return { isEducational: true, reason: "Moderation service temporarily unavailable" };
  }
};
