import DonationForm from "@/components/DonationForm";

export default function Home() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<main>
				{/* Hero Section */}
				<section className="relative isolate overflow-hidden">
					<div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0ea5e9] via-[#6366f1] to-[#22c55e] opacity-20" />
					<div className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:py-32">
						<div className="mx-auto max-w-3xl text-center">
							<h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
								Together, we turn kindness into impact
							</h1>
							<p className="mt-6 text-base/7 sm:text-lg/8 text-foreground/80">
								Your donation supports critical programs in education, health, and community resilience.
							</p>
							<div className="mt-10 flex items-center justify-center gap-4">
								<a
									href="#donate"
									className="inline-flex items-center justify-center rounded-full bg-[#0ea5e9] px-6 py-3 text-sm font-medium text-white shadow-sm ring-1 ring-inset ring-white/10 transition hover:bg-[#0284c7]"
								>
									Donate Now
								</a>
								<a
									href="#about"
									className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium ring-1 ring-inset ring-foreground/15 text-foreground hover:bg-foreground/5"
								>
									Learn More
								</a>
							</div>
						</div>
					</div>
				</section>

				{/* About the Cause Section */}
				<section id="about" className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
					<div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
						<div className="aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br from-foreground/10 to-foreground/5 shadow-sm ring-1 ring-inset ring-foreground/10" />
						<div>
							<h2 className="text-2xl font-semibold sm:text-3xl">About the Cause</h2>
							<p className="mt-4 text-foreground/80">
								We partner with local organizations to deliver measurable outcomes. From scholarships and
								safe water access to emergency relief, we focus on initiatives that create lasting change.
							</p>
							<ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
								<li className="rounded-lg border border-foreground/10 bg-background px-4 py-3 text-sm shadow-sm">Transparent reporting</li>
								<li className="rounded-lg border border-foreground/10 bg-background px-4 py-3 text-sm shadow-sm">Community-led projects</li>
								<li className="rounded-lg border border-foreground/10 bg-background px-4 py-3 text-sm shadow-sm">Low admin overhead</li>
								<li className="rounded-lg border border-foreground/10 bg-background px-4 py-3 text-sm shadow-sm">Global + local impact</li>
							</ul>
						</div>
					</div>
				</section>

				{/* Impact Section */}
				<section className="bg-foreground/[0.03] py-20 sm:py-24">
					<div className="mx-auto max-w-7xl px-6">
						<h2 className="text-center text-2xl font-semibold sm:text-3xl">Your Impact</h2>
						<p className="mx-auto mt-3 max-w-2xl text-center text-foreground/70">
							Every contribution is put to work with care. Here is how a typical donation is allocated.
						</p>
						<div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
							<StatCard label="Education" value="40%" description="Scholarships and supplies" />
							<StatCard label="Health" value="30%" description="Clinics and nutrition" />
							<StatCard label="Water" value="20%" description="Clean water projects" />
							<StatCard label="Operations" value="10%" description="Program delivery" />
						</div>
					</div>
				</section>

				{/* Donation Form Section */}
				<section id="donate">
					<DonationForm />
				</section>

				{/* Footer */}
				<footer className="border-t border-foreground/10 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
					<div className="mx-auto max-w-7xl px-6 py-10">
						<div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
							<p className="text-sm text-foreground/70">© {new Date().getFullYear()} Social Good Fund</p>
							<nav className="flex items-center gap-4 text-sm">
								<a className="hover:underline" href="#">Twitter</a>
								<a className="hover:underline" href="#">Instagram</a>
								<a className="hover:underline" href="#">Contact</a>
							</nav>
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
};

function StatCard({ label, value, description }: StatCardProps) {
	return (
		<div className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm">
			<div className="text-3xl font-semibold">{value}</div>
			<div className="mt-1 text-sm font-medium text-foreground/80">{label}</div>
			<div className="mt-2 text-sm text-foreground/60">{description}</div>
		</div>
	);
}
