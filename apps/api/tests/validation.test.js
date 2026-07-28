const assert = require("node:assert/strict");
const { describe, it } = require("node:test");

const {
  createCommentSchema,
} = require("../src/validations/comment.validation");
const { contactSchema } = require("../src/validations/contact.validation");

describe("validation des commentaires", () => {
  it("supprime les espaces autour du contenu", () => {
    const result = createCommentSchema.parse({
      content: "  Une réponse utile.  ",
    });

    assert.equal(result.content, "Une réponse utile.");
  });

  it("refuse un commentaire vide", () => {
    const result = createCommentSchema.safeParse({ content: "   " });

    assert.equal(result.success, false);
  });

  it("refuse les propriétés inattendues", () => {
    const result = createCommentSchema.safeParse({
      content: "Une réponse utile.",
      role: "admin",
    });

    assert.equal(result.success, false);
  });
});

describe("validation du contact", () => {
  it("accepte un message valide", () => {
    const result = contactSchema.safeParse({
      email: "lectrice@example.com",
      message: "Bonjour, voici mon message pour Stratusse.",
    });

    assert.equal(result.success, true);
  });

  it("refuse une adresse email invalide", () => {
    const result = contactSchema.safeParse({
      email: "adresse-invalide",
      message: "Bonjour, voici mon message pour Stratusse.",
    });

    assert.equal(result.success, false);
  });
});
