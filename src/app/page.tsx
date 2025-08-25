import DonationForm from "@/components/DonationForm";

export default function Home() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <main>
                {/* Hero Section */}
                <section className="relative isolate overflow-hidden">
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9] via-[#6366f1] to-[#22c55e] opacity-20" />
                        <div className="absolute inset-0 bg-[url('/hero-bg.svg')] bg-cover bg-center opacity-30" />
                    </div>
                    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:py-32">
                        <div className="mx-auto max-w-3xl text-center">
                            <div className="mb-8">
                                <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 ring-1 ring-inset ring-green-600/20">
                                    🌟 Making a difference together
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                                Together, we turn kindness into impact
                            </h1>
                            <p className="mt-6 text-lg/8 text-gray-700 font-medium">
                                Your donation supports critical programs in education, health, and community resilience. 
                                Every contribution creates lasting positive change in communities around the world.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-4">
                                <a
                                    href="#donate"
                                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg ring-1 ring-inset ring-white/10 transition-all hover:scale-105 hover:shadow-xl"
                                >
                                    💝 Donate Now
                                </a>
                                <a
                                    href="#about"
                                    className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold ring-1 ring-inset ring-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-all hover:scale-105"
                                >
                                    📖 Learn More
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="bg-white py-16">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-600">$2.5M+</div>
                                <div className="mt-2 text-sm text-gray-600">Total Raised</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-purple-600">15K+</div>
                                <div className="mt-2 text-sm text-gray-600">Lives Impacted</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-green-600">50+</div>
                                <div className="mt-2 text-sm text-gray-600">Communities</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-orange-600">95%</div>
                                <div className="mt-2 text-sm text-gray-600">Direct to Programs</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About the Cause Section */}
                <section id="about" className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
                    <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
                        <div className="relative">
                            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl ring-1 ring-inset ring-gray-200">
                                <img 
                                    src="/about-image.svg" 
                                    alt="People helping each other" 
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-4 -right-4 rounded-full bg-green-500 p-4 shadow-lg">
                                <span className="text-2xl">🤝</span>
                            </div>
                        </div>
                        <div>
                            <div className="mb-4">
                                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                                    Our Mission
                                </span>
                            </div>
                            <h2 className="text-3xl font-bold sm:text-4xl text-gray-900">Empowering Communities Through Sustainable Change</h2>
                            <p className="mt-6 text-lg text-gray-700 leading-relaxed font-medium">
                                We partner with local organizations to deliver measurable outcomes. From scholarships and
                                safe water access to emergency relief, we focus on initiatives that create lasting change
                                and empower communities to build their own future.
                            </p>
                            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                        <span className="text-green-600">✓</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">Transparent reporting</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                        <span className="text-green-600">✓</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">Community-led projects</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                        <span className="text-green-600">✓</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">Low admin overhead</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                        <span className="text-green-600">✓</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">Global + local impact</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Impact Section */}
                <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20 sm:py-24">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold sm:text-4xl text-gray-900">Your Impact</h2>
                            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700 font-medium">
                                Every contribution is put to work with care. Here is how your donation creates real change.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="order-2 lg:order-1">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <StatCard 
                                        label="Education" 
                                        value="40%" 
                                        description="Scholarships and supplies" 
                                        icon="📚"
                                        color="blue"
                                    />
                                    <StatCard 
                                        label="Health" 
                                        value="30%" 
                                        description="Clinics and nutrition" 
                                        icon="🏥"
                                        color="purple"
                                    />
                                    <StatCard 
                                        label="Water" 
                                        value="20%" 
                                        description="Clean water projects" 
                                        icon="💧"
                                        color="green"
                                    />
                                    <StatCard 
                                        label="Operations" 
                                        value="10%" 
                                        description="Program delivery" 
                                        icon="⚙️"
                                        color="orange"
                                    />
                                </div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-inset ring-gray-200">
                                    <img 
                                        src="/impact-chart.svg" 
                                        alt="Donation allocation chart" 
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-20 sm:py-24 bg-white">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold sm:text-4xl text-gray-900">Stories of Impact</h2>
                            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700 font-medium">
                                Hear from the communities and donors whose lives have been changed.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <TestimonialCard 
                                quote="Your donations helped build a new school in our village. Now 200 children have access to quality education."
                                author="Maria Santos"
                                role="Community Leader"
                                location="Rural Guatemala"
                                avatar="👩‍🏫"
                            />
                            <TestimonialCard 
                                quote="The clean water project transformed our community. No more waterborne diseases, and children can focus on learning."
                                author="Ahmed Hassan"
                                role="Village Elder"
                                location="Northern Kenya"
                                avatar="👨‍🦳"
                            />
                            <TestimonialCard 
                                quote="I've been donating monthly for 2 years. Seeing the impact reports makes me proud to be part of this mission."
                                author="Sarah Johnson"
                                role="Monthly Donor"
                                location="New York, USA"
                                avatar="👩‍💼"
                            />
                        </div>
                    </div>
                </section>

                {/* Donation Form Section */}
                <section id="donate" className="bg-gradient-to-br from-green-50 to-blue-50">
                    <DonationForm />
                </section>

                {/* Footer */}
                <footer className="border-t border-gray-200 bg-white">
                    <div className="mx-auto max-w-7xl px-6 py-12">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                            <div className="col-span-1 md:col-span-2">
                                <h3 className="text-lg font-semibold mb-4 text-gray-900">Social Good Fund</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Making the world a better place, one donation at a time. 
                                    We believe in the power of collective action to create lasting positive change.
                                </p>
                                <div className="flex space-x-4">
                                    <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                                        <span className="sr-only">Twitter</span>
                                        <span className="text-xl">🐦</span>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                                        <span className="sr-only">Instagram</span>
                                        <span className="text-xl">📷</span>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                                        <span className="sr-only">LinkedIn</span>
                                        <span className="text-xl">💼</span>
                                    </a>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold mb-4 text-gray-900">Quick Links</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About Us</a></li>
                                    <li><a href="#donate" className="text-gray-600 hover:text-gray-900 transition-colors">Donate</a></li>
                                    <li><a href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors">Admin</a></li>
                                    <li><a href="/admin/donations" className="text-gray-600 hover:text-gray-900 transition-colors">Donations</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold mb-4 text-gray-900">Contact</h4>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>📧 hello@socialgoodfund.org</li>
                                    <li>📞 +1 (555) 123-4567</li>
                                    <li>📍 123 Charity St, Good City, GC 12345</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                                <p className="text-sm text-gray-600">© {new Date().getFullYear()} Social Good Fund. All rights reserved.</p>
                                <div className="flex items-center gap-4 text-sm">
                                    <a className="text-gray-600 hover:text-gray-900 transition-colors" href="#">Privacy Policy</a>
                                    <a className="text-gray-600 hover:text-gray-900 transition-colors" href="#">Terms of Service</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}

