import Header from "@/components/Header/Header";
import Explore from "@/components/Explore/Explore";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import Advantage  from "@/components/Hero/Advantage";

export default function Home() {
  return (
    <div className="main">
      <div className="hero-bg align-items-center">
        <Header />
        <Hero />
      </div>
      <Advantage />
      <Explore main={true} />
      <Footer />
    </div>
  );
}
