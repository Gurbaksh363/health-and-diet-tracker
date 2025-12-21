import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Apple,
  Dumbbell,
  BarChart3,
  Bell,
  Target,
  Sparkles,
  Activity,
  Heart,
} from "lucide-react";
import Logo from "@/assets/Logo";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="relative overflow-hidden min-h-screen flex items-center bg-linear-to-br from-background via-primary/5 to-secondary/10"
      >
        {/* Background decoration */}
        <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full opacity-30 blur-3xl bg-primary/20 animate-pulse" />
        <div
          className="absolute bottom-32 left-1/4 w-80 h-80 rounded-full opacity-25 blur-3xl bg-secondary/15 animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32 pb-24 w-full z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="relative animate-fade-in">
              {/* Headline */}
              <div className="mb-6">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-foreground leading-[0.95] tracking-tight mb-4">
                  Fuel Your Best Life
                </h1>

                <div className="relative">
                  <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-[0.95]">
                    Every Day
                  </h2>
                  <div className="absolute -bottom-2 left-0 h-2 w-[60%] bg-gradient-to-r from-primary to-secondary rounded-full" />
                </div>
              </div>

              {/* Subheadline */}
              <p className="text-xl sm:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
                Track nutrition, log workouts, and hit your goals with
                intelligent insights and effortless tracking.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/signup">
                  <button className="group px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                    <span className="flex items-center gap-2">
                      Start Tracking Free
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </Link>

                <button className="px-10 py-5 bg-card text-foreground rounded-2xl font-bold text-lg border-2 border-border shadow-md hover:border-primary/50 hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                  <span className="flex items-center gap-2">
                    <Play className="w-5 h-5 fill-current" />
                    Watch Demo
                  </span>
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-10 flex-wrap">
                {[
                  { value: "50K+", label: "Active Users" },
                  { value: "4.9★", label: "Rating" },
                  { value: "1M+", label: "Workouts" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="hover:scale-110 hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
                  >
                    <p className="text-5xl font-black text-primary mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Dashboard Preview */}
            <div className="relative h-[600px] hidden lg:flex items-center justify-center">
              <div className="bg-card rounded-3xl p-8 border-2 border-primary/30 shadow-2xl w-80 hover:scale-105 hover:-translate-y-2 transition-all duration-500">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles
                    className="w-10 h-10 text-primary-foreground"
                    fill="white"
                    stroke="white"
                    strokeWidth={0}
                  />
                </div>

                <h3 className="text-2xl font-bold text-foreground text-center mb-2">
                  Today's Goals
                </h3>
                <p className="text-muted-foreground text-center text-sm mb-6">
                  Track your macros live
                </p>

                <div className="space-y-4">
                  {[
                    { label: "Protein", value: 85, color: "var(--primary)" },
                    { label: "Carbs", value: 70, color: "var(--secondary)" },
                    { label: "Fats", value: 92, color: "var(--chart-4)" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-foreground/80 font-semibold">
                          {item.label}
                        </span>
                        <span
                          className="font-bold"
                          style={{ color: item.color }}
                        >
                          {item.value}%
                        </span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            background: item.color,
                            width: `${item.value}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative bg-gradient-to-b from-background via-primary/5 to-background py-32 overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/15 blur-3xl opacity-30" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary/10 blur-3xl opacity-15" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6 leading-tight">
              Everything You Need to
              <span className="block mt-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Stay Healthy
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive tools designed to help you reach your fitness goals
              with ease and style
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                icon: Apple,
                title: "Nutrition Tracking",
                desc: "Log meals effortlessly with smart food database and barcode scanner.",
                accentColor: "var(--primary)",
                iconBg: "from-primary/10 to-secondary/10",
                link: "/nutrition",
              },
              {
                icon: Dumbbell,
                title: "Workout Tracking",
                desc: "Track exercises with activity rings and auto-calculated calories.",
                accentColor: "var(--secondary)",
                iconBg: "from-secondary/10 to-primary/10",
                link: "/workouts",
              },
              {
                icon: BarChart3,
                title: "Progress Reports",
                desc: "Beautiful charts and insights to track your fitness journey.",
                accentColor: "var(--chart-4)",
                iconBg: "from-chart-4/10 to-primary/10",
                link: "/reports",
              },
              {
                icon: Bell,
                title: "Smart Reminders",
                desc: "Never miss a meal or workout with intelligent notifications.",
                accentColor: "var(--primary)",
                iconBg: "from-primary/10 to-secondary/10",
                link: "/settings",
              },
              {
                icon: Target,
                title: "Goal Setting",
                desc: "Set personalized goals and celebrate your achievements.",
                accentColor: "var(--secondary)",
                iconBg: "from-secondary/10 to-primary/10",
                link: "/#progress",
              },
              {
                icon: Sparkles,
                title: "Customization",
                desc: "Personalize units, theme, and preferences to match your style.",
                accentColor: "var(--chart-4)",
                iconBg: "from-chart-4/10 to-secondary/10",
                link: "/settings",
              },
            ].map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div key={feature.title} className="group">
                  <Link to={feature.link}>
                    <div className="relative h-full bg-card/70 backdrop-blur-md p-8 lg:p-10 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                      {/* Icon */}
                      <div
                        className={`inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br ${feature.iconBg} group-hover:scale-110 transition-transform duration-300`}
                        style={{ color: feature.accentColor }}
                      >
                        <IconComponent className="w-8 h-8" strokeWidth={2.5} />
                      </div>

                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-base mb-6">
                        {feature.desc}
                      </p>

                      {/* Arrow */}
                      <div
                        className="flex items-center gap-2 font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300"
                        style={{ color: feature.accentColor }}
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Screenshot */}
      <section className="py-24 bg-gradient-to-br from-muted to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              Your Personal Health Dashboard
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track everything in one beautiful, intuitive interface
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Dashboard Preview Card */}
            <div className="bg-linear-to-br from-primary/10 via-card to-accent/10 rounded-2xl p-8 shadow-2xl border border-border">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    Today's Overview
                  </h3>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {/* Calories In */}
                <div className="bg-card rounded-xl p-5 shadow-sm border border-border hover:shadow-md transition-shadow">
                  <div className="text-sm text-muted-foreground mb-1">
                    Calories In
                  </div>
                  <div className="text-3xl font-bold bg-linear-to-r from-chart-4 to-destructive bg-clip-text text-transparent">
                    1,850
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    from nutrition
                  </div>
                </div>

                {/* Calories Out */}
                <div className="bg-card rounded-xl p-5 shadow-sm border border-border hover:shadow-md transition-shadow">
                  <div className="text-sm text-muted-foreground mb-1">
                    Calories Out
                  </div>
                  <div className="text-3xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                    420
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    from workouts
                  </div>
                </div>

                {/* Remaining */}
                <div className="bg-card rounded-xl p-5 shadow-sm border border-border hover:shadow-md transition-shadow">
                  <div className="text-sm text-muted-foreground mb-1">
                    Remaining
                  </div>
                  <div className="text-3xl font-bold text-foreground">640</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    to reach goal
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-muted-foreground font-medium">
                    Daily Progress
                  </span>
                  <span className="font-bold text-foreground">89%</span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                    style={{ width: "89%" }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>0</span>
                  <span>Target: 2,000 kcal</span>
                </div>
              </div>

              {/* Bottom Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {/* Streak */}
                <div className="bg-linear-to-br from-chart-4 to-destructive rounded-xl p-5 text-white shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-sm font-medium">Streak</span>
                  </div>
                  <div className="text-3xl font-bold">12</div>
                  <div className="text-xs opacity-90">days in a row!</div>
                </div>

                {/* Weekly Progress */}
                <div className="bg-linear-to-br from-accent to-secondary rounded-xl p-5 text-white shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5" />
                    <span className="text-sm font-medium">This Week</span>
                  </div>
                  <div className="text-3xl font-bold">86%</div>
                  <div className="text-xs opacity-90">goal completion</div>
                </div>
              </div>
            </div>

            {/* Additional Mini Cards */}
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-card rounded-xl p-4 shadow-sm border border-border text-center hover:shadow-md transition-shadow">
                <div className="text-2xl font-bold text-primary mb-1">
                  8,432
                </div>
                <div className="text-sm text-muted-foreground">Steps Today</div>
              </div>
              <div className="bg-card rounded-xl p-4 shadow-sm border border-border text-center hover:shadow-md transition-shadow">
                <div className="text-2xl font-bold text-secondary mb-1">
                  2.5L
                </div>
                <div className="text-sm text-muted-foreground">
                  Water Intake
                </div>
              </div>
              <div className="bg-card rounded-xl p-4 shadow-sm border border-border text-center hover:shadow-md transition-shadow">
                <div className="text-2xl font-bold text-destructive mb-1">
                  -0.7kg
                </div>
                <div className="text-sm text-muted-foreground">This Week</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Why Choose Us */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              Why Choose FitMind?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands who've transformed their health with our platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: "Goal-Oriented",
                desc: "Set and track personalized health goals",
              },
              {
                icon: Sparkles,
                title: "AI-Powered",
                desc: "Smart recommendations based on your data",
              },
              {
                icon: Bell,
                title: "Smart Reminders",
                desc: "Never miss a meal or workout",
              },
              {
                icon: BarChart3,
                title: "Detailed Analytics",
                desc: "Beautiful charts and progress reports",
              },
            ].map((benefit) => {
              const IconComponent = benefit.icon;
              return (
                <div key={benefit.title} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10">
                    <IconComponent
                      className="w-8 h-8 text-primary"
                      strokeWidth={2.5}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section
        id="progress"
        className="py-24 bg-gradient-to-br from-muted to-background"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Track Your Progress
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Visualize your journey with beautiful charts and insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                value: "92%",
                label: "Weekly Consistency",
                trend: "+12%",
                color: "from-primary to-accent",
              },
              {
                value: "-2.3kg",
                label: "Weight Progress",
                trend: "This month",
                color: "from-chart-4 to-destructive",
              },
              {
                value: "1,247",
                label: "Total Workouts",
                trend: "+45 this week",
                color: "from-secondary to-accent",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-card rounded-2xl p-8 border border-border shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div
                  className={`text-5xl font-bold bg-linear-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                >
                  {stat.value}
                </div>
                <div className="text-foreground font-semibold mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-primary font-medium">
                  {stat.trend}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-chart-4/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Start Your Health Journey Today
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
              Join thousands of users achieving their fitness goals with
              FitMind.
            </p>
            <Link to="/signup">
              <button className="px-10 py-6 bg-card text-accent rounded-full hover:bg-muted shadow-2xl text-lg font-bold hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                Start Tracking Free
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-foreground via-accent to-foreground text-primary-foreground py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Logo className="w-10 h-10 text-primary fill-[#06D6A0]" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                  FitMind
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Your personal companion for a healthier lifestyle.
              </p>
            </div>

            {[
              {
                title: "Product",
                links: [
                  { label: "Features", to: "/features" },
                  { label: "FAQ", to: "/faq" },
                  { label: "About", to: "/about" }
                ],
              },
              {
                title: "Legal",
                links: [
                  { label: "Privacy", to: "/privacy" },
                  { label: "Terms", to: "/terms" },
                  { label: "Contact", to: "/contact" },
                ],
              }, 
              {
                title: "Team Members",
                links: [
                  {label: "Gurbaksh Kaur", to: "https://github.com/gurbaksh363"},
                  {label: "Abhishek Kumar Mandal", to: "https://iamabhi.dev"},
                  {label: "Alok Kumar", to: "https://whoisalok.tech"},
                ]
              }
            ].map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold mb-4 text-primary-foreground">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-muted-foreground/20 pt-8 text-center">
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              &copy; 2025 FitMind. All rights reserved. Made with{" "}
              <Heart className="w-4 h-4 text-primary fill-primary" /> for your
              health.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
