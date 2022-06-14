import data from "@/public/data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="px-4 py-5 px-md-5 text-center text-lg-start">
        <div className="container">
          <div className="row gx-lg-5">
            <div className="col-lg-4 mb-5 mb-lg-0">
              <Link href="/">
                <a className="text-decoration-none text-primary" style={{fontSize:"26px"}}>A-Engineer</a>
              </Link>
            </div>

            <div className="col-lg-4 mb-5 mb-lg-0">
              <h6 className="text-primary mb-2">
                {t("common:Footer.FirstColumn.UsefulLinks")}
              </h6>
              <p>
                <Link href="/">
                  <a className="text-decoration-none text-reset text-white">
                    {t("common:Footer.FirstColumn.Home")}
                  </a>
                </Link>
              </p>
              <p>
                <Link href="/signin">
                  <a className="text-decoration-none text-reset text-white">
                    {t("common:Footer.FirstColumn.SignIn")}
                  </a>
                </Link>
              </p>
              <p>
                <Link href="/admin/signup">
                  <a className="text-decoration-none text-reset text-white">
                    {t("common:Footer.FirstColumn.Admin")}
                  </a>
                </Link>
              </p>
            </div>

            <div className="col-lg-4 mb-5 mb-lg-0">
              <h6 className="text-primary">
                {t("common:Footer.SecondColumn.OurLocation")}
              </h6>
              <div className="d-flex align-items-center ">
                <FontAwesomeIcon icon={faLocationDot} />
                <p className="m-2 px-2">
                  {t("common:Footer.SecondColumn.Address")}
                </p>
              </div>
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faPhone} />
                <p className="m-2 px-2">+7 705 414 33 55</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
