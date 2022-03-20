import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import AddClientForm from "./components/clients/AddClientForm";
import AddProjectForm from "./components/projects/AddProjectForm";
import UpdateClientForm from "./components/clients/UpdateClientForm";
import ClientManager from "./components/clients/ClientManager";
import ProjectManager from "./components/projects/ProjectManager";
import SingleProject from "./components/projects/SingleProject";
import UpdateProjectFrom from "./components/projects/UpdateProjectForm.jsx";
import TaskManager from "./components/tasks/TaskManager";
import StaffManager from "./components/staff/StaffManager";
import AddTaskForm from "./components/tasks/AddTaskForm";
import AddStaffForm from "./components/staff/AddStaffForm";
import UpdateStaffForm from "./components/staff/UpdateStaffForm";
import AddPageForm from "./components/pages/AddPageForm";
import AddSectionForm from "./components/sections/AddSectionForm";
import AddSelectorForm from "./components/selectors/AddSelector";
import AddSubSection from "./components/subSections/AddSubSection";
import SinglePage from "./components/pages/SinglePage";
import SingleSection from "./components/sections/SingleSection";
import UpdatePageForm from "./components/pages/UpdatePageForm";
import UpdateSectionForm from "./components/sections/UpdateSectionForm";
import UpdateSelectorForm from "./components/selectors/UpdateSelectorForm";
import Home from "./components/Home";

function App() {
  return (
    <div className="App flex-center">
      <Routes>
        <Route
          path="/new-client"
          element={
            <Layout>
              <AddClientForm />
            </Layout>
          }
        />
        <Route
          path="/update-client/:clientId"
          element={
            <Layout>
              <UpdateClientForm />
            </Layout>
          }
        />
        <Route
          path="/client-manager"
          element={
            <Layout>
              <ClientManager />
            </Layout>
          }
        />
        <Route
          path="/update-project/:projectId"
          element={
            <Layout>
              <UpdateProjectFrom />
            </Layout>
          }
        />
        <Route
          path="/new-project"
          element={
            <Layout>
              <AddProjectForm />
            </Layout>
          }
        />
        <Route
          path="/project-manager"
          element={
            <Layout>
              <ProjectManager />
            </Layout>
          }
        />
        <Route
          path="/task-manager"
          element={
            <Layout>
              <TaskManager />
            </Layout>
          }
        />
        <Route
          path="/new-task"
          element={
            <Layout>
              <AddTaskForm />
            </Layout>
          }
        />
        <Route
          path="/staff-manager"
          element={
            <Layout>
              <StaffManager />
            </Layout>
          }
        />
        <Route
          path="/new-staff"
          element={
            <Layout>
              <AddStaffForm />
            </Layout>
          }
        />
        <Route
          path="/update-staff/:staffId"
          element={
            <Layout>
              <UpdateStaffForm />
            </Layout>
          }
        />
        <Route
          path="/new-page/:projectId"
          element={
            <Layout>
              <AddPageForm />
            </Layout>
          }
        />
        <Route
          path="/pages/:pageName/:pageId"
          element={
            <Layout>
              <SinglePage />
            </Layout>
          }
        />
        <Route
          path="/update-page/:pageId"
          element={
            <Layout>
              <UpdatePageForm />
            </Layout>
          }
        />
        <Route
          path="/projects/:projectName/:projectId"
          element={
            <Layout>
              <SingleProject />
            </Layout>
          }
        />
        <Route
          path="/new-section/:pageId"
          element={
            <Layout>
              <AddSectionForm />
            </Layout>
          }
        />
        <Route
          path="/update-section/:sectionId"
          element={
            <Layout>
              <UpdateSectionForm />
            </Layout>
          }
        />
        <Route
          path="/sections/:sectionName/:sectionId"
          element={
            <Layout>
              <SingleSection />
            </Layout>
          }
        />
        <Route
          path="/new-selector/:sectionId"
          element={
            <Layout>
              <AddSelectorForm />
            </Layout>
          }
        />
        <Route
          path="/update-selector/:selectorId"
          element={
            <Layout>
              <UpdateSelectorForm />
            </Layout>
          }
        />
        {/* <Route
          path="/new-selector/subsection/:subsectionId"
          element={
            <Layout>
              <AddSelectorForm section />
            </Layout>
          }
        /> */}
        <Route
          path="/new-subsection/:sectionId"
          element={
            <Layout>
              <AddSubSection />
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
