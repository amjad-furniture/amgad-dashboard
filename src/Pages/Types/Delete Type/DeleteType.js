import React, { useState } from "react";
import "./DeleteType.css";
import Modal from "../../../Common Components/Modal/Modal";

function DeleteType({ id, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://104.248.251.235:8080/categories/${id}/`,
        {
          method: "DELETE",
          headers: {
            accept: "*/*",
            Authorization: localStorage.getItem("access token"),
          },
        }
      );
  
      if (response.ok) {
        setLoading(false);
        setShowModal(false);
        window.location.reload();
        console.log("success delete");
        if (onDelete) onDelete(id);
      } else {
        const result = await response.json().catch(() => null);
        console.log("failed delete", result);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  
  return (
    <div>
      <p
        className="mb-0 text-danger fw-bolder"
        style={{ cursor: "pointer", border: "none" }}
        onClick={() => setShowModal(true)}
      >
        حذف النوع
      </p>
      {showModal && (
        <Modal isOpen={showModal}>
          <div
            style={{
              width: "400px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <img
                src="/assets/images/Frame 6356147.png"
                alt="delete"
                className="mt-4"
              />
            </div>
            <p style={{ border: "none" }} className=" fw-bolder fs-5 mt-5">
              هل أنت متأكد من حذف هذا النوع
            </p>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <button
                className="mt-3"
                onClick={handleDelete}
                style={{
                  width: "300px",
                  border: "none",
                  borderRadius: "10px",
                  height: "50px",
                  color: "#fff",
                  backgroundColor: "#cb0b0b",
                  fontWeight: "bolder",
                }}
              >
                {loading ? "جاري  التحميل...." : "نعم  , حذف "}
              </button>
              <button
                style={{
                  border: "none",
                  fontWeight: "bolder",
                  marginTop: "10px",
                  backgroundColor: "transparent",
                }}
                onClick={() => setShowModal(false)}
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
export default DeleteType;