import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, ChevronRight, MapPin, DollarSign, GraduationCap, Heart, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ProfileTemplateSkeleton, Skeleton } from "@/components/ui/skeleton";
import { ChatMessage, ChatOption, ChildProfile } from "@/types/admission";
import { cn } from "@/lib/utils";

interface AdmissionChatProps {
  onComplete: (profile: ChildProfile) => void;
  onProfileUpdate: (profile: Partial<ChildProfile>) => void;
}

type ChatStep =
  | "intro"
  | "profile_templates"
  | "chat_started"
  | "custom_profile"
  | "child_name"
  | "child_age"
  | "target_class"
  | "board"
  | "location"
  | "budget"
  | "academics"
  | "complete";

interface ProfileTemplate {
  id: string;
  title: string;
  description: string;
  icon: string;
  profile: Partial<ChildProfile>;
  color: string;
}

// Utility function to format fees
const formatMonthlyFee = (annualAmount: number): string => {
  const monthly = Math.round(annualAmount / 12);
  if (monthly >= 100000) { // 1L and above
    return `₹${(monthly / 100000).toFixed(1)}L`;
  } else if (monthly >= 1000) { // 1K and above
    return `₹${(monthly / 1000).toFixed(0)}K`;
  } else {
    return `₹${monthly.toLocaleString()}`;
  }
};

// Smart defaults based on age
const getSuggestedClassForAge = (age: number): ChatOption[] => {
  if (age >= 2 && age <= 3) {
    return [
      { label: "Play Group", value: "Play Group" },
      { label: "Nursery (Age 3+)", value: "Nursery" },
    ];
  } else if (age >= 3 && age <= 4) {
    return [
      { label: "Nursery", value: "Nursery" },
      { label: "LKG (Age 4+)", value: "LKG" },
    ];
  } else if (age >= 4 && age <= 5) {
    return [
      { label: "LKG", value: "LKG" },
      { label: "UKG (Age 5+)", value: "UKG" },
    ];
  } else if (age >= 5 && age <= 6) {
    return [
      { label: "UKG", value: "UKG" },
      { label: "Class 1 (Age 6+)", value: "Class 1" },
    ];
  } else if (age >= 6 && age <= 12) {
    const classNum = age - 5; // Rough estimate: age 6 = class 1, age 7 = class 2, etc.
    return [
      { label: `Class ${classNum}`, value: `Class ${classNum}` },
      { label: `Class ${classNum + 1} (Next Year)`, value: `Class ${classNum + 1}` },
    ];
  } else {
    return classOptions.slice(8, 12); // Classes 6-10 for older kids
  }
};

const profileTemplates: ProfileTemplate[] = [
  {
    id: "preschool",
    title: "Starting Preschool",
    description: "3-5 years old, first school",
    icon: "👶",
    color: "from-pink-500 to-rose-500",
    profile: {
      age: 4,
      targetClass: "Nursery",
      board: "CBSE",
      academicLevel: "Average",
    }
  },
  {
    id: "primary",
    title: "Primary School",
    description: "Classes 1-5, building foundation",
    icon: "📚",
    color: "from-blue-500 to-cyan-500",
    profile: {
      age: 7,
      targetClass: "Class 2",
      board: "CBSE",
      academicLevel: "Above Average",
    }
  },
  {
    id: "transfer",
    title: "School Transfer",
    description: "Moving cities or schools",
    icon: "🚚",
    color: "from-purple-500 to-indigo-500",
    profile: {
      age: 9,
      targetClass: "Class 4",
      board: "CBSE",
      academicLevel: "Above Average",
    }
  },
  {
    id: "senior",
    title: "Senior Classes",
    description: "Classes 8-12, career focus",
    icon: "🎓",
    color: "from-amber-500 to-orange-500",
    profile: {
      age: 14,
      targetClass: "Class 9",
      board: "CBSE",
      academicLevel: "Excellent",
    }
  },
];

const boardOptions: ChatOption[] = [
  { label: "CBSE", value: "CBSE" },
  { label: "ICSE", value: "ICSE" },
  { label: "IB", value: "IB" },
  { label: "State Board", value: "State Board" },
];

