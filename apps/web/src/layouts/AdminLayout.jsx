import { NavLink, Outlet } from "react-router-dom";

import Navigation from "../components/layout/Navigation.jsx";
import Footer from "../components/layout/Footer.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";

import { layoutContent } from "../content/layout.content.js";

import "../styles/layouts/admin-layout.scss";

export default function AdminLayout() {
  return (
    <>
      <ScrollToTop />
      <Navigation />

      <main className="main-content admin-layout">
        <aside className="admin-sidebar">
          {layoutContent.admin.sidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className="admin-sidebar__link"
            >
              {link.label}
            </NavLink>
          ))}
        </aside>

        <section className="admin-layout__content">
          <Outlet />
        </section>
      </main>

      <Footer />
    </>
  );
}
