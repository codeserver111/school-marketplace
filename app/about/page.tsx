"use client";

import { motion } from "framer-motion";
import { ArrowLeft, GraduationCap, Star, Users, Shield, Heart, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SchoolTypeComparisonTable from "@/components/SchoolTypeComparisonTable";
import BottomNavigation from "@/components/BottomNavigation";

const About = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border safe-top"
      >
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="font-semibold text-foreground">About SchoolFinder</h1>
          <div className="w-10" />
        </div>
      </motion.header>

      <div className="pt-14 px-4 py-6">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">About SchoolFinder</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Your trusted platform for finding the perfect school for your child.
            We connect parents with top educational institutions across India.
          </p>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Our Mission</h2>
          <div className="bg-card rounded-xl p-6 border border-border">
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              SchoolFinder is dedicated to simplifying the school search process for parents.
              We believe every child deserves access to quality education that matches their
              unique needs, learning style, and family circumstances.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">500+ Schools</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star className="w-6 h-6 text-success" />
                </div>
                <p className="text-xs text-muted-foreground">50K+ Parents</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Why Choose SchoolFinder?</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-sm mb-1">Comprehensive Database</h3>
                  <p className="text-muted-foreground text-xs">
                    Access detailed information about schools, including curriculum, facilities, and reviews.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-sm mb-1">Verified Information</h3>
                  <p className="text-muted-foreground text-xs">
                    All school data is verified and regularly updated to ensure accuracy.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-sm mb-1">Personalized Matching</h3>
                  <p className="text-muted-foreground text-xs">
                    Our AI-powered matching helps find schools that best fit your child's needs.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-sm mb-1">Expert Guidance</h3>
                  <p className="text-muted-foreground text-xs">
                    Get expert advice and support throughout your school selection journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Compare School Types Section */}
        <SchoolTypeComparisonTable />

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Get Started Today</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Ready to find the perfect school for your child? Start your search now.
          </p>
          <Link href="/">
            <Button className="gap-2">
              <GraduationCap className="w-4 h-4" />
              Browse Schools
            </Button>
          </Link>
        </motion.section>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default About;