// Popular Indian names for autocomplete
const popularNames = [
  "Aarav", "Vihaan", "Vivaan", "Ananya", "Diya", "Saanvi", "Pari", "Anika",
  "Navya", "Aryan", "Dhruv", "Kabir", "Arjun", "Reyansh", "Mohammed", "Riya",
  "Aadhya", "Sai", "Advait", "Ansh", "Arnav", "Ishaan", "Myra", "Sara",
  "Aryan", "Aarush", "Krishna", "Vedant", "Atharv", "Pranav", "Aditya", "Vivaan"
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
  { label: `💰 Budget-Friendly (<${formatMonthlyFee(100000)}/mo)`, value: "0-100000" },
  { label: `💵 Standard (${formatMonthlyFee(100000)}-${formatMonthlyFee(200000)}/mo)`, value: "100000-200000" },
  { label: `💳 Premium (${formatMonthlyFee(200000)}-${formatMonthlyFee(300000)}/mo)`, value: "200000-300000" },
  { label: `🏆 Elite (${formatMonthlyFee(300000)}+/mo)`, value: "300000-500000" },
];

const locationOptions: ChatOption[] = [
  { label: "📍 Use My Location", value: "current_location" },
  { label: "Delhi - Connaught Place", value: "Connaught Place, Delhi" },
  { label: "Delhi - Karol Bagh", value: "Karol Bagh, Delhi" },
  { label: "Delhi - Lajpat Nagar", value: "Lajpat Nagar, Delhi" },
  { label: "Delhi - Rohini", value: "Rohini, Delhi" },
  { label: "Delhi - Dwarka", value: "Dwarka, Delhi" },
  { label: "Delhi - Vasant Kunj", value: "Vasant Kunj, Delhi" },
  { label: "Delhi - South Extension", value: "South Extension, Delhi" },
  { label: "Delhi - Greater Kailash", value: "Greater Kailash, Delhi" },
  { label: "Delhi - Saket", value: "Saket, Delhi" },
];

const academicOptions: ChatOption[] = [
  { label: "🌟 Excellent", value: "Excellent" },
  { label: "📈 Above Average", value: "Above Average" },
  { label: "📊 Average", value: "Average" },
  { label: "📝 Below Average", value: "Below Average" },
  { label: "🤔 Not Sure Yet", value: "skip" },
];

// Define which steps are user interaction steps (counted in progress)
const userInteractionSteps: ChatStep[] = [
  "child_name", "child_age", "target_class", "board", "location", "budget", "academics"
];

const chatModeSteps: ChatStep[] = [
  "chat_started", "child_name", "child_age", "target_class", "board", "location", "budget", "academics", "complete"
];

const stepQuestions: Record<ChatStep, string> = {
  intro: "👋 Hello! I'm your Admission Assistant. I'll help you find the perfect school for your child in just a few steps. Let's get started!",
  profile_templates: "Choose a profile that matches your child's situation, or select 'Custom' to enter details manually:",
  chat_started: "Let's get started with your school search!",
  custom_profile: "No worries! Let's collect the details step by step.",
  child_name: "What is your child's name?",
  child_age: "How old is your child? (e.g., 4 years or 4.5)",
  target_class: "Which class are you seeking admission for?",
  board: "Which education board do you prefer?",
  location: "Select your preferred location or use your current location:",
  budget: "What's your annual fee budget estimate?",
  academics: "How would you rate your child's current academic performance?",
  complete: "Perfect! I've gathered all the information needed. Let me find the best matching schools for you! ✨",
};

