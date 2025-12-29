import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, ChevronRight, MapPin, DollarSign, GraduationCap, Heart } from "lucide-react";
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
    description: "3-5 years old, first school experience",
    icon: "👶",
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
    description: "6-8 years old, Classes 1-3",
    icon: "📚",
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
    description: "Moving from another school",
    icon: "🚚",
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
    description: "Classes 8-12, board exams preparation",
    icon: "🎓",
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
  { label: `💰 Budget-Friendly (Under ${formatMonthlyFee(100000)}/month average)*`, value: "0-100000" },
  { label: `💵 Standard Range (${formatMonthlyFee(100000)} - ${formatMonthlyFee(200000)}/month average)*`, value: "100000-200000" },
  { label: `💳 Premium (${formatMonthlyFee(200000)} - ${formatMonthlyFee(300000)}/month average)*`, value: "200000-300000" },
  { label: `🏆 Elite Schools (${formatMonthlyFee(300000)} - ${formatMonthlyFee(500000)}/month average)*`, value: "300000-500000" },
  { label: `👑 Top-Tier (Above ${formatMonthlyFee(500000)}/month average)*`, value: "500000-1000000" },
  { label: "🤔 Not Sure - Show All Options", value: "0-1000000" },
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
  { label: "Delhi - Hauz Khas", value: "Hauz Khas, Delhi" },
  { label: "Delhi - Malviya Nagar", value: "Malviya Nagar, Delhi" },
  { label: "Delhi - Defence Colony", value: "Defence Colony, Delhi" },
  { label: "Delhi - Paschim Vihar", value: "Paschim Vihar, Delhi" },
  { label: "Delhi - Janakpuri", value: "Janakpuri, Delhi" },
  { label: "Delhi - Pitampura", value: "Pitampura, Delhi" },
  { label: "Delhi - Shalimar Bagh", value: "Shalimar Bagh, Delhi" },
  { label: "Delhi - Rajouri Garden", value: "Rajouri Garden, Delhi" },
  { label: "Delhi - Punjabi Bagh", value: "Punjabi Bagh, Delhi" },
  { label: "Delhi - Patel Nagar", value: "Patel Nagar, Delhi" },
];

const academicOptions: ChatOption[] = [
  { label: "Excellent", value: "Excellent" },
  { label: "Above Average", value: "Above Average" },
  { label: "Average", value: "Average" },
  { label: "Below Average", value: "Below Average" },
  { label: "🤔 Not Sure Yet", value: "skip" },
];

// Define which steps are user interaction steps (counted in progress)
const userInteractionSteps: ChatStep[] = [
  "child_name",
  "child_age",
  "target_class",
  "board",
  "location",
  "budget",
  "academics"
];

const formatFeeRange = (min: number, max: number): string => {
  const monthlyMin = Math.round(min / 12);
  const monthlyMax = Math.round(max / 12);

  if (monthlyMin >= 100000 && monthlyMax >= 100000) {
    return `₹${(monthlyMin / 100000).toFixed(1)}L - ₹${(monthlyMax / 100000).toFixed(1)}L`;
  } else if (monthlyMin >= 1000 && monthlyMax >= 1000) {
    return `₹${(monthlyMin / 1000).toFixed(0)}K - ₹${(monthlyMax / 1000).toFixed(0)}K`;
  } else {
    return `₹${monthlyMin.toLocaleString()} - ₹${monthlyMax.toLocaleString()}`;
  }
};

// Define which steps show the chat header
const chatModeSteps: ChatStep[] = [
  "chat_started",
  "child_name",
  "child_age",
  "target_class",
  "board",
  "location",
  "budget",
  "academics",
  "complete"
];

