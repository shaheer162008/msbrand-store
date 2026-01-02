import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Preloader from "@/components/home/Preloader";
import HeroSection from "@/components/home/HeroSection";
import WelcomeCTA from "@/components/home/WelcomeCTA";
import FlashDeals from "@/components/home/FlashDeals";
import ServiceCard from "@/components/home/ServiceCard";

export default function Home() {
  return (
   <>
 {/*NAVBAR - Top Navigation*/}
      <Navbar />

      {/*PRELOADER - Loading Screen*/}
      <Preloader duration={800} />

      {/*MAIN CONTENT*/}
      <main>
        {/* HERO SECTION - Animated Carousel */}
        <HeroSection />

        {/* WELCOME CTA */}
        <WelcomeCTA />

        {/* FLASH DEALS SECTION */}
        <FlashDeals />

        {/* SERVICE CARDS GRID */}
        <section className="mt-32 max-w-[1440px] mx-auto px-8 grid lg:grid-cols-3 gap-8">
          <ServiceCard
            image="/food-hub.jpg"
            title="Food Hub"
            description="Hot favorites delivered in 15 mins."
            buttonText="Order Food"
            href="/food-hub"
          />
          <ServiceCard
            image="/hero-cover.jpg"
            title="Grocery"
            description="Daily staples to your kitchen."
            buttonText="Shop Pantry"
            href="/grocery-hub"
          />
          <ServiceCard
            image="/online-shopping.jpg"
            title="Online Shopping"
            description="Get instant access to premium products now"
            buttonText="Shop Products"
            href="/shop"
          />
          <ServiceCard
            image="/pharmacy.jpg"
            title="Pharmacy Products"
            description="Use better pharmacy products from our end"
            buttonText="Explore Pharmacy Store"
            href="/pharmacy-hub"
          />
          <ServiceCard
            image="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop"
            title="Ride Sync"
            description="Safe, clean, and rapid transport."
            buttonText="Book Ride"
            href="/coming-soon"
          />
          <ServiceCard
            image="/parcel.jpg"
            title="Parcel Service"
            description="A secure parcel service with Cash on Delivery and Card Payments Feature"
            buttonText="Try Parcel Service"
            href="/coming-soon"
          />
        </section>
      </main>

      {/*FOOTER - Bottom Navigation*/}
      <Footer />
   </>
  );
}
