import Events from "@/components/events";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Nav from "@/components/nav/Nav";
import WhyChooseUs from "@/components/why-choose-us";

export default function Home() {
	return (
		<>
			<Nav />
			<Hero />
			<Events />
			<WhyChooseUs />
			<Footer />
		</>
	);
}
