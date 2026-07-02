import LegalPage from "../../components/legal/LegalPage.jsx";
import { legalContent } from "../../content/legal.content.js";

export default function PrivacyPolicy() {
  return <LegalPage {...legalContent.privacyPolicy} />;
}