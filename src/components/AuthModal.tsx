"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Phone,
    Lock,
    User,
    Mail,
    ArrowRight,
    Sparkles,
    CheckCircle2,
    AlertCircle,
    ShieldCheck,
    ChevronLeft,
    Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: "login" | "signup";
}

type AuthMode = "login" | "signup" | "forgot-password";

const AuthModal = ({ isOpen, onClose, initialMode = "login" }: AuthModalProps) => {
    const { login, signup, resetPassword, continueAsGuest } = useUser();
    const [mode, setMode] = useState<AuthMode>(initialMode);
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone || !password) {
            toast.error("Please fill in all fields");
            return;
        }
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            login(phone, password);
            setIsLoading(false);
            onClose();
            toast.success("Welcome back!");

        }, 1500);
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !phone || !email || !password || !dob) {
            toast.error("Please fill in all fields");
            return;
        }
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            signup(name, phone, email, dob);
            setIsLoading(false);
            onClose();
            toast.success("Account created successfully!");
        }, 1500);
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone) {
            toast.error("Please enter your phone number");
            return;
        }
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            resetPassword(phone);
            setIsLoading(false);
            toast.success("Reset link sent to your phone!");
            setMode("login");
        }, 1500);
    };

    const handleDemoLogin = () => {
        setPhone("+91 99999 99999");
        setPassword("password123");
        toast.info("Demo credentials filled!");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-[440px] bg-[#1a1a2e] overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/10"
            >
                {/* Background Mesh Gradients */}
                <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
                    <div className="absolute top-[-20%] left-[-20%] w-[100%] h-[100%] bg-primary/20 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-[-20%] right-[-20%] w-[100%] h-[100%] bg-accent/20 rounded-full blur-[100px] animate-pulse-slow" />
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20"
                >
                    <X className="w-5 h-5 text-white/80" />
                </button>

                <div className="p-8 sm:p-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={mode}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                {mode !== "login" && (
                                    <button
                                        onClick={() => setMode("login")}
                                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4 text-white" />
                                    </button>
                                )}
                                <div>
                                    <h2 className="text-3xl font-black text-white tracking-tight">
                                        {mode === "login" ? "Welcome Back" : mode === "signup" ? "Get Started" : "Reset Password"}
                                    </h2>
                                    <p className="text-white/60 font-medium text-sm mt-1">
                                        {mode === "login" ? "Find the best schools for your child" : mode === "signup" ? "Create your account in seconds" : "Enter your mobile to recover account"}
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={mode === "login" ? handleLogin : mode === "signup" ? handleSignup : handleForgotPassword} className="space-y-4">
                                {mode === "signup" && (
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-white/60 uppercase tracking-widest ml-1">Full Name</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                                <User className="w-5 h-5 text-white/40 group-focus-within:text-primary transition-colors" />
                                            </div>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Rahul Sharma"
                                                className="w-full h-14 bg-white/10 border border-white/20 rounded-2xl pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-white/40"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/60 uppercase tracking-widest ml-1">Mobile Number</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                            <Phone className="w-5 h-5 text-white/40 group-focus-within:text-primary transition-colors" />
                                        </div>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="+91 98765 43210"
                                            className="w-full h-14 bg-white/10 border border-white/20 rounded-2xl pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-white/40"
                                        />
                                    </div>
                                </div>

                                {mode === "signup" && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-white/60 uppercase tracking-widest ml-1">Email Address</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                                    <Mail className="w-5 h-5 text-white/40 group-focus-within:text-primary transition-colors" />
                                                </div>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="rahul@example.com"
                                                    className="w-full h-14 bg-white/10 border border-white/20 rounded-2xl pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-white/40"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-white/60 uppercase tracking-widest ml-1">Date of Birth</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                                    <Calendar className="w-5 h-5 text-white/40 group-focus-within:text-primary transition-colors" />
                                                </div>
                                                <input
                                                    type="date"
                                                    value={dob}
                                                    onChange={(e) => setDob(e.target.value)}
                                                    className="w-full h-14 bg-white/10 border border-white/20 rounded-2xl pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-white/40 opacity-100"
                                                    style={{ colorScheme: "dark" }}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {mode !== "forgot-password" && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center px-1">
                                            <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Password</label>
                                            {mode === "login" && (
                                                <button
                                                    type="button"
                                                    onClick={() => setMode("forgot-password")}
                                                    className="text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                                                >
                                                    Forgot?
                                                </button>
                                            )}
                                        </div>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                                <Lock className="w-5 h-5 text-white/40 group-focus-within:text-primary transition-colors" />
                                            </div>
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="w-full h-14 bg-white/10 border border-white/20 rounded-2xl pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-white/40"
                                            />
                                        </div>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-14 rounded-2xl bg-primary hover:bg-primary-dark text-white font-black text-lg shadow-xl shadow-primary/20 group relative overflow-hidden"
                                >
                                    <AnimatePresence mode="wait">
                                        {isLoading ? (
                                            <motion.div
                                                key="loading"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center gap-2"
                                            >
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Processing...
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="text"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center gap-2"
                                            >
                                                {mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Reset Password"}
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Button>
                            </form>

                            {mode === "login" && (
                                <div className="mt-6 space-y-4">
                                    <div className="relative py-2">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-white/10"></div>
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-[#1a1a2e] px-4 text-white/40 font-bold tracking-widest">Or continue with</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={handleDemoLogin}
                                            className="flex items-center justify-center gap-2 h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/80 font-bold text-sm"
                                        >
                                            <ShieldCheck className="w-4 h-4 text-success" />
                                            Demo Login
                                        </button>
                                        <button
                                            onClick={() => {
                                                continueAsGuest();
                                                onClose();
                                                toast.success("Welcome, Guest!");
                                            }}
                                            className="flex items-center justify-center gap-2 h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/80 font-bold text-sm"
                                        >
                                            <User className="w-4 h-4 text-accent" />
                                            As Guest
                                        </button>
                                    </div>
                                </div>
                            )}

                            <p className="text-center mt-8 text-white/40 text-sm font-medium">
                                {mode === "login" ? "Don't have an account?" : "Already have an account?"}
                                <button
                                    onClick={() => setMode(mode === "login" ? "signup" : "login")}
                                    className="ml-2 text-white font-bold hover:text-primary transition-colors"
                                >
                                    {mode === "login" ? "Sign up now" : "Sign in here"}
                                </button>
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthModal;
