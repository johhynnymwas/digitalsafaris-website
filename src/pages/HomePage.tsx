import React from "react";
import { Link } from "react-router-dom";
import {
	ArrowRight,
	ArrowUpRight,
	Bed,
	Car,
	Check,
	Compass,
	MoveRight,
	Utensils,
} from "lucide-react";
import { Hero } from "../components/sections/Hero";
import { LiveShowcase } from "../components/sections/LiveShowcase";
import { SERVICES_DATA } from "../utils/constants";

const serviceVisuals: Record<string, { image: string; icon: React.ElementType }> = {
	accommodation: { image: "/accomodation.jpg", icon: Bed },
	food: { image: "/food%20and%20dinning.jpg", icon: Utensils },
	transport: { image: "/trasportation.jpg", icon: Car },
	experiences: { image: "/experience.jpg", icon: Compass },
};

const journeySteps = [
	{
		number: "01",
		title: "Discover",
		description: "Explore stays, dining, transport, and local experiences by destination.",
	},
	{
		number: "02",
		title: "Choose",
		description: "Review the details and find options that fit the way you want to travel.",
	},
	{
		number: "03",
		title: "Make it happen",
		description: "Continue to the DigitalSafaris platform to book or arrange your service.",
	},
];

function SectionHeading({
	id,
	eyebrow,
	title,
	description,
}: {
	id: string;
	eyebrow: string;
	title: string;
	description: string;
}) {
	return (
		<div className="mx-auto mb-11 max-w-2xl text-center sm:mb-14">
			<p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#995f28] sm:text-[11px]">
				{eyebrow}
			</p>
			<h2
				id={id}
				className="mt-3 font-['Cormorant_Garamond',Georgia,'Times_New_Roman',serif] text-[clamp(2.2rem,4vw,3.55rem)] leading-[1.02] font-semibold tracking-[-.025em] text-[#191816]"
			>
				{title}
			</h2>
			<p className="mx-auto mt-4 max-w-xl text-sm leading-[1.8] text-[#625d55] sm:text-base">
				{description}
			</p>
		</div>
	);
}

