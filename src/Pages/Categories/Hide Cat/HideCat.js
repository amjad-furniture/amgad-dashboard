import React, { useState } from "react";
import "./HideCat.css";
import Modal from "../../../Common Components/Modal/Modal";

function HideCat({ id, isActive, onStatusChange }) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleToggleStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://104.248.251.235:8080/products/${id}/`,
        {
          method: "PATCH",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("access token"),
          },
          body: JSON.stringify({ is_active: !isActive }),
        }
      );
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        setLoading(false);
        setShowModal(false);
        window.location.reload();
        onStatusChange(!isActive);
        console.log(`Product status updated to ${!isActive ? "hidden" : "visible"}.`);
      } else {
        setLoading(false);
        console.error("Failed to update product status");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div>
      <p
        className="fw-bolder pb-2"
        style={{
          textAlign: "right",
          borderBottom: "1px solid lightgray",
          cursor: "pointer",
        }}
        onClick={() => setShowModal(true)}
      >
        {isActive ? "اخفاء" : "عرض المنتج"}
      </p>
      {showModal && (
        <Modal isOpen={showModal}>
          <div style={{ width: "380px", padding: "30px" }}>
            <div className="text-center">
              <img
                src="/assets/images/material-symbols_sms-failed-outline-rounded.png"
                alt="warning"
              />
            </div>
            <p className="border-0 fw-bolder mt-4 mb-4 fs-5">
              {isActive ? "هل تريد اخفاء المنتج؟" : "هل تريد عرض المنتج؟"}
            </p>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <button
                onClick={handleToggleStatus}
                style={{
                  width: "300px",
                  border: "none",
                  borderRadius: "10px",
                  height: "50px",
                  color: "#fff",
                  backgroundColor: "#260701",
                  fontWeight: "bolder",
                }}
              >
                {loading ? "جاري التحميل...." : isActive ? "نعم , اخفاء" : "نعم , عرض المنتج"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  border: "none",
                  fontWeight: "bolder",
                  marginTop: "10px",
                  backgroundColor: "transparent",
                }}
              >
                الغاء
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
export default HideCat;