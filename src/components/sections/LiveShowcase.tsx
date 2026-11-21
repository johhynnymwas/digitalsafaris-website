import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
	ArrowUpRight,
	BedDouble,
	MapPin,
	Star,
	Utensils,
} from "lucide-react";
import searchApi, { type WebProperty, type WebRestaurant } from "../../api/searchApi";

const ROTATE_MS = 5_000;
const REFRESH_MS = 5 * 60_000;
const APP_BASE = "https://app.digitalsafaris.co.ke";
const actionLinkClass =
	"mt-auto inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full border border-[#8b5b30] bg-[#8b5b30] px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm transition-colors hover:border-[#70451f] hover:bg-[#70451f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b5b30]";

const MONGO_ID = /^[a-f0-9]{24}$/i;
const isRealTown = (town?: string | null): town is string =>
	typeof town === "string" && town.trim().length > 0 && !MONGO_ID.test(town.trim());

type LiveListing =
	| {
			id: string;
			kind: "stay";
			name: string;
			town: string;
			detail: string;
			image: string | null;
			rating: number | null;
			totalRatings: number;
			price: number | null;
			currency: string;
	  }
	| {
			id: string;
			kind: "restaurant";
			name: string;
			town: string;
			detail: string;
			image: string | null;
			rating: number | null;
			totalRatings: number;
			price: null;
			currency: string;
	  };

function toStayListing(property: WebProperty): LiveListing | null {
	if (!property._id || !property.name?.trim() || !isRealTown(property.town)) return null;
	const rating =
		typeof property.rating === "number" &&
		Number.isFinite(property.rating) &&
		property.rating > 0
			? property.rating
			: null;

	return {
		id: `stay-${property._id}`,
		kind: "stay",
		name: property.name.trim(),
		town: property.town.trim(),
		detail: property.type?.replace(/_/g, " ") || "Accommodation",
		image: property.coverImage ?? property.images?.[0] ?? null,
		rating,
		totalRatings:
			typeof property.totalRatings === "number" && Number.isFinite(property.totalRatings)
				? property.totalRatings
				: 0,
		price:
			typeof property.minPrice === "number" &&
			Number.isFinite(property.minPrice) &&
			property.minPrice >= 100
				? property.minPrice
				: null,
		currency: property.currency || "KES",
	};
}

function toRestaurantListing(restaurant: WebRestaurant): LiveListing | null {
	if (!restaurant._id || !restaurant.name?.trim() || !isRealTown(restaurant.town)) return null;
	const cuisine = restaurant.cuisineTypes?.find((item) => item.trim());
	const rating =
		typeof restaurant.rating === "number" &&
		Number.isFinite(restaurant.rating) &&
		restaurant.rating > 0
			? restaurant.rating
			: null;

	return {
		id: `restaurant-${restaurant._id}`,
		kind: "restaurant",
		name: restaurant.name.trim(),
		town: restaurant.town.trim(),
		detail: cuisine ? cuisine.replace(/_/g, " ") : "Restaurant",
		image: restaurant.coverImage ?? restaurant.logo ?? null,
		rating,
		totalRatings:
			typeof restaurant.totalRatings === "number" &&
			Number.isFinite(restaurant.totalRatings)
				? restaurant.totalRatings
				: 0,
		price: null,
		currency: "KES",
	};
}

function RotationBar({ tick }: { tick: number }) {
	return (
		<div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden bg-black/[.06]">
			<div
				key={tick}
				className="h-full origin-left bg-[#a8753d]"
				style={{ animation: `growBar ${ROTATE_MS}ms linear forwards` }}
			/>
		</div>
	);
}

