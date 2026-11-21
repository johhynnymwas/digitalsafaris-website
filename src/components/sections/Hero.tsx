import React from "react";
import {
	ArrowRight,
	ArrowUpRight,
	BedDouble,
	CarFront,
	Compass,
	MapPin,
	Utensils,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteConfig } from "../../context/SiteConfigContext";
import { LINKS } from "../../utils/links";
import { SERVICES_DATA } from "../../utils/constants";

const serviceIcons = {
	accommodation: BedDouble,
	food: Utensils,
	transport: CarFront,
	experiences: Compass,
} as const;

export const Hero: React.FC = () => {
	const config = useSiteConfig();
	const customerUrl = LINKS.getCustomerUrl(config);

	return (
		<section className="relative isolate overflow-hidden bg-[#211b15]">
			<div
				aria-hidden="true"
				className="absolute inset-0 -z-20 bg-cover bg-[center_48%] bg-no-repeat"
				style={{ backgroundImage: "url('/hero-bg.jpg')" }}
			/>
			<div
				aria-hidden="true"
				className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(17,14,11,.74)_0%,rgba(24,18,12,.56)_48%,rgba(21,17,13,.28)_100%),linear-gradient(0deg,rgba(15,13,10,.34),transparent_58%)]"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_76%_34%,rgba(244,174,79,.2),transparent_38%),linear-gradient(180deg,rgba(255,214,142,.08),transparent_30%)]"
			/>

			<div className="mx-auto grid min-h-[660px] max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.08fr)_minmax(390px,.92fr)] lg:gap-16 lg:px-8 lg:py-24">
				<div className="max-w-2xl text-center lg:text-left">
					<p className="mx-auto inline-flex items-center gap-2 rounded-full border border-amber-200/30 bg-black/25 px-4 py-2 text-[10px] font-bold uppercase tracking-[.18em] text-amber-100 shadow-sm backdrop-blur-md sm:text-[11px] lg:mx-0">
						<Compass className="h-4 w-4 text-[#f0aa56]" aria-hidden="true" />
						Explore Kenya, your way
					</p>

					<h1 className="mt-6 font-['Cormorant_Garamond',Georgia,'Times_New_Roman',serif] text-[clamp(3.2rem,5.8vw,5.5rem)] leading-[.94] font-semibold tracking-[-.045em] text-white">
						Your journey.
						<br />
						<span className="text-[#f0aa56]">More connected.</span>
					</h1>
					<p className="mx-auto mt-6 max-w-xl text-[15px] leading-[1.8] text-white/80 sm:text-lg lg:mx-0">
						Discover stays, local food, transport, and memorable experiences
						across Kenya—all in one place to plan your next adventure.
					</p>

					<div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
						<a
							href={customerUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c47c2b] px-6 text-xs font-bold uppercase tracking-[.1em] text-white shadow-[0_12px_30px_rgba(0,0,0,.2)] transition hover:-translate-y-0.5 hover:bg-[#b06d20] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
						>
							Start your journey
							<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
						</a>
						<Link
							to="/how-it-works"
							className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/35 bg-white/[.06] px-6 text-xs font-bold uppercase tracking-[.1em] text-white transition hover:border-white/70 hover:bg-white/[.12] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
						>
							How it works
							<ArrowRight className="h-4 w-4" aria-hidden="true" />
						</Link>
					</div>

					<div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-white/70 lg:justify-start">
						<span className="inline-flex items-center gap-2">
							<MapPin className="h-4 w-4 text-[#f0aa56]" aria-hidden="true" />
							Made for exploring Kenya
						</span>
						<span className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline-block" />
						<span>Plan stays, meals, rides &amp; experiences</span>
					</div>
				</div>

				<div className="mx-auto w-full max-w-[500px] lg:ml-auto">
					<div className="relative overflow-hidden rounded-[28px] border border-amber-100/25 bg-[#211b15]/65 p-5 shadow-[0_32px_100px_rgba(0,0,0,.32)] backdrop-blur-2xl sm:p-7">
						<div
							className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f0aa56]/80 to-transparent"
							aria-hidden="true"
						/>
						<div className="flex items-start justify-between gap-4 border-b border-white/15 pb-5">
							<div>
								<p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#f0aa56]">
									One platform
								</p>
								<h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
									Build a journey that feels like yours.
								</h2>
							</div>
							<span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-amber-100/20 bg-[#c47c2b]/20 text-[#ffc878] shadow-[0_0_24px_rgba(196,124,43,.16)]">
								<Compass size={21} aria-hidden="true" />
							</span>
						</div>

						<div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
							{SERVICES_DATA.map((service, index) => {
								const Icon = serviceIcons[service.id as keyof typeof serviceIcons];
								const title =
									service.id === "food"
										? "Food & dining"
										: service.badge.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());

								return (
									<Link
										key={service.id}
										to={service.href}
										className="group flex min-h-[92px] items-center gap-3 rounded-2xl border border-white/[.14] bg-white/[.09] p-4 text-left transition hover:border-amber-200/50 hover:bg-white/[.15] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0aa56]"
									>
										<span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-amber-100/10 bg-gradient-to-br from-[#d69743]/35 to-[#c47c2b]/10 text-[#ffc878]">
											<Icon className="h-5 w-5" aria-hidden="true" />
										</span>
										<span className="min-w-0 flex-1">
											<span className="block text-[9px] font-bold tracking-[.12em] text-white/45">
												0{index + 1}
											</span>
											<span className="mt-1 block text-sm font-semibold text-white">
												{title}
											</span>
										</span>
										<ArrowUpRight className="h-4 w-4 shrink-0 text-white/45 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#f0aa56]" aria-hidden="true" />
									</Link>
								);
							})}
						</div>

						<p className="mt-5 text-center text-[11px] leading-relaxed text-white/55 sm:text-left">
							From where you stay to how you get around, discover the pieces
							that make a trip memorable.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
