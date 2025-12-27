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
      className="mb-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Fee Calculator</h2>
      </div>

      <div className="bg-card rounded-xl p-4 shadow-card">
        {/* Options */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="books" className="flex items-center gap-2 cursor-pointer">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              Books & Stationery
            </Label>
            <Switch
              id="books"
              checked={includeBooks}
              onCheckedChange={setIncludeBooks}
            />
          </div>

          {hasTransport && (
            <div className="flex items-center justify-between">
              <Label htmlFor="transport" className="flex items-center gap-2 cursor-pointer">
                <Bus className="w-4 h-4 text-muted-foreground" />
                School Transport
              </Label>
              <Switch
                id="transport"
                checked={includeTransport}
                onCheckedChange={setIncludeTransport}
              />
            </div>
          )}

          {hasHostel && (
            <div className="flex items-center justify-between">
              <Label htmlFor="hostel" className="flex items-center gap-2 cursor-pointer">
                <Home className="w-4 h-4 text-muted-foreground" />
                Hostel Facility
              </Label>
              <Switch
                id="hostel"
                checked={includeHostel}
                onCheckedChange={setIncludeHostel}
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <Label htmlFor="meals" className="flex items-center gap-2 cursor-pointer">
              <Utensils className="w-4 h-4 text-muted-foreground" />
              Meals Plan
            </Label>
            <Switch
              id="meals"
              checked={includeMeals}
              onCheckedChange={setIncludeMeals}
            />
          </div>
        </div>

        {/* Payment Plan */}
        <div className="mb-4">
          <Label className="mb-2 block text-sm">Payment Plan</Label>
          <Select value={paymentPlan} onValueChange={(v: "annual" | "quarterly" | "monthly") => setPaymentPlan(v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="annual">Annual (Pay Once)</SelectItem>
              <SelectItem value="quarterly">Quarterly (4 Payments)</SelectItem>
              <SelectItem value="monthly">Monthly (12 Payments)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Breakdown */}
        <div className="border-t border-border pt-4 space-y-2">
          {fees.breakdown.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                {item.icon}
                {item.label}
              </span>
              <span className="text-foreground">{formatCurrency(item.amount)}</span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t border-border mt-4 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Total Annual</span>
            <span className="text-lg font-bold text-foreground">{formatCurrency(fees.total)}</span>
          </div>
          {paymentPlan !== "annual" && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {paymentPlan === "quarterly" ? "Per Quarter" : "Per Month"}
              </span>
              <span className="text-primary font-semibold">{formatCurrency(getPaymentAmount())}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FeeCalculator;
