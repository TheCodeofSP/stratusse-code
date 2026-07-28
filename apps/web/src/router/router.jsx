import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout.jsx";
import AppLayout from "../layouts/AppLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

import ProtectedRoute from "../guards/ProtectedRoute.jsx";
import CreatorRoute from "../guards/CreatorRoute.jsx";
import AdminRoute from "../guards/AdminRoute.jsx";

const pageModules = import.meta.glob("../pages/**/*.jsx");
const lazyPage = (path) => lazy(pageModules[path]);

const Home = lazyPage("../pages/Home/Home.jsx");
const Login = lazyPage("../pages/Auth/Login.jsx");
const Notes = lazyPage("../pages/Note/Notes.jsx");
const NoteDetail = lazyPage("../pages/Note/NoteDetail.jsx");
const Library = lazyPage("../pages/Library/Library.jsx");
const LibraryDetail = lazyPage("../pages/Library/LibraryDetail.jsx");
const LibraryBookGroup = lazyPage("../pages/Library/LibraryBookGroup.jsx");
const Register = lazyPage("../pages/Auth/Register.jsx");
const RegisterSuccess = lazyPage("../pages/Auth/RegisterSuccess.jsx");
const VerifyEmail = lazyPage("../pages/Auth/VerifyEmail.jsx");
const Welcome = lazyPage("../pages/Auth/Welcome.jsx");
const ForgotPassword = lazyPage("../pages/Auth/ForgotPassword.jsx");
const ResetPassword = lazyPage("../pages/Auth/ResetPassword.jsx");
const Profile = lazyPage("../pages/Profile/Profile.jsx");
const ProfileWritings = lazyPage("../pages/Profile/ProfileWritings.jsx");
const ProfileNotesList = lazyPage("../pages/Profile/ProfileNotesList.jsx");
const ProfileLibraryList = lazyPage("../pages/Profile/ProfileLibraryList.jsx");
const CreatorRequest = lazyPage("../pages/Profile/CreatorRequest.jsx");
const ProfileSettings = lazyPage("../pages/Profile/ProfileSettings.jsx");
const CreatorProfile = lazyPage("../pages/Profile/CreatorProfile.jsx");
const Editor = lazyPage("../pages/Editor/Editor.jsx");
const NoteEditor = lazyPage("../pages/Editor/NoteEditor.jsx");
const LibraryEditor = lazyPage("../pages/Editor/LibraryEditor.jsx");
const PublicationSuccess = lazyPage(
  "../pages/Editor/PublicationSuccess.jsx",
);
const AdminDashboard = lazyPage("../pages/Admin/AdminDashboard.jsx");
const AdminUsers = lazyPage("../pages/Admin/AdminUsers.jsx");
const AdminContent = lazyPage("../pages/Admin/AdminContent.jsx");
const AdminContentNotes = lazyPage("../pages/Admin/AdminContentNotes.jsx");
const AdminContentLibrary = lazyPage(
  "../pages/Admin/AdminContentLibrary.jsx",
);
const AdminContentComments = lazyPage(
  "../pages/Admin/AdminContentComments.jsx",
);
const AdminContentLibraryComments = lazyPage(
  "../pages/Admin/AdminContentLibraryComments.jsx",
);
const AdminCreatorRequests = lazyPage(
  "../pages/Admin/AdminCreatorRequests.jsx",
);
const AdminActions = lazyPage("../pages/Admin/AdminActions.jsx");
const AdminUserActions = lazyPage("../pages/Admin/AdminUserActions.jsx");
const AdminUserDetail = lazyPage("../pages/Admin/AdminUserDetail.jsx");
const AdminUserNotes = lazyPage("../pages/Admin/AdminUserNotes.jsx");
const AdminUserLibrary = lazyPage("../pages/Admin/AdminUserLibrary.jsx");
const AdminUserComments = lazyPage("../pages/Admin/AdminUserComments.jsx");
const AdminUserLibraryComments = lazyPage(
  "../pages/Admin/AdminUserLibraryComments.jsx",
);
const AdminContentNoteDetail = lazyPage(
  "../pages/Admin/AdminContentNoteDetail.jsx",
);
const AdminContentLibraryDetail = lazyPage(
  "../pages/Admin/AdminContentLibraryDetail.jsx",
);
const AdminCreatorRequestDetail = lazyPage(
  "../pages/Admin/AdminCreatorRequestDetail.jsx",
);
const About = lazyPage("../pages/public/About.jsx");
const Contact = lazyPage("../pages/public/Contact.jsx");
const Charter = lazyPage("../pages/public/Charter.jsx");
const ObserverToCreator = lazyPage("../pages/public/ObserverToCreator.jsx");
const Care = lazyPage("../pages/public/Care.jsx");
const NotFound = lazyPage("../pages/NotFound/NotFound.jsx");
const LegalNotice = lazyPage("../pages/Legal/LegalNotice.jsx");
const PrivacyPolicy = lazyPage("../pages/Legal/PrivacyPolicy.jsx");
const TermsOfUse = lazyPage("../pages/Legal/TermsOfUse.jsx");
const CookiePolicy = lazyPage("../pages/Legal/CookiePolicy.jsx");

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/register-success", element: <RegisterSuccess /> },
      { path: "/notes", element: <Notes /> },
      { path: "/notes/:slug", element: <NoteDetail /> },
      { path: "/library", element: <Library /> },
      { path: "/library/books/:bookSlug", element: <LibraryBookGroup /> },
      { path: "/library/:id", element: <LibraryDetail /> },
      { path: "/about", element: <About /> },
      { path: "/observer-to-creator", element: <ObserverToCreator /> },
      { path: "/care", element: <Care /> },
      { path: "/contact", element: <Contact /> },
      { path: "/charter", element: <Charter /> },
      { path: "/verify-email", element: <VerifyEmail /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-password", element: <ResetPassword /> },
      { path: "/creator/:pseudo", element: <CreatorProfile /> },
      { path: "/legal-notice", element: <LegalNotice /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/terms-of-use", element: <TermsOfUse /> },
      { path: "/cookie-policy", element: <CookiePolicy /> },
    ],
  },

  {
    element: <AppLayout />,
    children: [
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/creator-request",
        element: (
          <ProtectedRoute>
            <CreatorRequest />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/writings",
        element: (
          <ProtectedRoute>
            <ProfileWritings />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/notes",
        element: (
          <ProtectedRoute>
            <ProfileNotesList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/library",
        element: (
          <ProtectedRoute>
            <ProfileLibraryList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/editor",
        element: (
          <ProtectedRoute>
            <Editor />
          </ProtectedRoute>
        ),
      },
      {
        path: "/editor/note",
        element: (
          <CreatorRoute>
            <NoteEditor />
          </CreatorRoute>
        ),
      },
      {
        path: "/editor/note/:id",
        element: (
          <CreatorRoute>
            <NoteEditor />
          </CreatorRoute>
        ),
      },
      {
        path: "/editor/library",
        element: (
          <CreatorRoute>
            <LibraryEditor />
          </CreatorRoute>
        ),
      },
      {
        path: "/editor/library/:id",
        element: (
          <CreatorRoute>
            <LibraryEditor />
          </CreatorRoute>
        ),
      },
      {
        path: "/shared",
        element: (
          <CreatorRoute>
            <PublicationSuccess />
          </CreatorRoute>
        ),
      },
      {
        path: "/profile/settings",
        element: (
          <ProtectedRoute>
            <ProfileSettings />
          </ProtectedRoute>
        ),
      },
      {
        path: "/welcome",
        element: (
          <ProtectedRoute>
            <Welcome />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/content",
        element: (
          <AdminRoute>
            <AdminContent />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/content/notes",
        element: (
          <AdminRoute>
            <AdminContentNotes />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/content/library",
        element: (
          <AdminRoute>
            <AdminContentLibrary />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/content/comments",
        element: (
          <AdminRoute>
            <AdminContentComments />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/content/library-comments",
        element: (
          <AdminRoute>
            <AdminContentLibraryComments />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/users",
        element: (
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/creator-requests",
        element: (
          <AdminRoute>
            <AdminCreatorRequests />
          </AdminRoute>
        ),
      },

      {
        path: "/admin/creator-requests/:id",
        element: (
          <AdminRoute>
            <AdminCreatorRequestDetail />
          </AdminRoute>
        ),
      },

      {
        path: "/admin/actions",
        element: (
          <AdminRoute>
            <AdminActions />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/users/:id/actions",
        element: (
          <AdminRoute>
            <AdminUserActions />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/users/:id",
        element: (
          <AdminRoute>
            <AdminUserDetail />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/users/:id/notes",
        element: (
          <AdminRoute>
            <AdminUserNotes />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/users/:id/library",
        element: (
          <AdminRoute>
            <AdminUserLibrary />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/users/:id/comments",
        element: (
          <AdminRoute>
            <AdminUserComments />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/users/:id/library-comments",
        element: (
          <AdminRoute>
            <AdminUserLibraryComments />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/content/notes/:id",
        element: (
          <AdminRoute>
            <AdminContentNoteDetail />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/content/library/:id",
        element: (
          <AdminRoute>
            <AdminContentLibraryDetail />
          </AdminRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
