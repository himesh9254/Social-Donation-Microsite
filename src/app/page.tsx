'use client';

import { useState, useRef, useEffect } from 'react';
import DonationForm from '@/components/DonationForm';

export const dynamic = 'force-dynamic';

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);
  const [selectedAmount, setSelectedAmount] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleAmountClick = (amount: string) => {
    setSelectedAmount(amount);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 py-20 sm:py-32">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-1000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
          </div>
          
          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
                style={{
                  left: `${20 + (i * 5)}%`,
                  top: `${10 + (i * 6)}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '4s'
                }}
              />
            ))}
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className={`mx-auto max-w-2xl text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="mb-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
                  🌟 Making a difference since 2024
                </div>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
                Empowering Communities Through Generosity
              </h1>
              
              <p className="mt-8 text-lg leading-8 text-blue-100 font-medium max-w-3xl mx-auto">
                Join us in making a difference. Every donation helps provide education, healthcare, and clean water to those who need it most.
              </p>
              
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4">
                <button
                  onClick={scrollToForm}
                  className="group relative inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-lg ring-1 ring-inset ring-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-50 transform-gpu"
                >
                  <span className="mr-2">💝</span>
                  Donate Now
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
                
                <button
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold ring-1 ring-inset ring-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:ring-white/50"
                >
                  <span className="mr-2">📖</span>
                  Learn More
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-16 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/80">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Secure Donations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">100% Transparent</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Real Impact</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Our Impact in Numbers
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                Together, we've achieved remarkable results that speak for themselves
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: "🏘️",
                  number: "150+",
                  label: "Communities Served",
                  description: "Across 25 countries worldwide",
                  color: "from-blue-500 to-blue-600"
                },
                {
                  icon: "👥",
                  number: "50K+",
                  label: "Lives Impacted",
                  description: "Through our various programs",
                  color: "from-purple-500 to-purple-600"
                },
                {
                  icon: "💰",
                  number: "$2.5M+",
                  label: "Donations Processed",
                  description: "With 95% going to programs",
                  color: "from-green-500 to-green-600"
                }
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-gray-200`}
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.color} rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="text-center">
                    <div className="text-4xl mb-4">{stat.icon}</div>
                    <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                      {stat.number}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</h3>
                    <p className="text-gray-600">{stat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About the Cause Section */}
        <section id="about" className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
                    🎯 Our Mission
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
                    Creating Lasting Positive Change
                  </h2>
                </div>
                
                <p className="text-lg leading-8 text-blue-100 max-w-2xl">
                  We believe that every person deserves access to basic necessities and opportunities for growth. 
                  Through strategic partnerships and community-driven initiatives, we work to create lasting positive change.
                </p>
                
                <div className="space-y-4">
                  {[
                    "Education for Every Child",
                    "Healthcare Access",
                    "Clean Water Projects",
                    "Community Development"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-4 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-green-600 text-xl font-bold">✓</span>
                      </div>
                      <span className="text-white text-lg font-semibold group-hover:text-blue-200 transition-colors duration-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="w-80 h-80 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                    <svg className="w-40 h-40 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full opacity-80 animate-bounce"></div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-pink-400 rounded-full opacity-80 animate-bounce animation-delay-1000"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 to-blue-100/50 opacity-50"></div>
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Where Your Donations Go
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                Transparency in action - see how your contributions make a real difference
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: "📚",
                  title: "Education Programs",
                  description: "Building schools, providing supplies, and training teachers to ensure quality education for all children.",
                  color: "from-blue-500 to-blue-600",
                  bgColor: "from-blue-50 to-blue-100"
                },
                {
                  icon: "🏥",
                  title: "Healthcare Initiatives",
                  description: "Establishing clinics, providing medical supplies, and training healthcare workers in underserved areas.",
                  color: "from-green-500 to-green-600",
                  bgColor: "from-green-50 to-green-100"
                },
                {
                  icon: "💧",
                  title: "Clean Water Projects",
                  description: "Installing wells, water purification systems, and sanitation facilities to provide clean, safe water.",
                  color: "from-purple-500 to-purple-600",
                  bgColor: "from-purple-50 to-purple-100"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-gray-200 overflow-hidden`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    
                    <h3 className={`text-xl font-semibold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-4 group-hover:text-gray-900 transition-colors duration-300`}>
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Donation Form Section */}
        <section id="donate" className="py-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30"></div>
          
          <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
                Make a Difference Today
              </h2>
              <p className="text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
                Your donation, no matter the size, creates real change in communities around the world.
              </p>
            </div>
            
            {/* Quick Donation Cards */}
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-3xl p-8 lg:p-12 shadow-2xl border border-blue-100 mb-16">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Impact</h3>
                <p className="text-gray-600 text-lg">Select an amount that fits your budget and goals</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { amount: "25", icon: "💝", impact: "Provides clean water for a family" },
                  { amount: "50", icon: "🎓", impact: "School supplies for 5 children" },
                  { amount: "100", icon: "🏥", impact: "Medical care for 10 people" }
                ].map((item, index) => (
                  <button 
                    key={index}
                    onClick={() => handleAmountClick(item.amount)}
                    className={`group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 cursor-pointer transform hover:scale-105 hover:-translate-y-1`}
                  >
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                    <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">${item.amount}</div>
                    <div className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{item.impact}</div>
                  </button>
                ))}
              </div>
              
              <div className="text-center">
                <p className="text-gray-600 mb-6 text-lg">Click any amount above or enter a custom amount below</p>
                <button 
                  onClick={scrollToForm}
                  className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-5 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer transform-gpu"
                >
                  <span className="mr-3 text-xl">💝</span>
                  Start Your Donation
                  <div className="ml-3 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin group-hover:animate-none"></div>
                </button>
              </div>
            </div>

            {/* Actual Donation Form */}
            <div ref={formRef} id="donation-form" className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 lg:p-12">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Your Donation</h3>
                <p className="text-gray-600 text-lg">Fill out the form below to make your contribution</p>
              </div>
              
              <DonationForm />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 to-blue-100/50 opacity-50"></div>
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Stories of Impact
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                Hear from donors and beneficiaries about the difference we're making together
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Monthly Donor",
                  avatar: "👤",
                  color: "from-blue-500 to-blue-600",
                  bgColor: "from-blue-50 to-blue-100",
                  quote: "I've been donating monthly for over a year now, and seeing the impact reports makes me so proud to be part of this community."
                },
                {
                  name: "Michael Chen",
                  role: "One-time Donor",
                  avatar: "👤",
                  color: "from-green-500 to-green-600",
                  bgColor: "from-green-50 to-green-100",
                  quote: "The transparency and regular updates show exactly how my donation is being used. It's inspiring to see real change happening."
                },
                {
                  name: "Emily Rodriguez",
                  role: "Volunteer & Donor",
                  avatar: "👤",
                  color: "from-purple-500 to-purple-600",
                  bgColor: "from-purple-50 to-purple-100",
                  quote: "As both a volunteer and donor, I've seen firsthand how every dollar makes a difference in people's lives."
                }
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-gray-200 overflow-hidden`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-2xl">{testimonial.avatar}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg group-hover:text-gray-700 transition-colors duration-300">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-blue-500/5 opacity-10"></div>
          
          <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  Social Good Donations
                </h3>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-md">
                  Empowering communities through generosity and strategic giving. Together, we create lasting positive change.
                </p>
                <div className="flex space-x-4">
                  {[
                    { icon: "📘", label: "Facebook" },
                    { icon: "🐦", label: "Twitter" },
                    { icon: "📷", label: "Instagram" }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className="group w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:bg-white/20 hover:scale-110"
                      title={social.label}
                    >
                      <span className="text-lg">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-6 text-white">Quick Links</h4>
                <ul className="space-y-3">
                  {[
                    { text: "About Us", href: "#about" },
                    { text: "Donate", href: "#donate" },
                    { text: "Impact", href: "#impact" },
                    { text: "Contact", href: "#contact" }
                  ].map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href} 
                        className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-6 text-white">Contact Info</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <span>📍</span>
                    <span>123 Charity Lane, Good City</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span>📧</span>
                    <span>info@socialgood.org</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span>📞</span>
                    <span>+1 (555) 123-4567</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-gray-800 text-center">
              <p className="text-gray-400">
                &copy; 2024 Social Good Donations. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
