import data from "@/public/data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone,  } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer className="footer">
      <div className="px-4 py-5 px-md-5 text-center text-lg-start">
        <div className="container">
          <div className="row gx-lg-5">
            <div className="col-lg-4 mb-5 mb-lg-0">
              <h5 className="text-primary">E-Portal</h5>
            </div>

            <div className="col-lg-4 mb-5 mb-lg-0">
              <h6 className="text-primary mb-2">Useful links</h6>
              <p>
                <a href="/" className="text-decoration-none text-reset text-white">
                  Home
                </a>
              </p>
              <p>
                <a href="/signin" className="text-decoration-none text-reset text-white">
                  SignIn
                </a>
              </p>
            </div>

            <div className="col-lg-4 mb-5 mb-lg-0">
              <h6 className="text-primary">Our location</h6>
              <div className="d-flex align-items-center ">
                <FontAwesomeIcon icon={faLocationDot} />
                <p className="m-2 px-2">Nur-Sultan, A. Jangeldın kóshesi, 123А</p>
              </div>
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faPhone} />
                <p className="m-2 px-2">87054143355</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
