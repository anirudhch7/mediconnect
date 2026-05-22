const { callLLM } = require('./llmService');
const { chatbotSystemPrompt } = require('../utils/promptTemplates');
const ChatLog = require('../models/ChatLog');

const processChat = async (sessionId, patientId, userMessage) => {
    // Find or create session
    let chatLog = await ChatLog.findOne({ sessionId });
    
    if (!chatLog) {
        chatLog = new ChatLog({ sessionId, patientId, messages: [] });
    }
    
    // Add user message
    chatLog.messages.push({ role: 'user', content: userMessage });
    
    // Build conversation history for LLM context
    let conversationContext = "Conversation History:\n";
    chatLog.messages.slice(-5).forEach(m => {
        conversationContext += `${m.role}: ${m.content}\n`;
    });
    
    // Call LLM
    const prompt = `User's latest message: ${userMessage}\n\n${conversationContext}`;
    const aiResponse = await callLLM(prompt, chatbotSystemPrompt);
    
    // Add assistant response
    chatLog.messages.push({ role: 'assistant', content: aiResponse });
    await chatLog.save();
    
    return aiResponse;
};

module.exports = { processChat };
