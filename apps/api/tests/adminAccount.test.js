const assert = require("node:assert/strict");
const { afterEach, describe, it, mock } = require("node:test");

const User = require("../src/models/User");
const {
  updateUserRole,
  toggleUserBan,
} = require("../src/services/admin.service");
const { deleteMyAccount } = require("../src/services/profile.service");

const createAdminDocument = () => ({
  _id: "admin-target",
  role: "admin",
  isBanned: false,
  isDeleted: false,
  save: mock.fn(async () => undefined),
  populate: mock.fn(async function populate() {
    return this;
  }),
});

afterEach(() => mock.restoreAll());

describe("protection des comptes Gardien", () => {
  it("refuse de retirer le rôle du dernier Gardien actif", async () => {
    mock.method(User, "findById", async () => createAdminDocument());
    mock.method(User, "countDocuments", async () => 1);

    await assert.rejects(
      updateUserRole({
        userId: "admin-target",
        role: "observer",
        adminId: "admin-actor",
      }),
      /LAST_ADMIN_PROTECTED/,
    );
  });

  it("refuse de bannir son propre compte Gardien", async () => {
    await assert.rejects(
      toggleUserBan({
        userId: "admin-actor",
        isBanned: true,
        adminId: "admin-actor",
      }),
      /CANNOT_UPDATE_OWN_BAN/,
    );
  });

  it("refuse la suppression d’un compte Gardien depuis son profil", async () => {
    mock.method(User, "findById", async () => createAdminDocument());

    await assert.rejects(
      deleteMyAccount({ userId: "admin-target" }),
      /ADMIN_ACCOUNT_DELETION_FORBIDDEN/,
    );
  });
});
