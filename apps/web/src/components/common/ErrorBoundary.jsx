import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="ui-state">
          <section className="ui-state-card" role="alert">
            <h1>La page n’a pas pu s’afficher</h1>
            <p>
              Une erreur inattendue est survenue. Tu peux actualiser la page
              ou revenir à l’accueil.
            </p>
            <a className="btn btn-primary" href="/">
              Revenir à l’accueil
            </a>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
