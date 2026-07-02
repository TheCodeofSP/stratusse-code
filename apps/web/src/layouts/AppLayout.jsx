import { Outlet } from "react-router-dom";

import Navigation from "../components/layout/Navigation.jsx";
import Footer from "../components/layout/Footer.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";

export default function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Navigation />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
