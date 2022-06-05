import Header from "@/components/Header/Header";
import Schedule from "@/components/Explore/Schedule";
import Footer from "@/components/Footer/Footer";

export default function SchedulePage() {
  return (
    <div className="main">
      <div className="schedule-bg align-items-center">
        <Header />
        <Schedule />
      </div>
      <Footer />
    </div>
  );
}
