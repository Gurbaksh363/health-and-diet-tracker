import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-white via-[#06D6A0]/5 to-[#073B4C]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-28 pb-32">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-4 px-4 py-2 bg-[#06D6A0]/10 rounded-full"
              >
                <span className="text-[#073B4C] font-semibold text-sm">👋 Welcome to FitMind</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Personal Path to{' '}
                <span className="bg-gradient-to-r from-[#06D6A0] to-[#073B4C] bg-clip-text text-transparent">
                  Wellness
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Track your health, plan your meals, and achieve your fitness goals with personalized insights and smart tracking.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <motion.button 
                    className="px-8 py-4 bg-[#06D6A0] text-white rounded-full hover:bg-[#05c28f] transition-all shadow-lg text-lg font-semibold hover:shadow-xl"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Your Journey
                  </motion.button>
                </Link>
                <motion.button 
                  className="px-8 py-4 bg-white text-[#073B4C] rounded-full hover:bg-gray-50 transition-all shadow-lg text-lg font-semibold border-2 border-[#073B4C]/20"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Watch Demo
                </motion.button>
              </div>
              
              <motion.div 
                className="mt-12 flex gap-8 flex-wrap"
                variants={itemVariants}
              >
                {[
                  { value: '50K+', label: 'Active Users' },
                  { value: '4.8★', label: 'App Rating' },
                  { value: '1M+', label: 'Meals Tracked' }
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    <p className="text-3xl font-bold bg-gradient-to-r from-[#06D6A0] to-[#073B4C] bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-gray-600">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-[#06D6A0] to-[#073B4C] rounded-3xl blur-2xl opacity-20"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <motion.div 
                className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-100"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">Today's Progress</span>
                    <motion.span 
                      className="text-[#06D6A0] font-bold text-xl"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: 'spring' }}
                    >
                      85%
                    </motion.span>
                  </div>
                  
                  <div className="relative w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-[#06D6A0] to-[#073B4C] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    {[
                      { value: '1,850', label: 'Calories', color: 'from-[#06D6A0] to-[#073B4C]', delay: 0.7 },
                      { value: '8,420', label: 'Steps', color: 'from-[#118AB2] to-[#073B4C]', delay: 0.8 },
                      { value: '2.5L', label: 'Water', color: 'from-[#FFD166] to-[#EF476F]', delay: 0.9 }
                    ].map((item) => (
                      <motion.div
                        key={item.label}
                        className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl text-center border border-gray-100 shadow-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: item.delay, type: 'spring' }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <p className={`text-2xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                          {item.value}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{item.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white">
          <svg className="absolute bottom-0 w-full h-16" preserveAspectRatio="none" viewBox="0 0 1440 54">
            <path fill="url(#wave-gradient)" d="M0,32L80,37.3C160,43,320,53,480,48C640,43,800,21,960,16C1120,11,1280,21,1360,26.7L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"/>
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06D6A0" stopOpacity="0.1"/>
                <stop offset="100%" stopColor="#073B4C" stopOpacity="0.1"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="tracker" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Stay Healthy
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools to help you reach your fitness goals
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            {[
              { 
                icon: '🍎', 
                title: 'Nutrition Tracking', 
                desc: 'Log meals effortlessly with smart food database and barcode scanner.',
                gradient: 'from-[#06D6A0]/10 to-[#06D6A0]/5',
                borderColor: 'border-[#06D6A0]/20',
                iconBg: 'bg-[#06D6A0]/10',
                link: '/nutrition'
              },
              { 
                icon: '💪', 
                title: 'Workout Tracking', 
                desc: 'Track exercises with activity rings and auto-calculated calories.',
                gradient: 'from-[#118AB2]/10 to-[#118AB2]/5',
                borderColor: 'border-[#118AB2]/20',
                iconBg: 'bg-[#118AB2]/10',
                link: '/workouts'
              },
              { 
                icon: '📊', 
                title: 'Progress Reports', 
                desc: 'Beautiful charts and insights to track your fitness journey.',
                gradient: 'from-[#073B4C]/10 to-[#073B4C]/5',
                borderColor: 'border-[#073B4C]/20',
                iconBg: 'bg-[#073B4C]/10',
                link: '/reports'
              },
              { 
                icon: '⏰', 
                title: 'Smart Reminders', 
                desc: 'Never miss a meal or workout with intelligent notifications.',
                gradient: 'from-[#FFD166]/10 to-[#FFD166]/5',
                borderColor: 'border-[#FFD166]/30',
                iconBg: 'bg-[#FFD166]/10',
                link: '/settings'
              },
              { 
                icon: '🎯', 
                title: 'Goal Setting', 
                desc: 'Set personalized goals and celebrate your achievements.',
                gradient: 'from-[#EF476F]/10 to-[#EF476F]/5',
                borderColor: 'border-[#EF476F]/20',
                iconBg: 'bg-[#EF476F]/10',
                link: '/#progress'
              },
              { 
                icon: '⚙️', 
                title: 'Customization', 
                desc: 'Personalize units, theme, and preferences to match your style.',
                gradient: 'from-gray-900/10 to-gray-900/5',
                borderColor: 'border-gray-200',
                iconBg: 'bg-gray-100',
                link: '/settings'
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group"
              >
                <Link to={feature.link}>
                  <div className={`relative h-full bg-gradient-to-br ${feature.gradient} backdrop-blur-sm p-8 rounded-2xl border ${feature.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                    {/* Animated background glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative">
                      <motion.div 
                        className={`inline-flex items-center justify-center w-16 h-16 ${feature.iconBg} rounded-2xl mb-4 text-3xl`}
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        {feature.icon}
                      </motion.div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#073B4C] transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.desc}
                      </p>
                      
                      {/* Arrow indicator */}
                      <motion.div
                        className="mt-4 text-[#06D6A0] font-semibold flex items-center gap-2"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                      >
                        Explore
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Progress Section */}
      <section id="progress" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Track Your Progress
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Visualize your journey with beautiful charts and insights
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
          >
            {[
              { value: '92%', label: 'Weekly Consistency', trend: '+12%', color: 'from-[#06D6A0] to-[#073B4C]' },
              { value: '-2.3kg', label: 'Weight Progress', trend: 'This month', color: 'from-[#FFD166] to-[#EF476F]' },
              { value: '1,247', label: 'Total Workouts', trend: '+45 this week', color: 'from-[#118AB2] to-[#073B4C]' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-900 font-semibold mb-2">{stat.label}</div>
                <div className="text-sm text-[#06D6A0] font-medium">{stat.trend}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Smooth gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#06D6A0] via-[#073B4C] to-[#118AB2]">
          {/* Animated glow orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFD166]/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#06D6A0]/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Health?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join thousands of users achieving their fitness goals with FitMind.
            </p>
            <Link to="/signup">
              <motion.button 
                className="px-12 py-5 bg-white text-[#073B4C] rounded-full hover:bg-gray-50 transition-all shadow-2xl text-lg font-bold"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Trial
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Animated wave at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24" preserveAspectRatio="none" viewBox="0 0 1440 120">
            <motion.path
              fill="white"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-[#073B4C] to-gray-900 text-white py-16 overflow-hidden">
        {/* Subtle animated glow */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-[#06D6A0]/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#06D6A0] to-white bg-clip-text text-transparent">
                💪 FitMind
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Your personal companion for a healthier lifestyle.
              </p>
            </motion.div>
            
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
            ].map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
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
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="border-t border-gray-800/50 pt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-gray-400">
              &copy; 2025 FitMind. All rights reserved. Made with ❤️ for your health.
            </p>
          </motion.div>
        </div>
      </footer>
    </>
  )
}

export default Home;
