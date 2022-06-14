import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

function Hero() {
  const { t } = useTranslation();
  return (
    <div className="hero">
      <div className="px-4 py-5 px-md-5 text-center text-lg-start">
        <div className="container mx-auto">
          <div className="row gx-lg-5 align-items-center justify-content-center">
            <div className="col-8 mb-5 mb-lg-0 text-center">
              <h1>
                <div className="text-primary">
                  {t("common:Home.Hero.titlePrimary")}
                </div>
                {t("common:Home.Hero.title")}
              </h1>
              <div className="row justify-center mt-4">
                <div className="col">
                  <Link href="/schedule">
                    <a className="btn btn-primary">
                      {t("common:Home.Hero.ButtonSchedule")}
                    </a>
                  </Link>
                </div>
                <div className="col">
                  <Link href="/subds">
                    <a className="btn btn-primary">
                      {t("common:Home.Hero.ButtonAssignments")}
                    </a>
                  </Link>
                </div>
                <div className="col">
                  <Link href="/article">
                    <a className="btn btn-primary">
                      {t("common:Home.Hero.ButtonBlogs")}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
