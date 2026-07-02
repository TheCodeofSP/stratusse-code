import { uiContent } from "../../content/ui.content.js";

import "../../styles/components/ui-state.scss";

export default function LoadingState({
  text = uiContent.loading.defaultText,
}) {
  return (
    <div className="ui-state">
      <div className="ui-state__loader" />

      <p className="ui-state__text">{text}</p>
    </div>
  );
}