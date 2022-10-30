import UpdateData from "@/components/user/UpdateData";
import Router from "next/router";
import React from "react";

const Settings = () => {
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <UpdateData />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
