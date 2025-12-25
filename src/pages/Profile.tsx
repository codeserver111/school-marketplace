import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Phone, 
  Mail, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Edit2,
  Heart,
  MessageSquare,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import LocationHeader from "@/components/LocationHeader";
import BottomNavigation from "@/components/BottomNavigation";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { isLoggedIn, isGuest, user, login, logout, continueAsGuest, savedSchools } = useUser();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const menuItems = [
    { icon: Bell, label: "Notifications", badge: "3" },
    { icon: Shield, label: "Privacy Settings" },
    { icon: HelpCircle, label: "Help & Support" },
  ];

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  const handleLogin = (phone: string) => {
    login(phone);
    setIsLoginOpen(false);
    toast.success("Login successful!");
  };

  const handleContinueAsGuest = () => {
    continueAsGuest();
    toast.success("Continuing as guest");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <LocationHeader location="New Delhi" />

      <div className="px-4 py-6">
        {isLoggedIn ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Profile Header */}
            <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground">{user?.name}</h2>
                  <p className="text-muted-foreground text-sm">Parent</p>
                </div>
                <Button variant="ghost" size="icon">
                  <Edit2 className="w-5 h-5" />
                </Button>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{user?.phone}</span>
                </div>
                {user?.email && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <Link to="/saved" className="bg-card rounded-xl p-4 shadow-card text-center hover:shadow-card-hover transition-shadow">
                <p className="text-2xl font-bold text-primary">{savedSchools.length}</p>
                <p className="text-xs text-muted-foreground">Saved</p>
              </Link>
              <div className="bg-card rounded-xl p-4 shadow-card text-center">
                <p className="text-2xl font-bold text-primary">5</p>
                <p className="text-xs text-muted-foreground">Enquiries</p>
              </div>
              <div className="bg-card rounded-xl p-4 shadow-card text-center">
                <p className="text-2xl font-bold text-primary">3</p>
                <p className="text-xs text-muted-foreground">Visits</p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="bg-card rounded-2xl shadow-card overflow-hidden mb-6">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors border-b border-border last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </button>
              ))}
            </div>

            {/* Logout */}
            <Button
              variant="outline"
              className="w-full gap-2 text-destructive hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Welcome to SchoolFinder
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xs mx-auto">
              Sign in to save schools, track enquiries, and get personalized recommendations
            </p>

            <div className="space-y-3 max-w-xs mx-auto">
              <Sheet open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                <SheetTrigger asChild>
                  <Button variant="hero" size="lg" className="w-full">
                    Login / Sign Up
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-3xl">
                  <LoginForm onSuccess={handleLogin} />
                </SheetContent>
              </Sheet>

              {!isGuest && (
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  onClick={handleContinueAsGuest}
                >
                  Continue as Guest
                </Button>
              )}
            </div>

            {isGuest && (
              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                  <span className="bg-success/20 text-success px-2 py-0.5 rounded text-xs font-medium">
                    Guest Mode
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  You can browse schools and save favorites. Login for full features.
                </p>
              </div>
            )}

            {/* Quick Actions for Guests */}
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/schools" className="bg-card rounded-xl p-4 shadow-card hover:shadow-card-hover transition-shadow text-center">
                  <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Browse Schools</p>
                </Link>
                <Link to="/saved" className="bg-card rounded-xl p-4 shadow-card hover:shadow-card-hover transition-shadow text-center">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Heart className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Saved ({savedSchools.length})</p>
                </Link>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              {menuItems.slice(1).map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-4 bg-card rounded-xl shadow-card hover:shadow-card-hover transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

// Login Form Component
const LoginForm = ({ onSuccess }: { onSuccess: (phone: string) => void }) => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep("otp");
    toast.success("OTP sent to +91 " + phone);
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    onSuccess("+91 " + phone);
  };

  return (
    <div className="p-6">
      {step === "phone" ? (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Login / Sign Up</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Enter your phone number to continue
            </p>
          </div>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
              +91
            </span>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="Enter phone number"
              className="pl-14"
            />
          </div>

          <Button
            onClick={handleSendOtp}
            disabled={isLoading || phone.length !== 10}
            className="w-full"
            size="lg"
          >
            {isLoading ? "Sending..." : "Get OTP"}
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-foreground">Verify OTP</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Enter the 6-digit code sent to +91 {phone}
            </p>
          </div>

          <Input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="Enter OTP"
            className="text-center text-xl tracking-widest font-semibold"
            maxLength={6}
          />

          <Button
            onClick={handleVerifyOtp}
            disabled={isLoading || otp.length !== 6}
            className="w-full"
            size="lg"
          >
            {isLoading ? "Verifying..." : "Verify & Continue"}
          </Button>

          <button
            onClick={() => setStep("phone")}
            className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Change phone number
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Profile;
