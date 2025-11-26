import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Play, 
  Apple, 
  Dumbbell, 
  BarChart3, 
  Bell, 
  Target, 
  Sparkles 
} from 'lucide-react';

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section 
        id="home" 
        className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-white via-cyan-50/30 to-teal-50/40"
      >
        {/* Background decoration */}
        <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full opacity-30 blur-3xl bg-[#06D6A0]/20 animate-pulse" />
        <div className="absolute bottom-32 left-1/4 w-80 h-80 rounded-full opacity-25 blur-3xl bg-sky-400/15 animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32 pb-24 w-full z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="relative animate-fade-in">

              {/* Headline */}
              <div className="mb-6">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-gray-900 leading-[0.95] tracking-tight mb-4">
                  Fuel Your Best Life
                </h1>
                
                <div className="relative">
                  <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black bg-gradient-to-r from-[#06D6A0] via-cyan-500 to-teal-600 bg-clip-text text-transparent leading-[0.95]">
                    Every Day
                  </h2>
                  <div className="absolute -bottom-2 left-0 h-2 w-[60%] bg-gradient-to-r from-[#06D6A0] to-cyan-400 rounded-full" />
                </div>
              </div>

              {/* Subheadline */}
              <p className="text-xl sm:text-2xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                Track nutrition, log workouts, and hit your goals with intelligent insights 
                and effortless tracking.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/signup">
                  <button className="group px-10 py-5 bg-[#06D6A0] text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                    <span className="flex items-center gap-2">
                      Start Free Trial
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </Link>

                <button className="px-10 py-5 bg-white text-gray-900 rounded-2xl font-bold text-lg border-2 border-gray-200 shadow-md hover:border-[#06D6A0]/50 hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                  <span className="flex items-center gap-2">
                    <Play className="w-5 h-5 fill-current" />
                    Watch Demo
                  </span>
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-10 flex-wrap">
                {[
                  { value: '50K+', label: 'Active Users' },
                  { value: '4.9★', label: 'Rating' },
                  { value: '1M+', label: 'Workouts' },
                ].map((stat) => (
                  <div key={stat.label} className="hover:scale-110 hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
                    <p className="text-5xl font-black text-[#06D6A0] mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

           { /* Right - Dashboard Preview */}
                  <div className="relative h-[600px] hidden lg:flex items-center justify-center">
                    <div className="bg-white rounded-3xl p-8 border-2 border-[#06D6A0]/30 shadow-2xl w-80 hover:scale-105 hover:-translate-y-2 transition-all duration-500">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#06D6A0] to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Sparkles className="w-10 h-10 text-white" fill="white" stroke="white" strokeWidth={0} />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                      Today's Goals
                    </h3>
                    <p className="text-gray-500 text-center text-sm mb-6">
                      Track your macros live
                    </p>

                    <div className="space-y-4">
                      {[
                      { label: 'Protein', value: 85, color: '#06D6A0' },
                      { label: 'Carbs', value: 70, color: '#38BDF8' },
                      { label: 'Fats', value: 92, color: '#22D3EE' },
                      ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-700 font-semibold">{item.label}</span>
                        <span className="font-bold" style={{ color: item.color }}>
                          {item.value}%
                        </span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                          background: item.color,
                          width: `${item.value}%`
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
      <section id="tracker" className="relative bg-gradient-to-b from-white via-cyan-50/20 to-white py-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#06D6A0]/15 blur-3xl opacity-30" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl opacity-15" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Everything You Need to
              <span className="block mt-2 bg-gradient-to-r from-[#06D6A0] via-cyan-500 to-teal-600 bg-clip-text text-transparent">
                Stay Healthy
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive tools designed to help you reach your fitness goals with ease and style
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {[
              { 
                icon: Apple,
                title: 'Nutrition Tracking', 
                desc: 'Log meals effortlessly with smart food database and barcode scanner.',
                accentColor: '#06D6A0',
                iconBg: 'from-[#06D6A0]/10 to-cyan-500/10',
                link: '/nutrition'
              },
              { 
                icon: Dumbbell,
                title: 'Workout Tracking', 
                desc: 'Track exercises with activity rings and auto-calculated calories.',
                accentColor: '#38BDF8',
                iconBg: 'from-sky-400/10 to-cyan-500/10',
                link: '/workouts'
              },
              { 
                icon: BarChart3,
                title: 'Progress Reports', 
                desc: 'Beautiful charts and insights to track your fitness journey.',
                accentColor: '#22D3EE',
                iconBg: 'from-cyan-400/10 to-[#06D6A0]/10',
                link: '/reports'
              },
              { 
                icon: Bell,
                title: 'Smart Reminders', 
                desc: 'Never miss a meal or workout with intelligent notifications.',
                accentColor: '#06D6A0',
                iconBg: 'from-[#06D6A0]/10 to-sky-400/10',
                link: '/settings'
              },
              { 
                icon: Target,
                title: 'Goal Setting', 
                desc: 'Set personalized goals and celebrate your achievements.',
                accentColor: '#38BDF8',
                iconBg: 'from-sky-400/10 to-[#06D6A0]/10',
                link: '/#progress'
              },
              { 
                icon: Sparkles,
                title: 'Customization', 
                desc: 'Personalize units, theme, and preferences to match your style.',
                accentColor: '#22D3EE',
                iconBg: 'from-cyan-400/10 to-sky-400/10',
                link: '/settings'
              },
            ].map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div key={feature.title} className="group">
                  <Link to={feature.link}>
                    <div className="relative h-full bg-white/70 backdrop-blur-md p-8 lg:p-10 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                      {/* Icon */}
                      <div 
                        className={`inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br ${feature.iconBg} group-hover:scale-110 transition-transform duration-300`}
                        style={{ color: feature.accentColor }}
                      >
                        <IconComponent className="w-8 h-8" strokeWidth={2.5} />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-base mb-6">
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

      {/* Progress Section */}
      <section id="progress" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Track Your Progress
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Visualize your journey with beautiful charts and insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: '92%', label: 'Weekly Consistency', trend: '+12%', color: 'from-[#06D6A0] to-[#073B4C]' },
              { value: '-2.3kg', label: 'Weight Progress', trend: 'This month', color: 'from-[#FFD166] to-[#EF476F]' },
              { value: '1,247', label: 'Total Workouts', trend: '+45 this week', color: 'from-[#118AB2] to-[#073B4C]' }
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-900 font-semibold mb-2">{stat.label}</div>
                <div className="text-sm text-[#06D6A0] font-medium">{stat.trend}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#06D6A0] via-[#073B4C] to-[#118AB2]">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFD166]/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#06D6A0]/20 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Health?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join thousands of users achieving their fitness goals with FitMind.
            </p>
            <Link to="/signup">
              <button className="px-12 py-5 bg-white text-[#073B4C] rounded-full hover:bg-gray-50 shadow-2xl text-lg font-bold hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                Start Free Trial
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-[#073B4C] to-gray-900 text-white py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#06D6A0] to-white bg-clip-text text-transparent">
                💪 FitMind
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Your personal companion for a healthier lifestyle.
              </p>
            </div>
            
            {[
              {
                title: 'Product',
                links: ['Features', 'Pricing', 'FAQ']
              },
              {
                title: 'Company',
                links: ['About', 'Blog', 'Careers']
              },
              {
                title: 'Legal',
                links: ['Privacy', 'Terms', 'Contact']
              }
            ].map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold mb-4 text-white">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 hover:text-[#06D6A0] transition-colors duration-200">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800/50 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2025 FitMind. All rights reserved. Made with ❤️ for your health.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Home;
