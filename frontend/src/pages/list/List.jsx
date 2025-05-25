import React from "react";
import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import Datatable from "../../components/datatable/Datatable";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <AdminNavbar />
        <Datatable />
      </div>
    </div>
  );
};

export default List;
