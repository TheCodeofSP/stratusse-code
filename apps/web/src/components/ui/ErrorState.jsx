import { uiContent } from "../../content/ui.content.js";

import "../../styles/components/ui-state.scss";

export default function ErrorState({ text = uiContent.error.defaultText }) {
  return (
    <div className="paper-card ui-state-card">
      <h3 className="ui-state__title">{uiContent.error.title}</h3>

      <p className="ui-state__text">{text}</p>
    </div>
  );
}