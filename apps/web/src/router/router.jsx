import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout.jsx";
import AppLayout from "../layouts/AppLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

import Home from "../pages/Home/Home.jsx";
import Login from "../pages/Auth/Login.jsx";
import Notes from "../pages/Note/Notes.jsx";
import NoteDetail from "../pages/Note/NoteDetail.jsx";
import Library from "../pages/Library/Library.jsx";
import LibraryDetail from "../pages/Library/LibraryDetail.jsx";
import LibraryBookGroup from "../pages/Library/LibraryBookGroup.jsx";

import Register from "../pages/Auth/Register.jsx";
import RegisterSuccess from "../pages/Auth/RegisterSuccess.jsx";
import VerifyEmail from "../pages/Auth/VerifyEmail.jsx";
import Welcome from "../pages/Auth/Welcome.jsx";
import ForgotPassword from "../pages/Auth/ForgotPassword.jsx";
import ResetPassword from "../pages/Auth/ResetPassword.jsx";

import Profile from "../pages/Profile/Profile.jsx";
import ProfileWritings from "../pages/Profile/ProfileWritings.jsx";
import ProfileNotesList from "../pages/Profile/ProfileNotesList.jsx";
import ProfileLibraryList from "../pages/Profile/ProfileLibraryList.jsx";
import CreatorRequest from "../pages/Profile/CreatorRequest.jsx";
import ProfileSettings from "../pages/Profile/ProfileSettings.jsx";

import Editor from "../pages/Editor/Editor.jsx";
import NoteEditor from "../pages/Editor/NoteEditor.jsx";
import LibraryEditor from "../pages/Editor/LibraryEditor.jsx";
import PublicationSuccess from "../pages/Editor/PublicationSuccess.jsx";

import AdminDashboard from "../pages/Admin/AdminDashboard.jsx";
import AdminUsers from "../pages/Admin/AdminUsers.jsx";
import AdminContent from "../pages/Admin/AdminContent.jsx";
import AdminContentNotes from "../pages/Admin/AdminContentNotes.jsx";
import AdminContentLibrary from "../pages/Admin/AdminContentLibrary.jsx";
import AdminContentComments from "../pages/Admin/AdminContentComments.jsx";
import AdminContentLibraryComments from "../pages/Admin/AdminContentLibraryComments.jsx";
import AdminCreatorRequests from "../pages/Admin/AdminCreatorRequests.jsx";
import AdminActions from "../pages/Admin/AdminActions.jsx";
import AdminUserActions from "../pages/Admin/AdminUserActions.jsx";
import AdminUserDetail from "../pages/Admin/AdminUserDetail.jsx";
import AdminUserNotes from "../pages/Admin/AdminUserNotes.jsx";
import AdminUserLibrary from "../pages/Admin/AdminUserLibrary.jsx";
import AdminUserComments from "../pages/Admin/AdminUserComments.jsx";
import AdminUserLibraryComments from "../pages/Admin/AdminUserLibraryComments.jsx";
import AdminContentNoteDetail from "../pages/Admin/AdminContentNoteDetail.jsx";
import AdminContentLibraryDetail from "../pages/Admin/AdminContentLibraryDetail.jsx";
import AdminCreatorRequestDetail from "../pages/Admin/AdminCreatorRequestDetail.jsx";

import ProtectedRoute from "../guards/ProtectedRoute.jsx";
import CreatorRoute from "../guards/CreatorRoute.jsx";
import AdminRoute from "../guards/AdminRoute.jsx";

import About from "../pages/public/About.jsx";
import Contact from "../pages/public/Contact.jsx";
import Charter from "../pages/public/Charter.jsx";
import CreatorProfile from "../pages/Profile/CreatorProfile.jsx";
import ObserverToCreator from "../pages/public/ObserverToCreator.jsx";
import Care from "../pages/public/Care.jsx";

import NotFound from "../pages/NotFound/NotFound.jsx";

import LegalNotice from "../pages/Legal/LegalNotice.jsx";
import PrivacyPolicy from "../pages/Legal/PrivacyPolicy.jsx";
import TermsOfUse from "../pages/Legal/TermsOfUse.jsx";
import CookiePolicy from "../pages/Legal/CookiePolicy.jsx";

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
