import React from "react";
import AdminSidebar from "../../components/sidebar/Sidebar";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import "./AdminHome.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const AdminHome = () => {
  return (
    <div className="home">
      <AdminSidebar />
      <div className="homeContainer">
        <AdminNavbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
