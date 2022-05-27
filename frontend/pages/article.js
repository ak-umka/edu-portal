import Header from "@/components/Header/Header";
import Explore from "@/components/Explore/Explore";
import Footer from "@/components/Footer/Footer";

export default function CreatePage(){
  return(
    <div className="main">
      <Header/>
      <Explore/>
      <Footer />
    </div>
  )
}