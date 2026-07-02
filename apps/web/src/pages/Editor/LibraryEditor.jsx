import { useParams } from "react-router-dom";

import LibraryEditorForm from "../../components/editor/LibraryEditorForm.jsx";

import { editorContent } from "../../content/editor.content.js";

export default function LibraryEditor() {
  const { id } = useParams();

  const libraryEditorContent = editorContent.libraryEditor;

  return (
    <section className="page-section">
      <header className="page-header">
        <h1>{libraryEditorContent.page.title}</h1>

        <p className="text-muted">{libraryEditorContent.page.subtitle}</p>
      </header>

      <LibraryEditorForm bookId={id} />
    </section>
  );
}
