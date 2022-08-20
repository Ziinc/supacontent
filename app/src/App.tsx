import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Navigate,
  useParams,
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import ContentPage from "./pages/ContentPage";
import SettingsPage from "./pages/SettingsPage";
import AssetsPage from "./pages/AssetsPage";
import { client } from "./utils";
import Auth from "./components/Auth";
import ListContent from "./pages/content/ListContent";
import EditContentType from "./pages/content/EditContentType";
import Home from "./pages/Home";
import ContentTypesPage from "./pages/ContentTypesPage";
import ContentTypesOnboarding from "./interfaces/ContentTypes/ContentTypesOnboarding";
import { Project } from "./types";
import { AuthUser } from "@supabase/supabase-js";
import NewProjectPage from "./pages/NewProjectPage";
import ProjectSettingsPage from "./pages/ProjectSettingsPage";
import NewContentType from "./pages/NewContentType";
import ShowContentType from "./pages/ShowContentType";

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
const App = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState<AuthUser>(null);
  const [projects, setProjects] = useState<Project[]>(null);
  const [appContext, setAppContext] = useState({});
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
    const { data } = await client.from("supacontent_projects").select();
    setProjects(data);
  };

  useEffect(() => {
    startup();
  }, [user]);

  const startup = async () => {
    if (user) {
      const { data } = await client.from("supacontent_projects").select();
      if (data.length === 0) {
        // create default project
        const { data: newProject } = await client
          .from("supacontent_projects")
          .insert(
            {
              name: "Untitled Project",
              user_id: user.id,
            },
            { returning: "minimal" }
          );
        console.log(newProject);
        // navigate(`/projects/${newProject.id}`);
      } 
      refreshProjects();
    }
  };

  

  // if (params?.project_id && projects.length > 0) {
  //   return <Navigate to={`/projects/${projects[0].id}`} />;
  // }
  return (
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
                <Route path="type/:content_type_id" element={<ListContent />} />
                {/* <Route path="/projects/:project_id/content/types/:id" element={<ListContent />} />
                  <Route
                    path="/projects/:project_id/content/types/:id/edit"
                    element={<EditContentType />}
                  />
                  <Route
                    path="/projects/:project_id/content/types/:id/view"
                    element={<EditContentType />}
                  />
                  <Route
                    path="/projects/:project_id/content/types/:type_id/new"
                    element={<>Creating new content</>}
                  /> */}
              </Route>
              <Route path="content-types" element={<ContentTypesPage />}>
                <Route path="new" element={<NewContentType />} />
                <Route path=":content_type_id" element={<ShowContentType />} />
                <Route index element={<ContentTypesOnboarding />} />
              </Route>
            </Route>
            <Route path="settings" element={<SettingsPage />} />
          </Routes>
        )}
      </main>
    </AppContext.Provider>
  );
};

export default App;
