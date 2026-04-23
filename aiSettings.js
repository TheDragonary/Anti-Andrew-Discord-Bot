// Change to a different URL if not using Chutes, examples are shown below
// https://llm.chutes.ai/v1
// https://openrouter.ai/api/v1
// http://localhost:5001/v1
const baseURL = "http://localhost:5001/v1";

// If using a different online AI service, change this to your API key stored in ".env"
// Examples: process.env.CHUTES_API_KEY, process.env.OPENROUTER_API_KEY
// If using local AI, change this to "0", although it doesn't really matter and you can leave it as-is
const apiKey = 0

// If using koboldcpp, change ALL of these to "koboldcpp"
// For vision to work locally, download the correct mmproj from https://huggingface.co/koboldcpp/mmproj/tree/main
// Example: If you are using a model based on Llama3, download the one that says Llama3, then you would insert it into Loaded Files > Vision mmproj
const gptModel = "koboldcpp";
const gptimageModel = "koboldcpp";

module.exports = { baseURL, apiKey, gptModel, gptimageModel };