import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { navigationContent } from "../../content/navigation.content.js";
import { useAuth } from "../../contexts/AuthContext.jsx";

import "../../styles/layouts/navigation.scss";

export default function Navigation() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isWriteOpen, setIsWriteOpen] = useState(false);

  const profileMenuRef = useRef(null);
  const writeMenuRef = useRef(null);
  const navigationRef = useRef(null);

  const canWrite = user?.role === "creator" || user?.role === "admin";

  const closeMenu = () => {
    setIsOpen(false);
    setIsProfileOpen(false);
    setIsWriteOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navigationRef.current &&
        !navigationRef.current.contains(event.target)
      ) {
        closeMenu();
        return;
      }

      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }

      if (
        writeMenuRef.current &&
        !writeMenuRef.current.contains(event.target)
      ) {
        setIsWriteOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navigation" ref={navigationRef}>
      <div className="navigation__container">
        <div className="navigation__top">
          <div className="navigation__left">
            <NavLink to="/" className="navigation__brand" onClick={closeMenu}>
              <img src="/LogoStratusse.svg" alt="Stratusse" />
            </NavLink>
            <p className="navigation__slogan">{navigationContent.slogan}</p>
          </div>
          <button
            className={`navigation__burger ${isOpen ? "is-open" : ""}`}
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={
              isOpen
                ? navigationContent.aria.closeMenu
                : navigationContent.aria.openMenu
            }
            aria-expanded={isOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className={`navigation__menu ${isOpen ? "is-open" : ""}`}>
          <div className="navigation__links">
            {navigationContent.publicLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className="navigation__link"
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            ))}

            {isAuthenticated && canWrite ? (
              <div className="navigation__profile" ref={writeMenuRef}>
                <button
                  className="navigation__link navigation__profile-button"
                  type="button"
                  onClick={() => setIsWriteOpen((prev) => !prev)}
                >
                  <span>{navigationContent.writeMenu.label}</span>

                  <span
                    className={`navigation__profile-arrow ${
                      isWriteOpen ? "is-open" : ""
                    }`}
                  >
                    ▸
                  </span>
                </button>

                {isWriteOpen && (
                  <div className="navigation__submenu">
                    {navigationContent.writeMenu.links.map((link) => (
                      <NavLink
                        key={link.path}
                        to={link.path}
                        className="navigation__submenu-link"
                        onClick={closeMenu}
                      >
                        {link.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/editor"
                className="navigation__link"
                onClick={closeMenu}
              >
                {navigationContent.writeMenu.label}
              </NavLink>
            )}

            {isAuthenticated && (
              <div className="navigation__profile" ref={profileMenuRef}>
                <button
                  className="navigation__link navigation__profile-button"
                  type="button"
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                >
                  <span>{navigationContent.profileMenu.label}</span>

                  <span
                    className={`navigation__profile-arrow ${
                      isProfileOpen ? "is-open" : ""
                    }`}
                  >
                    ▸
                  </span>
                </button>

                {isProfileOpen && (
                  <div className="navigation__submenu">
                    {navigationContent.profileMenu.links.map((link) => (
                      <NavLink
                        key={link.path}
                        to={link.path}
                        className="navigation__submenu-link"
                        onClick={closeMenu}
                      >
                        {link.label}
                      </NavLink>
                    ))}

                    {user?.role === "admin" && (
                      <NavLink
                        to={navigationContent.profileMenu.adminLink.path}
                        className="navigation__submenu-link"
                        onClick={closeMenu}
                      >
                        {navigationContent.profileMenu.adminLink.label}
                      </NavLink>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="navigation__auth">
            {!isAuthenticated ? (
              navigationContent.authLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className="navigation__link"
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              ))
            ) : (
              <button
                className="navigation__link"
                type="button"
                onClick={() => {
                  logout();

                  toast.success(navigationContent.logout.successMessage);

                  closeMenu();

                  navigate(navigationContent.logout.redirectTo);
                }}
              >
                {navigationContent.logout.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