function ListingCard({ listing, tick }: { listing: LiveListing; tick: number }) {
	const isStay = listing.kind === "stay";
	const Icon = isStay ? BedDouble : Utensils;
	const appUrl = `${APP_BASE}/${isStay ? "accommodation" : "restaurant"}`;

	return (
		<article
			className="relative flex min-w-0 flex-col overflow-hidden rounded-[24px] border border-[#e6d7c1] bg-[linear-gradient(120deg,#fffaf1,#f1e5d3)] shadow-[0_6px_22px_rgba(47,37,25,.045)] transition duration-200 hover:-translate-y-0.5 hover:border-[#d3b88f] hover:shadow-[0_12px_30px_rgba(47,37,25,.09)]"
			aria-label={`${isStay ? "Accommodation" : "Restaurant"}: ${listing.name}`}
		>
			<div className="relative h-44 overflow-hidden bg-gradient-to-br from-[#fff7eb] to-[#f4e2c7]">
				{listing.image ? (
					<img
						key={listing.image}
						src={listing.image}
						alt=""
						aria-hidden="true"
						loading="lazy"
						decoding="async"
						className="absolute inset-0 h-full w-full object-cover animate-[fadeIn_.35s_ease]"
					/>
				) : (
					<div className="absolute inset-0 grid place-items-center">
						<Icon className="h-12 w-12 text-[#a8753d]/55" aria-hidden="true" />
					</div>
				)}
				<span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#79522c] shadow-sm backdrop-blur">
					<Icon className="h-3 w-3" aria-hidden="true" />
					{isStay ? "Featured stay" : "Featured restaurant"}
				</span>
			</div>

			<div className="flex min-h-[190px] flex-1 flex-col space-y-3 p-5">
				<div className="min-w-0">
					<h3 className="truncate text-lg font-bold text-content-strong">
						{listing.name}
					</h3>
					<p className="mt-1 flex items-center gap-1 truncate text-xs capitalize text-content-muted">
						<MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
						{listing.town} <span aria-hidden="true">·</span> {listing.detail}
					</p>
				</div>

				<div className="flex min-h-[1.125rem] items-center gap-2 text-xs text-content-muted">
					{listing.rating !== null ? (
						<>
							<Star
								className="h-3.5 w-3.5 fill-amber-brand text-amber-brand"
								aria-hidden="true"
							/>
							<span>{listing.rating.toFixed(1)}</span>
							{listing.totalRatings > 0 ? (
								<span className="text-[#9e978e]">({listing.totalRatings})</span>
							) : null}
						</>
					) : (
						<span className="text-[#81796f]">New on DigitalSafaris</span>
					)}
				</div>

				<div className="min-h-[1.25rem] text-sm text-content-strong">
					{listing.price !== null ? (
						<>
							From{" "}
							<span className="font-bold">
								{listing.currency} {listing.price.toLocaleString()}
							</span>{" "}
							<span className="text-xs text-[#81796f]">/ night</span>
						</>
					) : (
						<span className="text-xs text-[#81796f]">
							Open the app to view current details
						</span>
					)}
				</div>

				<a
					href={appUrl}
					target="_blank"
					rel="noopener noreferrer"
					className={actionLinkClass}
				>
					{isStay ? "Explore stay" : "Explore restaurant"}
					<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
				</a>
			</div>

			<RotationBar tick={tick} />
		</article>
	);
}

