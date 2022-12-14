import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import ContentPage from "./pages/ContentPage";
import SettingsPage from "./pages/SettingsPage";
import { client, supacontent } from "./utils";
import Auth from "./components/Auth";
import ListContent from "./pages/content/ListContent";
import Home from "./pages/Home";
import ContentTypesPage from "./pages/ContentTypesPage";
import ContentTypesOnboarding from "./interfaces/ContentTypes/ContentTypesOnboarding";
import { Project } from "./types";
import { AuthUser } from "@supabase/supabase-js";
import NewProjectPage from "./pages/NewProjectPage";
import ProjectSettingsPage from "./pages/ProjectSettingsPage";
import NewContentType from "./pages/NewContentType";
import ShowContentType from "./pages/ShowContentType";
import ShowContent from "./pages/ShowContent";

interface IAppContext {
  projects: Project[] | null;
  currentProject: Project;
  user: AuthUser;
  refreshProjects: () => void;
}
const AppContext = createContext<IAppContext>({
  projects: null,
  currentProject: null,
  user: null,
  refreshProjects: () => null,
});

export const useAppContext = () => useContext(AppContext);
const App = ({ base_path = "" }) => {
  const [user, setUser] = useState<AuthUser>(null);
  const [projects, setProjects] = useState<Project[]>(null);
  useEffect(() => {
    const session = client.auth.session();
    setUser(session?.user ?? null);

    const { data: authListener } = client.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user;
        setUser(currentUser ?? null);
      }
    );

    return () => authListener?.unsubscribe();
  }, [user]);

  const refreshProjects = async () => {
    const { data } = await supacontent.from("projects").select();
    setProjects(data);
  };

  useEffect(() => {
    startup();
  }, [user]);

  const startup = async () => {
    if (user) {
      const { data } = await supacontent.from("projects").select();
      if (data.length === 0) {
        // create default project
        const { data: newProject } = await supacontent
          .from("projects")
          .insert(
            {
              name: "Untitled Project",
              user_id: user.id,
            },
            { returning: "minimal" }
          );
      }
      refreshProjects();
    }
  };
  return (
    <BrowserRouter basename={process.env.BASE_PATH || undefined}>
      <AppContext.Provider
        value={{
          projects,
          user,
          refreshProjects,
          currentProject: null,
        }}
      >
        <main className="flex flex-col h-screen ">
          {!user ? (
            <Auth />
          ) : (
            <Routes>
              {projects && projects.length > 0 && (
                <Route
                  path="/"
                  element={
                    <Navigate to={`/projects/${projects[0].id}`} replace />
                  }
                />
              )}
              <Route path="/projects/new" element={<NewProjectPage />} />
              <Route path="/projects/:project_id" element={<BaseLayout />}>
                <Route index element={<Home />} />
                <Route path="settings" element={<ProjectSettingsPage />} />
                <Route path="content" element={<ContentPage />}>
                  <Route index element={<ListContent />} />
                  <Route
                    path="type/:content_type_id"
                    element={<ListContent />}
                  />
                  <Route
                    path="type/:content_type_id/edit/:content_id"
                    element={<ShowContent />}
                  />
                </Route>
                <Route path="content-types" element={<ContentTypesPage />}>
                  <Route path="new" element={<NewContentType />} />
                  <Route
                    path=":content_type_id"
                    element={<ShowContentType />}
                  />
                  <Route index element={<ContentTypesOnboarding />} />
                </Route>
              </Route>
              <Route path="settings" element={<SettingsPage />} />
            </Routes>
          )}
        </main>
      </AppContext.Provider>
    </BrowserRouter>
  );
};

export default App;
