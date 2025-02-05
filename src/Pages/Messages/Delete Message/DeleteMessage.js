import React, { useState } from "react";
import Modal from "../../../Common Components/Modal/Modal";
import "./DeleteMessage.css";
function DeleteMessage({ id, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const deleteMessage = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://104.248.251.235:8080/support/${id}/`,
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
        setShowModal(true);
        window.location.reload();
        console.log("success delete");
        onDelete(id);
      } else {
        console.log("failed to delete message");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during delete:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <p
        className="fw-bolder text-danger mt-3 me-2"
        onClick={() => {
          console.log("فتح المودال");
          setShowModal(true);
        }}
        style={{ cursor: "pointer", textAlign: "right" }}
      >
        حذف الرسالة
      </p>

      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="" style={{ width: "400px" }}>
            <div>
              <button
                className="fs-5"
                onClick={() => setShowModal(false)}
                style={{
                  float: "right",
                  border: "none",
                  background: "transparent",
                  padding: "20px",
                }}
              >
                X
              </button>
            </div>
            <div className="text-center">
              <img
                src="/assets/images/Frame 6356147.png"
                alt="delete message"
                className="mt-5 ms-5"
                width={"150px"}
              />
            </div>
            <p className="text-center fw-bolder mt-4 mb-3 fs-5 p-3">
              هل انت متأكد من حذف الرسالة؟
            </p>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <button onClick={deleteMessage} className="delete-message">
                {loading ? "جاري التحميل..." : "حذف الرسالة"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="cancel-delete mb-4"
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
export default DeleteMessage;