export const LiveShowcase: React.FC = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const [stayListings, setStayListings] = useState<LiveListing[]>([]);
	const [restaurantListings, setRestaurantListings] = useState<LiveListing[]>([]);
	const [loading, setLoading] = useState(true);
	const [errors, setErrors] = useState<string[]>([]);
	const [tick, setTick] = useState(0);
	const [isVisible, setIsVisible] = useState(false);
	const [reducedMotion, setReducedMotion] = useState(false);

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;
		if (!("IntersectionObserver" in window)) {
			setIsVisible(true);
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => setIsVisible(entry.isIntersecting),
			{ threshold: 0.1 },
		);
		observer.observe(section);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
		const updatePreference = () => setReducedMotion(preference.matches);
		updatePreference();
		preference.addEventListener("change", updatePreference);
		return () => preference.removeEventListener("change", updatePreference);
	}, []);

	useEffect(() => {
		if (!isVisible || reducedMotion) return;
		const interval = window.setInterval(() => setTick((current) => current + 1), ROTATE_MS);
		return () => window.clearInterval(interval);
	}, [isVisible, reducedMotion]);

	useEffect(() => {
		let cancelled = false;
		let hasLoaded = false;

		const loadListings = async () => {
			const [staysResult, restaurantsResult] = await Promise.allSettled([
				searchApi.accommodations({ limit: 18 }),
				searchApi.restaurants({ limit: 18 }),
			]);
			if (cancelled) return;

			const nextErrors: string[] = [];

			if (staysResult.status === "fulfilled") {
				setStayListings(
					staysResult.value.data
						.map(toStayListing)
						.filter((listing): listing is LiveListing => listing !== null),
				);
			} else {
				nextErrors.push("Accommodation listings could not be refreshed.");
				console.error("Could not load live accommodation listings.", staysResult.reason);
			}

			if (restaurantsResult.status === "fulfilled") {
				setRestaurantListings(
					restaurantsResult.value.data
						.map(toRestaurantListing)
						.filter((listing): listing is LiveListing => listing !== null),
				);
			} else {
				nextErrors.push("Restaurant listings could not be refreshed.");
				console.error("Could not load live restaurant listings.", restaurantsResult.reason);
			}

			setErrors(nextErrors);
			if (!hasLoaded) {
				setLoading(false);
				hasLoaded = true;
			}
		};

		void loadListings();
		const refreshInterval = window.setInterval(() => {
			void loadListings();
		}, REFRESH_MS);

		return () => {
			cancelled = true;
			window.clearInterval(refreshInterval);
		};
	}, []);

	const listings = useMemo(
		() => [...stayListings, ...restaurantListings],
		[restaurantListings, stayListings],
	);

	const featuredListings = useMemo(() => {
		if (listings.length === 0) return [];
		const visibleCount = Math.min(3, listings.length);
		const start = (tick * visibleCount) % listings.length;
		return Array.from(
			{ length: visibleCount },
			(_, index) => listings[(start + index) % listings.length],
		);
	}, [listings, tick]);

	return (
		<section
			ref={sectionRef}
			className="bg-[#f9f7f4] py-20"
			aria-labelledby="live-showcase-heading"
		>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-12 space-y-3 text-center sm:mb-14">
					<span className="inline-flex items-center gap-2 rounded-full bg-card-warm px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-brand">
						<span
							className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#5f7d5d]"
							aria-hidden="true"
						/>
						Live on DigitalSafaris
					</span>
					<h2
						id="live-showcase-heading"
						className="text-3xl font-extrabold tracking-tight sm:text-5xl"
					>
						Real partners. <span className="text-amber-brand">Real services.</span>
					</h2>
					<p className="mx-auto max-w-xl text-sm leading-relaxed text-[#5e5950] sm:text-base">
						Explore current accommodation and restaurant listings, updated
						directly from DigitalSafaris.
					</p>
				</div>

				{loading ? (
					<p className="py-12 text-center text-sm text-content-muted" role="status">
						Loading live partner listings…
					</p>
				) : null}

				{errors.length > 0 ? (
					<p
						className="mb-5 text-center text-xs text-[#775a39]"
						role="status"
						aria-live="polite"
					>
						{errors.join(" ")}
					</p>
				) : null}

				{!loading && listings.length === 0 ? (
					<p className="py-12 text-center text-sm text-content-muted" role="status">
						Live listings are temporarily unavailable. Please check back soon.
					</p>
				) : null}

				{featuredListings.length > 0 ? (
					<div
						className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
						aria-live="off"
					>
						{featuredListings.map((listing) => (
							<ListingCard key={listing.id} listing={listing} tick={tick} />
						))}
					</div>
				) : null}

				<div className="mt-10 text-center">
					<Link
						to="/services"
						className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-brand underline-offset-4 hover:underline"
					>
						See everything DigitalSafaris offers
						<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
					</Link>
				</div>
			</div>
		</section>
	);
};
