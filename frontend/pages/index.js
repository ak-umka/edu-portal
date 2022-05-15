import Header from "@/components/Header/Header";
import Explore from "@/components/Explore/Explore";
import Footer from "@/components/Footer/Footer";

export default function Home(){
  return(
    <div className="main">
      <Header/>
      <Explore/>
      <Footer />
    </div>
  )
}