type StatCardProps = {
    label: string;
    value: string;
    description: string;
    icon: string;
    color: 'blue' | 'purple' | 'green' | 'orange';
};

function StatCard({ label, value, description, icon, color }: StatCardProps) {
    const colorClasses = {
        blue: 'bg-blue-50 border-blue-200 text-blue-700',
        purple: 'bg-purple-50 border-purple-200 text-purple-700',
        green: 'bg-green-50 border-green-200 text-green-700',
        orange: 'bg-orange-50 border-orange-200 text-orange-700',
    };

    return (
        <div className={`rounded-2xl border p-6 shadow-sm transition-all hover:shadow-md ${colorClasses[color]}`}>
            <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{icon}</span>
                <div className="text-2xl font-bold">{value}</div>
            </div>
            <div className="text-sm font-medium">{label}</div>
            <div className="mt-1 text-xs opacity-80">{description}</div>
        </div>
    );
}

type TestimonialCardProps = {
    quote: string;
    author: string;
    role: string;
    location: string;
    avatar: string;
};

function TestimonialCard({ quote, author, role, location, avatar }: TestimonialCardProps) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
            <div className="mb-4">
                <span className="text-2xl">{avatar}</span>
            </div>
            <blockquote className="text-sm text-gray-700 mb-4 font-medium">
                "{quote}"
            </blockquote>
            <div>
                <div className="font-medium text-sm text-gray-900">{author}</div>
                <div className="text-xs text-gray-600">{role}</div>
                <div className="text-xs text-gray-600">{location}</div>
            </div>
        </div>
    );
}
