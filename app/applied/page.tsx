"use client";

import { motion } from "framer-motion";
import { FileText, Calendar, CheckCircle2, Bot, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LocationHeader from "@/components/LocationHeader";
import BottomNavigation from "@/components/BottomNavigation";
import { schools } from "@/data/mockSchools";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock data for applications
const mockApplications = [
    {
        schoolId: "1", // Delhi Public School
        status: "AI_ADMISSION",
        appliedDate: "2025-01-10",
        applicationStatus: "Under Review",
        applicationId: "APP-2025-001"
    },
    {
        schoolId: "3", // Sanskriti School
        status: "MANUAL",
        appliedDate: "2025-01-08",
        applicationStatus: "Documents Verified",
        applicationId: "APP-2025-045"
    },
    {
        schoolId: "5", // The Shri Ram School
        status: "AI_ADMISSION",
        appliedDate: "2025-01-05",
        applicationStatus: "Shortlisted",
        applicationId: "APP-2025-089"
    }
];

export default function AppliedSchools() {
    // Merge school data with application data
    const appliedSchools = mockApplications.map(app => {
        const school = schools.find(s => s.id === app.schoolId);
        return {
            ...app,
            school
        };
    }).filter(item => item.school); // Ensure school exists

    return (
        <div className="min-h-screen bg-background pb-20">
            <LocationHeader location="New Delhi" />

            <div className="px-4 py-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">My Applications</h1>
                <p className="text-muted-foreground">
                    Track your school application status
                </p>
            </div>

            <div className="px-4 space-y-4">
                {appliedSchools.map((item, index) => (
                    <motion.div
                        key={item.applicationId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-card rounded-2xl border border-border p-4 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                    >
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4 z-10">
                            <Badge
                                variant={item.status === 'AI_ADMISSION' ? "default" : "secondary"}
                                className={cn(
                                    "flex items-center gap-1.5 px-3 py-1",
                                    item.status === 'AI_ADMISSION'
                                        ? "bg-gradient-to-r from-primary to-rose-500 hover:from-primary hover:to-rose-500 border-none text-white shadow-lg shadow-primary/20"
                                        : "bg-secondary text-secondary-foreground"
                                )}
                            >
                                {item.status === 'AI_ADMISSION' ? (
                                    <>
                                        <Bot className="w-3.5 h-3.5" />
                                        AI Admission
                                    </>
                                ) : (
                                    <>
                                        <FileText className="w-3.5 h-3.5" />
                                        Manual
                                    </>
                                )}
                            </Badge>
                        </div>

                        <div className="flex gap-4">
                            {/* School Image */}
                            <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                                <Image
                                    src={item.school?.images[0] || ""}
                                    alt={item.school?.name || ""}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-foreground truncate pr-20">
                                    {item.school?.name}
                                </h3>
                                <p className="text-muted-foreground text-sm truncate mb-3">
                                    {item.school?.address}, {item.school?.city}
                                </p>

                                <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        Applied: {new Date(item.appliedDate).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-primary font-medium">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        {item.applicationStatus}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Bar */}
                        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between gap-3">
                            <div className="text-xs text-muted-foreground font-mono">
                                ID: {item.applicationId}
                            </div>
                            <Button size="sm" variant="outline" className="ml-auto">
                                View Details
                            </Button>
                        </div>

                        {/* Decorative Gradient for AI Admissions */}
                        {item.status === 'AI_ADMISSION' && (
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        )}
                    </motion.div>
                ))}
            </div>

            <BottomNavigation />
        </div>
    );
}
