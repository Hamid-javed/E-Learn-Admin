import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/header";
import Sidebar from "../components/layout/sidebar";

const mainLayout = () => {
  return (
    <div className="flex">
      <Header />
      <Sidebar />
      <div className="pt-16 lg:pl-56 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default mainLayout;
