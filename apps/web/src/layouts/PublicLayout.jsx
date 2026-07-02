import { Outlet } from "react-router-dom";

import Navigation from "../components/layout/Navigation.jsx";
import Footer from "../components/layout/Footer.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";

export default function PublicLayout() {
  return (
    <div className="app">
      <ScrollToTop />
      <Navigation />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
