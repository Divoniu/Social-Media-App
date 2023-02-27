import "./App.css";

import { DataProvider } from "./context/DataContext";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { Layout } from "./components/Layout";
import { UsersPage } from "./pages/UsersPage";
import { SingleUserPage } from "./components/UsersPages/SingleUserPage";
import DataContext from "./context/DataContext";
import { MyProfile } from "./components/UsersPages/MyProfile";
import { NotFound } from "./pages/NotFound";
function App() {
  return (
    <>
      <DataProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/me" element={<MyProfile />}></Route>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/friends" element={<UsersPage />} />
            <Route path="/friends/:userId" element={<SingleUserPage />} />
            {/* user/:id o sa trebuiasca sa pun linkuri la lista chat-uri sa ma duca la profilurile lor */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </DataProvider>
    </>
  );
}

export default App;
