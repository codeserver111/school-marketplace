import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChatMessage, ChatOption, ChildProfile } from "@/types/admission";
import { cn } from "@/lib/utils";

interface AdmissionChatProps {
  onComplete: (profile: ChildProfile) => void;
  onProfileUpdate: (profile: Partial<ChildProfile>) => void;
}

type ChatStep = 
  | "intro"
  | "child_name"
  | "child_age"
  | "target_class"
  | "board"
  | "location"
  | "budget"
  | "academics"
  | "complete";

const boardOptions: ChatOption[] = [
  { label: "CBSE", value: "CBSE" },
  { label: "ICSE", value: "ICSE" },
  { label: "IB", value: "IB" },
  { label: "State Board", value: "State Board" },
];

const classOptions: ChatOption[] = [
  { label: "Play Group", value: "Play Group" },
  { label: "Nursery", value: "Nursery" },
  { label: "LKG", value: "LKG" },
  { label: "UKG", value: "UKG" },
  { label: "Class 1", value: "Class 1" },
  { label: "Class 2", value: "Class 2" },
  { label: "Class 3", value: "Class 3" },
  { label: "Class 4", value: "Class 4" },
  { label: "Class 5", value: "Class 5" },
  { label: "Class 6", value: "Class 6" },
];

const budgetOptions: ChatOption[] = [
  { label: "Under ₹1 Lakh", value: "0-100000" },
  { label: "₹1L - ₹2L", value: "100000-200000" },
  { label: "₹2L - ₹3L", value: "200000-300000" },
  { label: "₹3L - ₹5L", value: "300000-500000" },
  { label: "Above ₹5L", value: "500000-1000000" },
];

const academicOptions: ChatOption[] = [
  { label: "Excellent", value: "Excellent" },
  { label: "Above Average", value: "Above Average" },
  { label: "Average", value: "Average" },
  { label: "Below Average", value: "Below Average" },
];

const stepQuestions: Record<ChatStep, string> = {
  intro: "👋 Hello! I'm your Admission Assistant. I'll help you find the perfect school for your child in just a few steps. Let's get started!",
  child_name: "What is your child's name?",
  child_age: "How old is your child? (e.g., 4 years or 4.5)",
  target_class: "Which class are you seeking admission for?",
  board: "Which education board do you prefer?",
  location: "What's your location or preferred area? (e.g., Vasant Kunj, Delhi)",
  budget: "What's your annual fee budget?",
  academics: "How would you rate your child's current academic performance?",
  complete: "Perfect! I've gathered all the information needed. Let me find the best matching schools for you! ✨",
};

export default function AdmissionChat({ onComplete, onProfileUpdate }: AdmissionChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState<ChatStep>("intro");
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [profile, setProfile] = useState<Partial<ChildProfile>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial message
    addBotMessage(stepQuestions.intro, [], "intro");
    setTimeout(() => {
      addBotMessage(stepQuestions.child_name, [], "child_name");
    }, 1500);
  }, []);

  const addBotMessage = (content: string, options: ChatOption[] = [], step?: ChatStep) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const newMessage: ChatMessage = {
        id: `msg_${Date.now()}`,
        role: "assistant",
        content,
        timestamp: new Date().toISOString(),
        options: options.length > 0 ? options : undefined,
      };
      setMessages(prev => [...prev, newMessage]);
      if (step) setCurrentStep(step);
    }, 800);
  };

  const addUserMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const processStep = (value: string) => {
    addUserMessage(value);
    
    let updatedProfile = { ...profile };

    switch (currentStep) {
      case "child_name":
        updatedProfile.name = value;
        setProfile(updatedProfile);
        onProfileUpdate(updatedProfile);
        setTimeout(() => addBotMessage(stepQuestions.child_age, [], "child_age"), 500);
        break;

      case "child_age":
        const age = parseFloat(value.replace(/[^0-9.]/g, ""));
        updatedProfile.age = age;
        const today = new Date();
        const dob = new Date(today.getFullYear() - Math.floor(age), today.getMonth(), 1);
        updatedProfile.dateOfBirth = dob.toISOString().split("T")[0];
        setProfile(updatedProfile);
        onProfileUpdate(updatedProfile);
        setTimeout(() => addBotMessage(stepQuestions.target_class, classOptions, "target_class"), 500);
        break;

      case "target_class":
        updatedProfile.targetClass = value;
        updatedProfile.currentClass = value;
        setProfile(updatedProfile);
        onProfileUpdate(updatedProfile);
        setTimeout(() => addBotMessage(stepQuestions.board, boardOptions, "board"), 500);
        break;

      case "board":
        updatedProfile.board = value;
        setProfile(updatedProfile);
        onProfileUpdate(updatedProfile);
        setTimeout(() => addBotMessage(stepQuestions.location, [], "location"), 500);
        break;

      case "location":
        updatedProfile.location = value;
        updatedProfile.maxDistance = 10; // Default 10km
        setProfile(updatedProfile);
        onProfileUpdate(updatedProfile);
        setTimeout(() => addBotMessage(stepQuestions.budget, budgetOptions, "budget"), 500);
        break;

      case "budget":
        const [min, max] = value.split("-").map(Number);
        updatedProfile.budget = { min: min || 0, max: max || 500000 };
        setProfile(updatedProfile);
        onProfileUpdate(updatedProfile);
        setTimeout(() => addBotMessage(stepQuestions.academics, academicOptions, "academics"), 500);
        break;

      case "academics":
        updatedProfile.academicLevel = value as ChildProfile["academicLevel"];
        setProfile(updatedProfile);
        onProfileUpdate(updatedProfile);
        setTimeout(() => {
          addBotMessage(stepQuestions.complete, [], "complete");
          setTimeout(() => {
            onComplete(updatedProfile as ChildProfile);
          }, 1500);
        }, 500);
        break;

      default:
        break;
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    processStep(inputValue.trim());
    setInputValue("");
  };

  const handleOptionClick = (option: ChatOption) => {
    processStep(option.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const currentOptions = messages[messages.length - 1]?.options;
  const showInput = !currentOptions || currentOptions.length === 0;

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-primary/5 to-background">
      {/* Header */}
      <div className="p-4 border-b bg-card">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Admission Assistant</h3>
            <p className="text-xs text-muted-foreground">AI-powered school matching</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border shadow-sm"
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                
                {/* Options */}
                {message.options && message.options.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.options.map((option) => (
                      <Button
                        key={option.value}
                        variant="outline"
                        size="sm"
                        className="bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-secondary-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-card border rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {showInput && currentStep !== "complete" && (
        <div className="p-4 border-t bg-card">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your answer..."
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={!inputValue.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Progress indicator */}
      <div className="px-4 py-2 border-t bg-muted/50">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Step {Object.keys(stepQuestions).indexOf(currentStep) + 1} of 8</span>
          <div className="flex gap-1">
            {Object.keys(stepQuestions).map((step, index) => (
              <div
                key={step}
                className={cn(
                  "w-6 h-1 rounded-full transition-colors",
                  index <= Object.keys(stepQuestions).indexOf(currentStep)
                    ? "bg-primary"
                    : "bg-border"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
