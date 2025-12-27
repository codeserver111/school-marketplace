import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Phone, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface VisitBookingFormProps {
  schoolName: string;
  onClose: () => void;
}

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

const VisitBookingForm = ({ schoolName, onClose }: VisitBookingFormProps) => {
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [childGrade, setChildGrade] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const grades = [
    "Play School",
    "Nursery",
    "LKG",
    "UKG",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",
    "Grade 11",
    "Grade 12",
  ];

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Get maximum date (30 days from now)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!parentName.trim() || !phone.trim() || !visitDate || !timeSlot || !childGrade) {
      toast.error("Please fill in all fields");
      return;
    }

    if (phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-8 text-center"
      >
        <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Visit Booked!</h3>
        <p className="text-muted-foreground">
          Your campus visit to {schoolName} is confirmed for {visitDate} at {timeSlot}.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          You will receive a confirmation SMS shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Book Campus Visit</h3>
          <p className="text-sm text-muted-foreground">{schoolName}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="parentName" className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4" />
            Parent Name
          </Label>
          <Input
            id="parentName"
            placeholder="Enter your full name"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
            <Phone className="w-4 h-4" />
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <Label className="mb-2 block">Child's Grade (seeking admission)</Label>
          <Select value={childGrade} onValueChange={setChildGrade}>
            <SelectTrigger>
              <SelectValue placeholder="Select grade" />
            </SelectTrigger>
            <SelectContent>
              {grades.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="visitDate" className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4" />
            Preferred Date
          </Label>
          <Input
            id="visitDate"
            type="date"
            min={getMinDate()}
            max={getMaxDate()}
            value={visitDate}
            onChange={(e) => setVisitDate(e.target.value)}
          />
        </div>

        <div>
          <Label className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4" />
            Preferred Time Slot
          </Label>
          <Select value={timeSlot} onValueChange={setTimeSlot}>
            <SelectTrigger>
              <SelectValue placeholder="Select time slot" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground">
          <p>📍 The school will contact you to confirm your visit</p>
          <p className="mt-1">⏱️ Typical campus tour duration: 45-60 minutes</p>
        </div>

        <Button 
          type="submit" 
          variant="hero" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Booking..." : "Confirm Visit"}
        </Button>
      </form>
    </motion.div>
  );
};

export default VisitBookingForm;
