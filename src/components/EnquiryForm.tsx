import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface EnquiryFormProps {
  schoolName: string;
  onClose?: () => void;
}

type Step = "phone" | "otp" | "details" | "success";

const EnquiryForm = ({ schoolName, onClose }: EnquiryFormProps) => {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    setIsLoading(true);
    // Simulate API call
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
    setStep("details");
  };

  const handleSubmit = async () => {
    if (!name.trim() || !grade.trim()) {
      toast.error("Please fill in all details");
      return;
    }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep("success");
  };

  return (
    <div className="p-6">
      <AnimatePresence mode="wait">
        {step === "phone" && (
          <motion.div
            key="phone"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Request Callback</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Get a call from {schoolName}
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
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Send OTP
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </motion.div>
        )}

        {step === "otp" && (
          <motion.div
            key="otp"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
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
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Verify
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>

            <button
              onClick={() => setStep("phone")}
              className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Change phone number
            </button>
          </motion.div>
        )}

        {step === "details" && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-foreground">Almost there!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Tell us a bit about your child
              </p>
            </div>

            <div className="space-y-3">
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Parent's name"
              />
              <Input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="Looking for grade (e.g., Class 5)"
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isLoading || !name.trim() || !grade.trim()}
              variant="hero"
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Submit Request
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-success-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Request Submitted!</h3>
            <p className="text-sm text-muted-foreground mb-6">
              {schoolName} will call you within 24 hours
            </p>
            <Button onClick={onClose} variant="secondary" className="w-full">
              Done
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnquiryForm;
