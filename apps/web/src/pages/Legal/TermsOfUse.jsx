import LegalPage from "../../components/legal/LegalPage.jsx";
import { legalContent } from "../../content/legal.content.js";

export default function TermsOfUse() {
  return <LegalPage {...legalContent.termsOfUse} />;
}