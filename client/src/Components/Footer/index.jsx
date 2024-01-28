import React from "react";
import NasaLogo from "../../Containers/Logo";
import style from "./index.module.css";

const Footer = () => {
  const RenderLogoInfo = () => (
    <div className={style.nasaLogo}>
      <div>
        <NasaLogo />
      </div>
      <div>
        <p>
          <b>National Aeronautics and Space Administration</b>
        </p>
        <p>
          <b>NASA Official:</b> NASA Office of Communications
        </p>
      </div>
    </div>
  );

  const LinksData = [
    {
      name: "USAGE GUIDELINES",
      url: "http://www.nasa.gov/audience/formedia/features/MP_Photo_Guidelines.html",
    },
    {
      name: "PRIVACY",
      url: "http://www.nasa.gov/about/highlights/HP_Privacy.html",
    },
    { name: "FOIA", url: "http://www.nasa.gov/FOIA/index.html" },
    {
      name: "CONTACT NASA",
      url: "https://www.nasa.gov/about/contact/index.html",
    },
    {
      name: "API DOCS",
      url: "https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf",
    },
  ];

  const RenderLinks = () => (
    <>
      <nav>
        <ul className={style.ulStyle}>
          {LinksData &&
            LinksData.map((data) => (
              <li key={data.url}>
                <a href={data.url} target="_blank"  rel="noopener noreferrer">
                  {data.name}
                </a>
              </li>
            ))}
        </ul>
      </nav>
    </>
  );

  return (
    <footer className={style.footerMargin}>
      <div className={style.LogoAndLinks}>
        <RenderLogoInfo />
        <RenderLinks />
      </div>
    </footer>
  );
};

export default Footer;