export default function AdmissionChat({ onComplete, onProfileUpdate }: AdmissionChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState<ChatStep>("intro");
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [profile, setProfile] = useState<Partial<ChildProfile>>({});
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Start directly with profile templates for better UX
    setCurrentStep("profile_templates");
    setIsLoading(false);
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
      if (step) {
        setCurrentStep(step);
      }
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

  const handleTemplateSelect = (template: ProfileTemplate) => {
    setProfile(template.profile);
    onProfileUpdate(template.profile);
    setCurrentStep("chat_started");
    setTimeout(() => {
      addBotMessage(`Great choice! You've selected "${template.title}". What's your child's name?`, [], "child_name");
      setCurrentStep("child_name");
    }, 400);
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
        const suggestedClasses = getSuggestedClassForAge(age);
        const classMessage = age >= 2 && age <= 12
          ? `Based on age ${age}, here are suitable classes:`
          : "Which class are you seeking admission for?";
        setTimeout(() => addBotMessage(classMessage, suggestedClasses, "target_class"), 500);
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
        setTimeout(() => addBotMessage(stepQuestions.location, locationOptions, "location"), 500);
        break;

      case "location":
        if (value === "current_location") {
          // Mock geo location for now
          updatedProfile.location = "Current Location";
          updatedProfile.maxDistance = 10;
          setProfile(updatedProfile);
          onProfileUpdate(updatedProfile);
          setTimeout(() => addBotMessage(stepQuestions.budget, budgetOptions, "budget"), 500);
        } else {
          updatedProfile.location = value;
          updatedProfile.maxDistance = 10;
          setProfile(updatedProfile);
          onProfileUpdate(updatedProfile);
          setTimeout(() => addBotMessage(stepQuestions.budget, budgetOptions, "budget"), 500);
        }
        break;

      case "budget":
        const [min, max] = value.split("-").map(Number);
        updatedProfile.budget = { min: min || 0, max: max || 500000 };
        setProfile(updatedProfile);
        onProfileUpdate(updatedProfile);
        setTimeout(() => addBotMessage(stepQuestions.academics, academicOptions, "academics"), 500);
        break;

      case "academics":
        const finalProfile = { ...updatedProfile };
        if (value !== "skip") {
          finalProfile.academicLevel = value as ChildProfile["academicLevel"];
        } else {
          finalProfile.academicLevel = "Average";
        }
        setProfile(finalProfile);
        onProfileUpdate(finalProfile);

        setTimeout(() => {
          addBotMessage(stepQuestions.complete, [], "complete");
          setTimeout(() => {
            onComplete(finalProfile as ChildProfile);
          }, 2000);
        }, 500);
        break;

      default:
        break;
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (currentStep === "child_name" && value.length >= 2) {
      const filteredNames = popularNames
        .filter(name => name.toLowerCase().startsWith(value.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filteredNames);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setSuggestions([]);
    inputRef.current?.focus();
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    processStep(inputValue.trim());
    setInputValue("");
    setSuggestions([]);
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
  const showInput = chatModeSteps.includes(currentStep) && (!currentOptions || currentOptions.length === 0);

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-indigo-200 dark:scrollbar-thumb-slate-700">

        {/* Profile Templates Selection */}
        {currentStep === "profile_templates" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/50 backdrop-blur-md shadow-lg mb-4">
                <Wand2 className="w-8 h-8 text-indigo-600 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                How can I help you today?
              </h3>
              <p className="text-muted-foreground">
                Choose a quick start profile or create a custom one.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {profileTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="cursor-pointer group"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className={`
                    h-full bg-gradient-to-br ${template.color} p-[1px] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300
                  `}>
                    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm h-full rounded-2xl p-5 flex flex-col items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${template.color} bg-opacity-10 text-white shadow-md`}>
                        <span className="text-2xl drop-shadow-sm">{template.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-lg">{template.title}</h4>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                      <div className="mt-auto pt-2 flex items-center text-xs font-semibold uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-900 dark:from-gray-400 dark:to-gray-100 opacity-60 group-hover:opacity-100 transition-opacity">
                        Select <ChevronRight className="w-3 h-3 ml-1" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-sm text-muted-foreground hover:text-primary underline decoration-dotted underline-offset-4"
              onClick={() => {
                setProfile({});
                onProfileUpdate({});
                addBotMessage("No problem! Let's start from scratch. What's your child's name?", [], "child_name");
                setCurrentStep("child_name");
              }}
            >
              Start specific search manually
            </motion.button>
          </motion.div>
        )}

        {/* Chat Messages */}
        {chatModeSteps.includes(currentStep) && (
          <div className="flex flex-col gap-6 pb-20">
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  layout
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg mt-1">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <div className={cn(
                    "relative px-5 py-3.5 shadow-sm",
                    message.role === "user"
                      ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl rounded-tr-sm shadow-indigo-500/20"
                      : "bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/20 dark:border-white/10 text-foreground rounded-2xl rounded-tl-sm"
                  )}>
                    <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>

                    {/* Chat Options */}
                    {message.role === "assistant" && message.options && message.options.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {message.options.map((option, idx) => (
                          <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            key={option.value}
                            onClick={() => handleOptionClick(option)}
                            className="bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 border border-indigo-100 dark:border-indigo-900/30 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105 hover:shadow-md text-indigo-700 dark:text-indigo-300"
                          >
                            {option.label}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5 border border-white/20">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      {showInput && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-4 bg-white/40 dark:bg-black/20 backdrop-blur-lg border-t border-white/20 dark:border-white/5 absolute bottom-0 left-0 right-0 z-20"
        >
          {suggestions.length > 0 && (
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
              {suggestions.map((sg, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(sg)}
                  className="flex-shrink-0 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs rounded-full border border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 transition-colors"
                >
                  {sg}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2 items-center bg-white dark:bg-slate-800 rounded-full px-2 py-2 shadow-lg border border-indigo-100 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
            <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0 ml-1">
              <User className="w-4 h-4 text-indigo-500" />
            </div>
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your answer here..."
              className="flex-1 bg-transparent border-0 focus:ring-0 text-sm px-2 text-foreground placeholder:text-muted-foreground outline-none h-9"
              autoFocus
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="rounded-full w-9 h-9 p-0 bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all disabled:opacity-50 disabled:shadow-none"
            >
              <Send className="w-4 h-4 text-white" />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
