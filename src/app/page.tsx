'use client';

import { useState, useRef, useEffect } from 'react';
import DonationForm from '@/components/DonationForm';
import ServerHealthCheck from '@/components/ServerHealthCheck';

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);
  const [selectedAmount, setSelectedAmount] = useState<number>(25);
  const [heroContent, setHeroContent] = useState<any>({
    frontmatter: {
      title: "Empowering Communities Through Generosity",
      subtitle: "Join us in making a difference. Every donation helps provide education, healthcare, and clean water to those who need it most.",
      cta_label: "💝 Donate Now"
    }
  });
  const [aboutContent, setAboutContent] = useState<any>({
    frontmatter: { title: "Our Mission" }
  });
  const [impactContent, setImpactContent] = useState<any>({
    frontmatter: { 
      title: "Your Impact",
      description: "See how your donations are making a real difference in communities around the world."
    }
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch('/api/admin/content');
      if (response.ok) {
        const contentData = await response.json();
        
        // Parse content with frontmatter
        if (contentData['hero.md']) {
          const heroData = parseContentWithFrontmatter(contentData['hero.md'].content);
          setHeroContent(heroData);
        }
        
        if (contentData['about.md']) {
          const aboutData = parseContentWithFrontmatter(contentData['about.md'].content);
          setAboutContent(aboutData);
        }
        
        if (contentData['impact.md']) {
          const impactData = parseContentWithFrontmatter(contentData['impact.md'].content);
          setImpactContent(impactData);
        }
      }
    } catch (error) {
      console.error('Error loading content:', error);
      // Content will fall back to default values set above
    }
  };

  const parseContentWithFrontmatter = (content: string) => {
    if (!content) return { frontmatter: {}, content: '' };
    
    try {
      // Simple frontmatter parsing
      if (content.startsWith('---')) {
        const parts = content.split('---');
        if (parts.length >= 3) {
          const frontmatter: any = {};
          const frontmatterText = parts[1];
          const bodyContent = parts.slice(2).join('---');
          
          // Parse frontmatter lines
          const lines = frontmatterText.split('\n');
          for (const line of lines) {
            if (line.trim() && line.includes(':')) {
              const colonIndex = line.indexOf(':');
              const key = line.substring(0, colonIndex).trim();
              const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
              if (key) {
                frontmatter[key] = value;
              }
            }
          }
          
          return {
            frontmatter,
            content: bodyContent.trim()
          };
        }
      }
      
      return { frontmatter: {}, content: content };
    } catch (error) {
      console.error('Error parsing frontmatter:', error);
      return { frontmatter: {}, content: content };
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <ServerHealthCheck />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '4s'
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className={`mx-auto max-w-2xl text-center transition-all duration-1000`}>
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
                🌟 Making a difference since 2024
              </div>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
              {heroContent?.frontmatter?.title || "Empowering Communities Through Generosity"}
            </h1>
            
            <p className="mt-8 text-lg leading-8 text-blue-100 font-medium max-w-3xl mx-auto">
              {heroContent?.frontmatter?.subtitle || "Join us in making a difference. Every donation helps provide education, healthcare, and clean water to those who need it most."}
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4">
              <button
                onClick={scrollToForm}
                className="group relative inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-lg ring-1 ring-inset ring-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-50 transform-gpu"
              >
                <span className="mr-2">💝</span>
                {heroContent?.frontmatter?.cta_label || "💝 Donate Now"}
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

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
                {aboutContent?.frontmatter?.title || "Our Mission"}
              </h2>
              {aboutContent?.content ? (
                <div 
                  className="text-lg text-gray-700 mb-8 prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: aboutContent.content
                      .replace(/^# (.*$)/gim, '<h3 class="text-xl font-semibold mb-4">$1</h3>')
                      .replace(/^## (.*$)/gim, '<h4 class="text-lg font-medium mb-3">$1</h4>')
                      .replace(/^### (.*$)/gim, '<h5 class="text-base font-medium mb-2">$1</h5>')
                      .replace(/^\- (.*$)/gim, '<li class="ml-4 mb-1">• $1</li>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n\n/g, '</p><p class="text-lg text-gray-700 mb-6">')
                      .replace(/\n/g, '<br>')
                      .replace(/^(.+)$/gm, '<p class="text-lg text-gray-700 mb-6">$1</p>')
                      .replace(/<p class="text-lg text-gray-700 mb-6"><\/p>/g, '')
                  }}
                />
              ) : (
                <>
                  <p className="text-lg text-gray-700 mb-6">
                    We believe that every person deserves access to basic necessities like clean water, education, and healthcare. Through the generosity of donors like you, we're able to make a real difference in communities around the world.
                  </p>
                  <p className="text-lg text-gray-700 mb-8">
                    Your donations directly fund projects that provide sustainable solutions to pressing global challenges. From building wells in rural villages to supporting educational programs for children, every dollar makes an impact.
                  </p>
                </>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
                >
                  <span className="mr-2">💝</span>
                  Make a Donation
                </button>
                <button className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
                  <span className="mr-2">📖</span>
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌍</div>
                  <p className="text-lg font-medium text-gray-700">Making the world a better place, one donation at a time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
              {impactContent?.frontmatter?.title || "Your Impact"}
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {impactContent?.frontmatter?.description || "See how your donations are making a real difference in communities around the world."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💧</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Clean Water</h3>
              <p className="text-gray-700 mb-6">
                Your donations help build wells and water purification systems in communities that lack access to clean drinking water.
              </p>
              <div className="text-3xl font-bold text-blue-600">2,500+</div>
              <div className="text-sm text-gray-500">People with clean water</div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Education</h3>
              <p className="text-gray-700 mb-6">
                Support educational programs that provide children with the knowledge and skills they need to build a better future.
              </p>
              <div className="text-3xl font-bold text-green-600">1,200+</div>
              <div className="text-sm text-gray-500">Children educated</div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🏥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Healthcare</h3>
              <p className="text-gray-700 mb-6">
                Fund medical clinics and health programs that provide essential healthcare services to underserved communities.
              </p>
              <div className="text-3xl font-bold text-purple-600">800+</div>
              <div className="text-sm text-gray-500">Lives improved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section ref={formRef} className="py-24 bg-white">
        <DonationForm />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Social Good Fund</h3>
              <p className="text-gray-400">
                Making a difference in communities around the world through the power of generosity.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Programs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Impact Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Get Involved</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@socialgoodfund.org</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Hope Street, City, State</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <div className="w-6 h-6 bg-gray-400 rounded"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <div className="w-6 h-6 bg-gray-400 rounded"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <div className="w-6 h-6 bg-gray-400 rounded"></div>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Social Good Fund. All rights reserved.</p>
          </div>
        </div>
      </footer>

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
