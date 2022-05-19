import Header from "@/components/Header/Header";
import Explore from "@/components/Explore/Explore";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";

export default function Home(){
  return(
    <div className="main">
      <Header/>
      <Hero /> 
      <Explore/>
      <Footer />
    </div>
  )
}