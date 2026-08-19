import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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

  const handleMenuLinkClick = (event, path) => {
    event.preventDefault();
    navigate(path);
    closeMenu();
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
              <img
                src="/images/brand/LogoStratusse-header.webp"
                className="navigation__logo"
                alt="Stratusse"
              />
            </NavLink>

            <p className="navigation__slogan">{navigationContent.slogan}</p>
          </div>

          <button
            className={`navigation__burger ${isOpen ? "is-open" : ""}`}
            type="button"
            onClick={() => setIsOpen((previous) => !previous)}
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
                  onClick={() => setIsWriteOpen((previous) => !previous)}
                  aria-expanded={isWriteOpen}
                >
                  <span>{navigationContent.writeMenu.label}</span>

                  <span
                    className={`navigation__profile-arrow ${
                      isWriteOpen ? "is-open" : ""
                    }`}
                    aria-hidden="true"
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
                        onClick={(event) =>
                          handleMenuLinkClick(event, link.path)
                        }
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
                  onClick={() => setIsProfileOpen((previous) => !previous)}
                  aria-expanded={isProfileOpen}
                >
                  <span>{navigationContent.profileMenu.label}</span>

                  <span
                    className={`navigation__profile-arrow ${
                      isProfileOpen ? "is-open" : ""
                    }`}
                    aria-hidden="true"
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
                        onClick={(event) =>
                          handleMenuLinkClick(event, link.path)
                        }
                      >
                        {link.label}
                      </NavLink>
                    ))}

                    {user?.role === "admin" && (
                      <NavLink
                        to={navigationContent.profileMenu.adminLink.path}
                        className="navigation__submenu-link"
                        onClick={(event) =>
                          handleMenuLinkClick(
                            event,
                            navigationContent.profileMenu.adminLink.path,
                          )
                        }
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
                onClick={async () => {
                  await logout();

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