const stepQuestions: Record<ChatStep, string> = {
  intro: "👋 Hello! I'm your Admission Assistant. I'll help you find the perfect school for your child in just a few steps. Let's get started!",
  profile_templates: "Choose a profile that matches your child's situation, or select 'Custom' to enter details manually:",
  custom_profile: "No worries! Let's collect the details step by step.",
  child_name: "What is your child's name?",
  child_age: "How old is your child? (e.g., 4 years or 4.5)",
  target_class: "Which class are you seeking admission for?",
  board: "Which education board do you prefer?",
  location: "Select your preferred location or use your current location:",
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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    // Set the selected template profile
    setProfile(template.profile);
    onProfileUpdate(template.profile);

    // Transition to chat mode first
    setCurrentStep("chat_started");

    // Add a confirmation message and start the conversation
    setTimeout(() => {
      addBotMessage(`Great! You've selected "${template.title}". What's your child's name?`, []);
      setCurrentStep("child_name");
    }, 300);
  };

  const processStep = (value: string) => {
    addUserMessage(value);

    let updatedProfile = { ...profile };

    switch (currentStep) {
      case "profile_templates":
        // This shouldn't happen as we handle templates separately
        break;

      case "custom_profile":
        setTimeout(() => addBotMessage(stepQuestions.child_name, [], "child_name"), 500);
        break;

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

        // Use smart defaults for class selection based on age
        const suggestedClasses = getSuggestedClassForAge(age);
        const classMessage = age >= 2 && age <= 12
          ? `Based on your child's age, here are the most suitable classes:`
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
        setTimeout(() => addBotMessage("Select your preferred location or use your current location:", locationOptions, "location"), 500);
        break;

      case "location":
        if (value === "current_location") {
          // Handle geolocation
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                updatedProfile.location = `${latitude},${longitude}`;
                updatedProfile.maxDistance = 10;
                setProfile(updatedProfile);
                onProfileUpdate(updatedProfile);
                setTimeout(() => addBotMessage(stepQuestions.budget, budgetOptions, "budget"), 500);
              },
              (error) => {
                console.error("Geolocation error:", error);
                addBotMessage("Couldn't get your location. Please select an area manually.", locationOptions, "location");
              }
            );
          } else {
            addBotMessage("Geolocation is not supported. Please select an area manually.", locationOptions, "location");
          }
        } else {
          updatedProfile.location = value;
          updatedProfile.maxDistance = 10; // Default 10km
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
        if (value === "skip") {
          updatedProfile.academicLevel = "Average"; // Default to average if skipped
          setProfile(updatedProfile);
          onProfileUpdate(updatedProfile);
          setTimeout(() => {
            addBotMessage("No problem! We'll match you with schools suitable for various academic levels. " + stepQuestions.complete, [], "complete");
            setTimeout(() => {
              onComplete(updatedProfile as ChildProfile);
            }, 2000);
          }, 500);
        } else {
          updatedProfile.academicLevel = value as ChildProfile["academicLevel"];
          setProfile(updatedProfile);
          onProfileUpdate(updatedProfile);
          setTimeout(() => {
            addBotMessage(stepQuestions.complete, [], "complete");
            setTimeout(() => {
              onComplete(updatedProfile as ChildProfile);
            }, 1500);
          }, 500);
        }
        break;

      default:
        break;
    }
  };

  // Handle input changes with autocomplete for names
  const handleInputChange = (value: string) => {
    setInputValue(value);

    // Show name suggestions only for child_name step
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
  const showInput = !currentOptions || currentOptions.length === 0;

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-primary/5 to-background">

      {/* Header - Only show during chat mode */}
      {chatModeSteps.includes(currentStep) && (
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
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Loading skeleton */}
        {isLoading && (
          <AnimatePresence mode="popLayout">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={`skeleton-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "flex gap-3",
                  i % 2 === 0 ? "justify-end" : "justify-start"
                )}
              >
                {i % 2 !== 0 && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 bg-muted rounded-full animate-pulse" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3",
                    i % 2 === 0
                      ? "bg-primary"
                      : "bg-card border shadow-sm"
                  )}
                >
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-48 animate-pulse" />
                    {i === 1 && <div className="h-4 bg-muted rounded w-32 animate-pulse" />}
                  </div>
                </div>
                {i % 2 === 0 && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 bg-muted rounded-full animate-pulse" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {/* Actual messages - Only show when in chat mode */}
        {chatModeSteps.includes(currentStep) && (
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
                  {message.options && message.options.length > 0 && currentStep !== "profile_templates" && (
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
        )}

        {/* Profile Templates - Show when selecting templates */}
        {currentStep === "profile_templates" && (
          <div className="p-6">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
                Choose a Profile Template
              </h3>
              <p className="text-sm text-muted-foreground mb-6 text-center">
                Select a template that matches your child's situation, or choose custom to enter details manually.
              </p>
              <div className="space-y-3">
                <div className="grid gap-3">
                  {profileTemplates.map((template) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: profileTemplates.indexOf(template) * 0.1 }}
                    >
                      <Card className="p-4 cursor-pointer hover:shadow-md transition-all border-2 hover:border-primary/50"
                            onClick={() => handleTemplateSelect(template)}>
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{template.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{template.title}</h4>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                <div className="pt-2 border-t">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      // Clear any pre-selected profile data
                      setProfile({});
                      onProfileUpdate({});
                      // Transition to chat mode first
                      setCurrentStep("chat_started");
                      // Add confirmation and start chat
                      setTimeout(() => {
                        addBotMessage("No problem! Let's start fresh. What's your child's name?", []);
                        setCurrentStep("child_name");
                      }, 300);
                    }}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Custom Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Typing indicator */}
        {isTyping && chatModeSteps.includes(currentStep) && (
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
      {showInput && chatModeSteps.includes(currentStep) && (
        <div className="p-4 border-t bg-card">
          {/* Autocomplete Suggestions */}
          {suggestions.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1">
              {suggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs bg-primary/10 hover:bg-primary/20"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                currentStep === "child_name"
                  ? "Type your child's name..."
                  : "Type your answer..."
              }
              className="flex-1"
              disabled={false}
            />
            <Button onClick={handleSend} disabled={!inputValue.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Progress indicator - Only show for user interaction steps */}
      {userInteractionSteps.includes(currentStep) && (
        <div className="px-4 py-2 border-t bg-muted/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Step {userInteractionSteps.indexOf(currentStep) + 1} of {userInteractionSteps.length}</span>
            <div className="flex gap-1">
              {userInteractionSteps.map((step, index) => (
                <div
                  key={step}
                  className={cn(
                    "w-6 h-1 rounded-full transition-colors",
                    index <= userInteractionSteps.indexOf(currentStep)
                      ? "bg-primary"
                      : "bg-border"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
