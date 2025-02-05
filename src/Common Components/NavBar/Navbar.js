import React, { useState } from "react";
import "./Navbar.css";
import Logout from "../../Auth/LogOut/Logout";

function Navbar({ title, date }) {
  const [options, setOptions] = useState(false);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="d-flex align-items-center justify-content-around navbarContainer">
      <div>
        <div>
          <div>
            <p className="mb-0 fw-bolder">لوحة التحكم</p>
          </div>
          {/* Title */}
          <p className="fw-bolder mb-0">{title}</p>

          {/* Date */}
          {date && (
            <p className="mb-0">
              <span className=" " style={{ fontSize: "", color: "#000" }}>
                {formattedDate}
              </span>
            </p>
          )}
        </div>
      </div>
      <div
        className="d-flex align-items-center position-relative"
        
      >
        <img
          src="/assets/images/user-circle-svgrepo-com 1.png"
          alt="personal"
          width={"35px"}
        />
        <p
        onClick={() => setOptions((prev) => !prev)}
        style={{ cursor: "pointer" }}
          className="mt-3 me-3 ms-3"
        >
          {localStorage.getItem("username")}
        </p>
        <img
          src="/assets/images/arrow-down-svgrepo-com.png"
          alt="arrow"
        />
        <div>
          {" "}
          {options && (
            <div className="logoutOption">
              <Logout />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Navbar;