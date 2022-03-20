import Header from "./Header";
import "./layout.css";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="layout flex-simple">
      <Sidebar />
      <div className="layout__main-content">
        <Header />
        <div className="layout__children">
          <div className="layout__children-container center">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
