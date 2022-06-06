import IllustrationFirst from "@/public/img/hero/IllustrationFirst.svg";
import IllustrationSecond from "@/public/img/hero/IllustrationSecond.svg";
import IllustrationThird from "@/public/img/hero/IllustrationThird.svg";
import useTranslation from "next-translate/useTranslation";

function Advantage() {
  const { t } = useTranslation();
  return (
    <div className="advantage">
      <div className="container mx-auto">
        <div className="row align-items-center">
          <div className="col text-center">
            <IllustrationFirst />
            <h2 className="mt-4">1257</h2>
            <h4>
              Top <br /> Courses
            </h4>
            <span>
              Take courses from the world’s best instructors and universities.{" "}
            </span>
          </div>
          <div className="col text-center">
            <IllustrationSecond />
            <h2 className="mt-4">99981</h2>
            <h4>
              Happy <br /> Learners
            </h4>
            <span>Learners from all around the world.</span>
          </div>
          <div className="col text-center">
            <IllustrationThird />
            <h2 className="mt-4">578</h2>
            <h4>
              Eminent <br />
              Instructors
            </h4>
            <span>
              Learn your favourite course with world-class instructors.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Advantage;
