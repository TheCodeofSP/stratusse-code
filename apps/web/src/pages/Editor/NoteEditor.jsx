import { useParams } from "react-router-dom";

import NoteEditorForm from "../../components/editor/NoteEditorForm.jsx";

import { editorContent } from "../../content/editor.content.js";

export default function NoteEditor() {
  const { id } = useParams();

  const noteEditorContent = editorContent.noteEditor;

  return (
    <section className="page-section">
      <header className="page-header">
        <h1>{noteEditorContent.page.title}</h1>

        <p className="text-muted">{noteEditorContent.page.subtitle}</p>
      </header>

      <NoteEditorForm noteId={id} />
    </section>
  );
}
