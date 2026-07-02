import { profileContent } from "../../content/profile.content.js";

import ChangePasswordForm from "../../components/profile/ChangePasswordForm.jsx";
import DeleteAccountSection from "../../components/profile/DeleteAccountSection.jsx";
import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";

import "../../styles/pages/profile-settings.scss";

export default function ProfileSettings() {
  return (
    <section className="page-section profile-settings-page">
      <header className="page-header">
        <span className="eyebrow">{profileContent.settings.hero.eyebrow}</span>

        <h1>{profileContent.settings.hero.title}</h1>

        <p className="text-muted">{profileContent.settings.hero.subtitle}</p>
      </header>

      <div className="paper-card profile-settings-card">
        <h2>{profileContent.settings.password.title}</h2>

        <ChangePasswordForm />
      </div>

      <div className="paper-card profile-settings-card profile-settings-card--danger">
        <h2>{profileContent.settings.deleteAccount.title}</h2>

        <p className="text-muted">
          {profileContent.settings.deleteAccount.text}
        </p>

        <DeleteAccountSection />
      </div>

      <PageFooterNavigation
        backTo={profileContent.settings.footer.backTo}
        backLabel={profileContent.settings.footer.backLabel}
      />
    </section>
  );
}
