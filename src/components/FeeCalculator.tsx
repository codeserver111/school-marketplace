import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, IndianRupee, Bus, Home, BookOpen, Utensils } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FeeCalculatorProps {
  baseFee: number;
  hasTransport: boolean;
  hasHostel: boolean;
}

const FeeCalculator = ({ baseFee, hasTransport, hasHostel }: FeeCalculatorProps) => {
  const [includeTransport, setIncludeTransport] = useState(false);
  const [includeHostel, setIncludeHostel] = useState(false);
  const [includeMeals, setIncludeMeals] = useState(false);
  const [includeBooks, setIncludeBooks] = useState(true);
  const [paymentPlan, setPaymentPlan] = useState<"annual" | "quarterly" | "monthly">("annual");

  const fees = useMemo(() => {
    let total = baseFee;
    const breakdown: { label: string; amount: number; icon: React.ReactNode }[] = [
      { label: "Tuition Fee", amount: baseFee, icon: <BookOpen className="w-4 h-4" /> },
    ];

    if (includeBooks) {
      const booksFee = Math.round(baseFee * 0.08); // 8% of base fee
      total += booksFee;
      breakdown.push({ label: "Books & Stationery", amount: booksFee, icon: <BookOpen className="w-4 h-4" /> });
    }

    if (includeTransport && hasTransport) {
      const transportFee = 45000; // Fixed transport fee
      total += transportFee;
      breakdown.push({ label: "Transport", amount: transportFee, icon: <Bus className="w-4 h-4" /> });
    }

    if (includeHostel && hasHostel) {
      const hostelFee = 150000; // Fixed hostel fee
      total += hostelFee;
      breakdown.push({ label: "Hostel", amount: hostelFee, icon: <Home className="w-4 h-4" /> });
    }

    if (includeMeals) {
      const mealsFee = 36000; // Fixed meals fee
      total += mealsFee;
      breakdown.push({ label: "Meals Plan", amount: mealsFee, icon: <Utensils className="w-4 h-4" /> });
    }

    return { total, breakdown };
  }, [baseFee, includeTransport, includeHostel, includeMeals, includeBooks, hasTransport, hasHostel]);

  const getPaymentAmount = () => {
    switch (paymentPlan) {
      case "annual":
        return fees.total;
      case "quarterly":
        return Math.round(fees.total / 4);
      case "monthly":
        return Math.round(fees.total / 12);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Calculator className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-black text-foreground tracking-tight uppercase">Tuition Prognosis</h2>
      </div>

      <div className="glass rounded-[2.5rem] p-8 shadow-premium border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full -mr-10 -mt-10" />

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            { id: "books", label: "Academic Resources", icon: BookOpen, checked: includeBooks, setter: setIncludeBooks, description: "Standard curriculum materials" },
            { id: "transport", label: "Elite Transport", icon: Bus, checked: includeTransport, setter: setIncludeTransport, description: "Premium AC transit services", hidden: !hasTransport },
            { id: "hostel", label: "Luxury Residence", icon: Home, checked: includeHostel, setter: setIncludeHostel, description: "On-campus premium housing", hidden: !hasHostel },
            { id: "meals", label: "Nutritional Plan", icon: Utensils, checked: includeMeals, setter: setIncludeMeals, description: "Curated organic menu" },
          ].map((option) => !option.hidden && (
            <div key={option.id} className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 border border-white/5 hover:bg-muted/30 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <option.icon className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <Label htmlFor={option.id} className="text-xs font-black uppercase tracking-widest cursor-pointer block">{option.label}</Label>
                  <span className="text-[9px] font-medium text-muted-foreground">{option.description}</span>
                </div>
              </div>
              <Switch
                id={option.id}
                checked={option.checked}
                onCheckedChange={option.setter}
                className="data-[state=checked]:bg-indigo-500"
              />
            </div>
          ))}
        </div>

        {/* Payment Plan */}
        <div className="mb-8 p-6 rounded-[2rem] bg-background/40 border border-white/5">
          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4 block">Select Disbursement Model</Label>
          <Select value={paymentPlan} onValueChange={(v: "annual" | "quarterly" | "monthly") => setPaymentPlan(v)}>
            <SelectTrigger className="h-12 rounded-[1rem] border-white/10 glass bg-transparent text-[10px] font-black uppercase tracking-widest">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-dark border-white/10">
              <SelectItem value="annual">Lump Sum (Annual)</SelectItem>
              <SelectItem value="quarterly">Periodic (Quarterly)</SelectItem>
              <SelectItem value="monthly">Incremental (Monthly)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Breakdown */}
        <div className="space-y-4 mb-8">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-2">Financial Breakdown</h3>
          <div className="space-y-2">
            {fees.breakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors">
                <span className="flex items-center gap-3 text-xs font-bold text-foreground/70">
                  <div className="w-2 h-2 rounded-full bg-indigo-500/40" />
                  {item.label}
                </span>
                <span className="text-sm font-black text-foreground tracking-tight">{formatCurrency(item.amount)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="relative overflow-hidden bg-foreground text-background rounded-[2rem] p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -mr-10 -mt-10" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Total Yearly Investment</span>
            <span className="text-3xl font-black tracking-tighter">{formatCurrency(fees.total)}</span>
          </div>

          {paymentPlan !== "annual" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex items-center justify-between pt-4 border-t border-background/10 relative z-10"
            >
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
                {paymentPlan === "quarterly" ? "Quarterly Installment" : "Monthly Installment"}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                <span className="text-xl font-black tracking-tighter text-indigo-400">{formatCurrency(getPaymentAmount())}</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FeeCalculator;