export const HomePage: React.FC = () => {
	return (
		<div className="min-h-screen bg-[#f9f7f4] text-[#191816]">
			<Hero />

			<LiveShowcase />

			<section
				className="bg-[#f9f7f4] py-20 sm:py-24"
				aria-labelledby="journey-flow-heading"
			>
				<div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:gap-16 lg:px-8">
					<div>
						<p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#995f28] sm:text-[11px]">
							TRAVEL PLANNING, SIMPLIFIED
						</p>
						<h2
							id="journey-flow-heading"
							className="mt-3 max-w-xl font-['Cormorant_Garamond',Georgia,'Times_New_Roman',serif] text-[clamp(2.4rem,4.5vw,4rem)] leading-[.98] font-semibold tracking-[-.03em] text-[#191816]"
						>
							Bring the pieces of your trip together.
						</h2>
						<p className="mt-5 max-w-xl text-sm leading-[1.85] text-[#625d55] sm:text-base">
							Planning a trip is more than choosing a destination. Find
							accommodation, discover places to eat, arrange transport, and
							explore local activities through one connected travel platform.
						</p>
						<Link
							to="/how-it-works"
							className="mt-7 inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[.09em] text-[#8b531f] transition-colors hover:text-[#5f3717] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c47c2b]"
						>
							See how it works
							<ArrowRight className="h-4 w-4" aria-hidden="true" />
						</Link>
					</div>

					<div className="relative">
						<div
							className="absolute left-[22px] top-8 bottom-8 hidden w-px bg-[#e7d4b8] sm:block"
							aria-hidden="true"
						/>
						<ol className="space-y-3">
							{journeySteps.map((step, index) => (
								<li
									className="relative flex gap-4 rounded-[22px] border border-[#e6d7c1] bg-[linear-gradient(120deg,#fffaf1,#f1e5d3)] p-5 shadow-[0_6px_22px_rgba(47,37,25,.045)] transition duration-200 hover:-translate-y-0.5 hover:border-[#d3b88f] hover:shadow-[0_12px_30px_rgba(47,37,25,.09)] sm:gap-5 sm:p-6"
									key={step.number}
								>
									<span className="relative z-[1] grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#e7d4b8] bg-white text-xs font-bold text-[#8b531f] shadow-sm">
										{step.number}
									</span>
									<div className="min-w-0 flex-1 pt-0.5">
										<div className="flex items-center justify-between gap-3">
											<h3 className="text-sm font-bold text-[#24231f] sm:text-base">
												{step.title}
											</h3>
											{index < journeySteps.length - 1 ? (
												<MoveRight
													className="h-4 w-4 shrink-0 text-[#bd8a4d]"
													aria-hidden="true"
												/>
											) : null}
										</div>
										<p className="mt-1.5 text-xs leading-[1.7] text-[#706a62] sm:text-sm">
											{step.description}
										</p>
									</div>
								</li>
							))}
						</ol>
					</div>
				</div>
			</section>

			<section
				className="bg-[#f9f7f4] py-20 sm:py-24"
				aria-labelledby="services-overview-heading"
			>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<SectionHeading
						id="services-overview-heading"
						eyebrow="EXPLORE DIGITALSAFARIS"
						title="Everything a great journey needs."
						description="Start with the part of your trip you are planning. Explore the options, then continue to the service that works for you."
					/>

					<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
						{SERVICES_DATA.map((service, index) => {
							const visual = serviceVisuals[service.id];
							if (!visual) return null;
							const Icon = visual.icon;
							const title =
								service.id === "food"
									? "Food & dining"
									: service.badge.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());

							return (
								<Link
									key={service.id}
									to={service.href}
									aria-label={`Explore ${title}`}
									className="group flex min-h-[410px] flex-col overflow-hidden rounded-[22px] border border-[#e6d7c1] bg-[linear-gradient(120deg,#fffaf1,#f1e5d3)] shadow-[0_6px_22px_rgba(47,37,25,.045)] transition duration-300 hover:-translate-y-1 hover:border-[#d3b88f] hover:shadow-[0_18px_40px_rgba(47,37,25,.12)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#855016]"
								>
									<div className="relative h-[190px] overflow-hidden bg-[#e8dfd3]">
										<img
											src={visual.image}
											alt=""
											aria-hidden="true"
											loading="lazy"
											decoding="async"
											className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
										/>
										<div
											className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10"
											aria-hidden="true"
										/>
										<span className="absolute left-4 top-4 rounded-full border border-white/35 bg-black/25 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.14em] text-white backdrop-blur-md">
											{service.number} / 04
										</span>
										<span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-xl border border-white/30 bg-black/25 text-white backdrop-blur-md">
											<Icon className="h-5 w-5" aria-hidden="true" />
										</span>
									</div>

									<div className="flex flex-1 flex-col p-5 sm:p-6">
										<p className="text-[9px] font-bold uppercase tracking-[.17em] text-[#a06a34]">
											{service.badge}
										</p>
										<h3 className="mt-2 text-lg font-bold tracking-[-.015em] text-[#211f1b]">
											{title}
										</h3>
										<p className="mt-2 line-clamp-3 text-xs leading-[1.75] text-[#6b655c] sm:text-[13px]">
											{service.subtitle}
										</p>

										<div className="mt-4 flex flex-wrap gap-1.5">
											{service.pills.slice(0, 2).map((pill) => (
												<span
													className="rounded-full bg-[#f6f1e9] px-2.5 py-1 text-[10px] font-medium text-[#71685b]"
													key={pill}
												>
													{pill}
												</span>
											))}
										</div>

										<span className="mt-auto inline-flex items-center justify-between gap-3 border-t border-[#eee8df] pt-4 text-[10px] font-bold uppercase tracking-[.1em] text-[#8b531f]">
											Explore {title}
											<span className="grid h-8 w-8 place-items-center rounded-full bg-[#f6ead7] transition-colors group-hover:bg-[#eddbbe]">
												<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
											</span>
										</span>
									</div>
								</Link>
							);
						})}
					</div>

					<div className="mt-8 text-center">
						<Link
							to="/services"
							className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#d8cfc2] bg-white/70 px-5 text-xs font-bold text-[#554a3b] transition hover:border-[#bf9e70] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#855016]"
						>
							View all services
							<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
						</Link>
					</div>
				</div>
			</section>

			<section
				className="bg-[#f9f7f4] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
				aria-labelledby="business-callout-heading"
			>
				<div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-[#e6d7c1] bg-[linear-gradient(120deg,#fffaf1,#f1e5d3)] px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
					<div
						className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-[#d8bf9a]/45 sm:-right-8 sm:-top-28"
						aria-hidden="true"
					/>
					<div
						className="pointer-events-none absolute -right-8 -top-12 h-48 w-48 rounded-full border border-[#d8bf9a]/35"
						aria-hidden="true"
					/>

					<div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
						<div className="max-w-3xl">
							<p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#995f28] sm:text-[11px]">
								<Check className="h-4 w-4" aria-hidden="true" />
								For hospitality businesses
							</p>
							<h2
								id="business-callout-heading"
								className="mt-3 font-['Cormorant_Garamond',Georgia,'Times_New_Roman',serif] text-[clamp(2.3rem,4.3vw,3.8rem)] leading-[1] font-semibold tracking-[-.025em] text-[#211f1b]"
							>
								Bring your business closer to the journey.
							</h2>
							<p className="mt-4 max-w-2xl text-sm leading-[1.8] text-[#625d55] sm:text-base">
								Join a platform built to connect travelers with local
								accommodation, dining, transport, and experience providers.
							</p>
						</div>

						<div className="flex flex-col gap-3 sm:flex-row lg:min-w-[220px] lg:flex-col">
							<Link
								to="/partner-registration"
								className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#8b531f] px-6 text-xs font-bold uppercase tracking-[.08em] text-white transition hover:bg-[#6e4119] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b531f]"
							>
								Become a partner
								<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
							</Link>
							<Link
								to="/businesses"
								className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#d6c3a7] bg-white/65 px-6 text-xs font-bold uppercase tracking-[.08em] text-[#514638] transition hover:border-[#b9976b] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b531f]"
							>
								Explore partner benefits
								<ArrowRight className="h-4 w-4" aria-hidden="true" />
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default HomePage;
