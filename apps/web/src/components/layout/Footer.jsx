import { Link } from "react-router-dom";

import { footerContent } from "../../content/footer.content.js";

import "../../styles/layouts/footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="page-container footer__container">
        <div className="footer__top">
          <div className="footer__brand">
            <p className="footer__signature">{footerContent.signature}</p>

            <p className="footer__text ">{footerContent.text}</p>
          </div>

          <div className="footer__columns">
            <nav className="footer__nav">
              <h2>{footerContent.discover.title}</h2>

              {footerContent.discover.links.map((link) => (
                <Link key={link.path} to={link.path}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <nav className="footer__nav">
              <h2>{footerContent.participate.title}</h2>

              {footerContent.participate.links.map((link) => (
                <Link key={link.path} to={link.path}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <nav className="footer__nav">
              <h2>{footerContent.information.title}</h2>

              {footerContent.information.links.map((link) => (
                <Link key={link.path} to={link.path}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <nav className="footer__nav">
              <h2>{footerContent.legal.title}</h2>

              {footerContent.legal.links.map((link) => (
                <Link key={link.path} to={link.path}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="footer__bottom">
          <span>{footerContent.bottomText}</span>

          <a
            href="https://thecodeofsp.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__credit"
            aria-label="Voir le portfolio The Code of SP"
          >
            <span>Une application imaginée et développée par</span>
            <img
              src="/LogoTheCodeOfSP.svg"
              alt="The Code of SP"
              className="footer__credit-logo"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
