import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar";

function DashboardLog() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      navigate("/dashboard");
    } else {
      const storedUsername = sessionStorage.getItem("userName");
      setUsername(storedUsername);
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div>
      <Sidebar/>
      {/* <Create/>
      <br />
      <View />
      <br />
      <Report /> */}
      
    </div>
  );
}

export default DashboardLog;
