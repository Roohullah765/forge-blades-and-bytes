// AI Chatbot floating button and modal (bottom-right)
// This provides customer support with predefined responses

import { useState } from 'react';
import { Bot, Send, X, MinusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getBotResponse, createChatMessage, type ChatMessage } from '@/utils/chatbot';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    createChatMessage(
      "Hello! I'm your knife expert assistant. I can help you find the perfect blade, answer care questions, or provide product recommendations. How can I help you today?",
      'bot'
    )
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = createChatMessage(inputValue.trim(), 'user');
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input
    const messageText = inputValue.trim();
    setInputValue('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate thinking delay (1-2 seconds)
    const thinkingDelay = Math.random() * 1000 + 500;
    
    setTimeout(() => {
      // Get bot response
      const response = getBotResponse(messageText);
      const botMessage = createChatMessage(response.response, 'bot');
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, thinkingDelay);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  // Get latest bot message for suggestions
  const latestBotMessage = messages
    .filter(msg => msg.sender === 'bot')
    .pop();

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-accent hover:bg-accent-glow text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 focus-ring"
          aria-label="Open AI chat assistant"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
          >
            <Bot className="w-6 h-6" />
          </motion.div>
        </Button>
      </motion.div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
            >
              <Card className="shadow-2xl border-2 border-border/50">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border bg-accent/5">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Knife Expert Assistant</h3>
                      <p className="text-xs text-muted-foreground">Online now</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="w-8 h-8"
                      onClick={() => setIsOpen(false)}
                    >
                      <MinusCircle className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="w-8 h-8"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="h-80 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                            message.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {message.message}
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="bg-muted text-muted-foreground max-w-xs px-3 py-2 rounded-lg text-sm">
                          <motion.div
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            Thinking...
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </ScrollArea>

                {/* Quick Suggestions */}
                {latestBotMessage && getBotResponse(latestBotMessage.message).suggestions && (
                  <div className="px-4 py-2 border-t border-border bg-muted/20">
                    <p className="text-xs text-muted-foreground mb-2">Quick responses:</p>
                    <div className="flex flex-wrap gap-1">
                      {getBotResponse(latestBotMessage.message).suggestions?.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-6 px-2"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex space-x-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about knives, care, shipping..."
                      className="flex-1 text-sm"
                      disabled={isTyping}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      size="icon"
                      className="shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;