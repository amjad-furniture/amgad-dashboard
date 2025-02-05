import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../Common Components/Modal/Modal";

function Logout() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const confirmLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.amgadfurniture.com/auth/logout", {
        method: "POST",
        headers: {
          accept: "*/*",
          Authorization: localStorage.getItem("access token"),
        },
      });

      const result = await response.json();
      if (response.ok) {
        setLoading(false);
        localStorage.clear();
        setShowModal(false);
        navigate("/");
      } else {
        setLoading(false);
        console.error("Failed to log out:", result.error);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center">
        <img src="/assets/images/logout.png" alt="logout" width="20px" className="me-3" />
        <p
          className="fw-bolder text-danger ps-3 pe-3 pt-3"
          onClick={ () => setShowModal(true) }
          style={ { cursor: "pointer" } }
        >
          تسجيل الخروج
        </p>
      </div>

      { showModal && (
        <Modal isOpen={ showModal } onClose={ () => setShowModal(false) }>
          <div className="ps-5 pe-5 pt-5 pb-4">
            <div className="text-center">
              <img src="/assets/images/logout-2-svgrepo-com.png" alt="logout" />
            </div>
            <div>
              <p className="text-center fw-bolder fs-6 mt-4">
                هل انت متأكد من تسجيل الخروج
              </p>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <button
                className="fw-bolder mt-2"
                style={ {
                  backgroundColor: "#FF5C5C",
                  border: "none",
                  color: "#fff",
                  height: "50px",
                  padding: "10px",
                  width: "300px",
                  borderRadius: "10px",
                } }
                onClick={ confirmLogout }
              >
                { loading ? "جاري التحميل....." : "نعم تسجيل الخروج" }
              </button>
              <button
                className="mt-4 fw-bolder"
                style={ { backgroundColor: "transparent", border: "none" } }
                onClick={ () => setShowModal(false) }
              >
                الغاء
              </button>
            </div>
          </div>
        </Modal>
      ) }
    </div>
  );
}

export default Logout;
