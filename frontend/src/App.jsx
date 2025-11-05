import Logo from "./assets/Logo"
import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="min-h-dvh">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Personal Path to{' '}
              <span className="text-green-600">Wellness</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Track your health, plan your meals, and achieve your fitness goals with personalized insights and AI-powered recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition shadow-lg text-lg font-semibold">
                Start Your Journey
              </button>
              <button className="px-8 py-4 bg-white text-green-600 rounded-full hover:bg-gray-50 transition shadow-lg text-lg font-semibold border-2 border-green-600">
                Watch Demo
              </button>
            </div>
            <div className="mt-12 flex gap-8">
              <div>
                <p className="text-3xl font-bold text-gray-900">50K+</p>
                <p className="text-gray-600">Active Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">4.8★</p>
                <p className="text-gray-600">App Rating</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">1M+</p>
                <p className="text-gray-600">Meals Tracked</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition duration-300">
              <div className="bg-white rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Today's Progress</span>
                  <span className="text-green-600 font-bold">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-green-50 p-4 rounded-xl text-center">
                    <p className="text-2xl font-bold text-green-600">1,850</p>
                    <p className="text-sm text-gray-600">Calories</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl text-center">
                    <p className="text-2xl font-bold text-blue-600">8,420</p>
                    <p className="text-sm text-gray-600">Steps</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl text-center">
                    <p className="text-2xl font-bold text-purple-600">2.5L</p>
                    <p className="text-sm text-gray-600">Water</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="tracker" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Stay Healthy
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive tools to help you reach your fitness goals
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-xl transition">
              <div className="text-4xl mb-4">🍎</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Nutrition Tracking</h3>
              <p className="text-gray-600">
                Log meals effortlessly with our smart food database and barcode scanner. Get detailed macro and micronutrient breakdowns.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-xl transition">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Fitness Goals</h3>
              <p className="text-gray-600">
                Set personalized fitness goals and track your progress with detailed analytics and insights tailored to you.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl hover:shadow-xl transition">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">AI Insights</h3>
              <p className="text-gray-600">
                Get personalized recommendations and insights powered by AI to optimize your health journey.
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl hover:shadow-xl transition">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Meal Planning</h3>
              <p className="text-gray-600">
                Plan your weekly meals with customized meal plans that match your dietary preferences and goals.
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl hover:shadow-xl transition">
              <div className="text-4xl mb-4">🏋️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Workout Library</h3>
              <p className="text-gray-600">
                Access hundreds of workout routines and exercises with video demonstrations and step-by-step guides.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl hover:shadow-xl transition">
              <div className="text-4xl mb-4">🔔</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Smart Reminders</h3>
              <p className="text-gray-600">
                Never miss a meal or workout with intelligent reminders that adapt to your schedule and habits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl text-green-50 mb-8">
            Join thousands of users who have already achieved their fitness goals with HealthTrack.
          </p>
          <button className="px-10 py-4 bg-white text-green-600 rounded-full hover:bg-gray-100 transition shadow-xl text-lg font-bold">
            Start Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">🏃 HealthTrack</h3>
              <p className="text-gray-400">
                Your personal companion for a healthier lifestyle.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HealthTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
