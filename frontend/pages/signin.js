import Header from "@/components/Header/Header";
import SignIn from "@/components/SignIn/SignIn";
import Footer from "@/components/Footer/Footer";

export default function Home(){
  return(
    <div className="main">
      <Header/>
      <SignIn/>
      <Footer />
    </div>
  )
}