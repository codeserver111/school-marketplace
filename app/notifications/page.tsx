"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Bell,
    CalendarCheck,
    Heart,
    Star,
    MessageCircle,
    ArrowLeft,
    CheckCheck,
    Filter,
    Megaphone,
    Briefcase,
    Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LocationHeader from "@/components/LocationHeader";
import BottomNavigation from "@/components/BottomNavigation";

// Mock Data
const allNotifications = [
    {
        id: 1,
        type: "admission",
        title: "Admission Deadline Approaching",
        message: "DPS Vasant Kunj applications for Class 1 close in 3 days. Complete your application now to avoid last-minute rush.",
        time: "2 hours ago",
        unread: true,
        icon: CalendarCheck,
        color: "text-amber-500",
        bgColor: "bg-amber-500/10",
    },
    {
        id: 2,
        type: "favorite",
        title: "New Review on Saved School",
        message: "A parent just posted a detailed 5-star review for Modern School, Barakhamba. See what they have to say about the faculty.",
        time: "5 hours ago",
        unread: true,
        icon: Heart,
        color: "text-rose-500",
        bgColor: "bg-rose-500/10",
    },
    {
        id: 3,
        type: "rating",
        title: "School Rating Updated",
        message: "Springdales School's overall rating has increased to 4.8★ based on recent parent feedback and facility upgrades.",
        time: "1 day ago",
        unread: false,
        icon: Star,
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/10",
    },
    {
        id: 4,
        type: "message",
        title: "Response from School",
        message: "The admission counselor from Delhi Public School has replied to your inquiry about transportation facilities.",
        time: "2 days ago",
        unread: false,
        icon: MessageCircle,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
    },
    {
        id: 5,
        type: "alert",
        title: "Fee Structure Updated",
        message: "The Heritage School has updated their fee structure for the academic session 2026-27.",
        time: "3 days ago",
        unread: false,
        icon: Megaphone,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
    },
    {
        id: 6,
        type: "job",
        title: "Teacher Vacancy Alert",
        message: "New Mathematics teacher position open at Sanskriti School. Check requirements and apply.",
        time: "4 days ago",
        unread: false,
        icon: Briefcase,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
    },
];

const categories = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
    { id: "admission", label: "Admissions" },
    { id: "favorite", label: "Saved Schools" },
    { id: "messages", label: "Messages" }
];

export default function NotificationsPage() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [notifications, setNotifications] = useState(allNotifications);

    const filteredNotifications = notifications.filter(n => {
        if (activeCategory === "all") return true;
        if (activeCategory === "unread") return n.unread;
        if (activeCategory === "messages") return n.type === "message";
        return n.type === activeCategory;
    });

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
    };

    return (
        <div className="min-h-screen bg-background pb-24">
            <LocationHeader location="New Delhi" />

            {/* Header */}
            <div className="sticky top-[72px] z-30 bg-background/80 backdrop-blur-xl border-b border-border/40">
                <div className="max-w-3xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Link href="/">
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/50 -ml-2">
                                    <ArrowLeft className="w-5 h-5" />
                                </Button>
                            </Link>
                            <h1 className="text-xl font-bold">Notifications</h1>
                            <span className="flex items-center justify-center h-5 px-2 text-[10px] font-bold text-primary bg-primary/10 rounded-full">
                                {notifications.filter(n => n.unread).length} New
                            </span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-primary gap-1.5"
                            onClick={markAllAsRead}
                        >
                            <CheckCheck className="w-4 h-4" />
                            <span className="hidden sm:inline">Mark all read</span>
                        </Button>
                    </div>

                    {/* Categories */}
                    <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
                        <Button variant="outline" size="icon" className="rounded-full flex-shrink-0 border-dashed">
                            <Filter className="w-4 h-4 text-muted-foreground" />
                        </Button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${activeCategory === category.id
                                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4 py-6">
                <div className="space-y-4">
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notification, index) => {
                            const Icon = notification.icon;
                            return (
                                <motion.div
                                    key={notification.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => markAsRead(notification.id)}
                                    className={`group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:scale-[1.01] ${notification.unread
                                        ? "bg-gradient-to-br from-background via-background to-primary/5 border-primary/20 shadow-lg shadow-primary/5"
                                        : "bg-card/50 border-white/5 hover:bg-card"
                                        } border`}
                                >
                                    {notification.unread && (
                                        <div className="absolute right-3 top-3 w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    )}

                                    <div className="flex gap-4">
                                        <div className={`w-12 h-12 rounded-2xl ${notification.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                                            <Icon className={`w-6 h-6 ${notification.color}`} />
                                        </div>

                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className={`text-[10px] font-bold uppercase tracking-wider ${notification.unread ? "text-primary" : "text-muted-foreground"}`}>
                                                    {notification.type}
                                                </span>
                                                <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {notification.time}
                                                </span>
                                            </div>

                                            <h3 className={`text-base font-bold leading-tight ${notification.unread ? "text-foreground" : "text-muted-foreground"}`}>
                                                {notification.title}
                                            </h3>

                                            <p className="text-sm text-muted-foreground/80 leading-relaxed">
                                                {notification.message}
                                            </p>

                                            <div className="pt-3 flex gap-2">
                                                <Button size="sm" variant="secondary" className="h-8 text-xs font-semibold bg-muted/50 hover:bg-muted">
                                                    View Details
                                                </Button>
                                                {notification.type === "admission" && (
                                                    <Button size="sm" className="h-8 text-xs font-semibold">
                                                        Apply Now
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mb-4">
                                <Bell className="w-8 h-8 text-muted-foreground/40" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground">No notifications found</h3>
                            <p className="text-muted-foreground text-sm max-w-xs mx-auto mt-2">
                                You don't have any notifications in this category yet.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-6"
                                onClick={() => setActiveCategory("all")}
                            >
                                View all notifications
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <BottomNavigation />
        </div>
    );
}
