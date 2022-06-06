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
              {t("common:Home.AdvantagesSection.FirstColumn.titleFirst")} <br />
              {t("common:Home.AdvantagesSection.FirstColumn.titleSecond")}
            </h4>
            <span>{t("common:Home.AdvantagesSection.FirstColumn.text")}</span>
          </div>
          <div className="col text-center">
            <IllustrationSecond />
            <h2 className="mt-4">99981</h2>
            <h4>
              {t("common:Home.AdvantagesSection.SecondColumn.titleFirst")}
              <br />
              {t("common:Home.AdvantagesSection.SecondColumn.titleSecond")}
            </h4>
            <span>{t("common:Home.AdvantagesSection.SecondColumn.text")}</span>
          </div>
          <div className="col text-center">
            <IllustrationThird />
            <h2 className="mt-4">578</h2>
            <h4>
              {t("common:Home.AdvantagesSection.ThirdColumn.titleFirst")}
              <br />
              {t("common:Home.AdvantagesSection.ThirdColumn.titleSecond")}
            </h4>
            <span>{t("common:Home.AdvantagesSection.ThirdColumn.text")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Advantage;
