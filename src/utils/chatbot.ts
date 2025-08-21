// Simple chatbot logic with predefined responses
// This handles the AI bot functionality with mock Q&A

export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatResponse {
  response: string;
  suggestions?: string[];
}

// Predefined responses for common knife store questions
const botResponses: Record<string, ChatResponse> = {
  // Greetings
  'hello': {
    response: "Hello! Welcome to Elite Blade Co. I'm here to help you find the perfect knife. What are you looking for today?",
    suggestions: ['Show me chef knives', 'What\'s your best hunting knife?', 'I need a pocket knife']
  },
  'hi': {
    response: "Hi there! I'm your knife expert assistant. How can I help you find the perfect blade today?",
    suggestions: ['Browse categories', 'Show featured knives', 'Help me choose']
  },
  
  // Product questions
  'chef knife': {
    response: "Our chef knives are perfect for professional and home kitchens. I recommend the Elite Damascus Chef Knife for its exceptional sharpness and beautiful Damascus pattern, or the Classic German Chef Knife for traditional reliability.",
    suggestions: ['Show Damascus knife', 'Compare chef knives', 'What about santoku?']
  },
  'hunting knife': {
    response: "For hunting, our Drop Point Hunter and Professional Skinning Knife are customer favorites. The Drop Point is versatile for field work, while the Skinning Knife excels at processing game.",
    suggestions: ['Show hunting knives', 'What about survival knives?', 'Fixed blade options']
  },
  'pocket knife': {
    response: "Our pocket knives range from tactical EDC folders to classic gentleman's knives. The Tactical EDC Folding Knife is popular for everyday carry, while the Classic Gentleman's Folder offers timeless elegance.",
    suggestions: ['Show pocket knives', 'EDC recommendations', 'Multi-tool options']
  },
  'sharpening': {
    response: "Proper sharpening is crucial for knife maintenance. We recommend whetstones for carbon steel knives and honing steels for regular maintenance. Most of our knives come with care instructions.",
    suggestions: ['Knife care tips', 'Sharpening services', 'Steel types explained']
  },
  
  // Care and maintenance
  'care': {
    response: "Knife care varies by steel type. Stainless steel knives are dishwasher safe but hand washing is preferred. Carbon steel knives should be hand washed, dried immediately, and may develop a protective patina.",
    suggestions: ['Steel types', 'Sharpening guide', 'Storage tips']
  },
  'storage': {
    response: "Store knives in knife blocks, magnetic strips, or blade guards to protect the edges. Avoid storing loose in drawers where blades can get damaged or cause injury.",
    suggestions: ['Knife blocks', 'Magnetic storage', 'Travel cases']
  },
  
  // Shipping and policies
  'shipping': {
    response: "We offer free shipping on orders over $150. Standard shipping takes 3-5 business days, expedited shipping 1-2 days. All knives are securely packaged and require adult signature upon delivery.",
    suggestions: ['Shipping costs', 'International shipping', 'Order tracking']
  },
  'return': {
    response: "We offer a 30-day return policy for unused knives in original packaging. Custom or personalized knives cannot be returned unless defective. Return shipping is free for defective items.",
    suggestions: ['Return process', 'Warranty info', 'Exchanges']
  },
  'age': {
    response: "You must be 18 or older to purchase knives. We verify age at checkout and require adult signature for delivery. Some states have additional restrictions on certain knife types.",
    suggestions: ['Age verification', 'State laws', 'Restricted items']
  },
  
  // General help
  'help': {
    response: "I can help you with product recommendations, care instructions, shipping info, and general knife questions. What would you like to know?",
    suggestions: ['Product recommendations', 'Care instructions', 'Shipping info']
  },
  'choose': {
    response: "To help you choose the right knife, tell me what you'll primarily use it for: cooking, hunting, EDC (everyday carry), outdoor activities, or collecting?",
    suggestions: ['Cooking knives', 'Hunting knives', 'EDC knives', 'Outdoor knives']
  }
};

// Default response for unmatched queries
const defaultResponse: ChatResponse = {
  response: "I'm not sure about that specific question, but I'd be happy to help you with knife recommendations, care tips, or general information. You can also contact our customer service for detailed assistance.",
  suggestions: ['Product recommendations', 'Care instructions', 'Contact support']
};

// Function to get bot response based on user input
export const getBotResponse = (userMessage: string): ChatResponse => {
  const message = userMessage.toLowerCase().trim();
  
  // Check for exact matches first
  if (botResponses[message]) {
    return botResponses[message];
  }
  
  // Check for partial matches
  for (const key in botResponses) {
    if (message.includes(key)) {
      return botResponses[key];
    }
  }
  
  // Return default response if no match found
  return defaultResponse;
};

// Generate unique message ID
export const generateMessageId = (): string => {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Create a new chat message
export const createChatMessage = (message: string, sender: 'user' | 'bot'): ChatMessage => {
  return {
    id: generateMessageId(),
    message,
    sender,
    timestamp: new Date()
  };
};