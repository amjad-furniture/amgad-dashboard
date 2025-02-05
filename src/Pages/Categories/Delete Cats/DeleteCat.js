import React, { useState } from "react";
import "./DeleteCat.css";
import Modal from "../../../Common Components/Modal/Modal";

function DeleteCat({ id, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://104.248.251.235:8080/products/${id}/`,
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
        console.log("Product deleted successfully");
        if (onDelete) onDelete(id);
      } else {
        setLoading(false);
        console.log("Failed to delete product");
        alert("حدث خطأ أثناء حذف المنتج.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error deleting product:", error);
      alert("تعذر حذف المنتج. حاول مرة أخرى.");
    }
  };

  return (
    <div>
      <p
        className="fw-bolder text-danger mb-0 mt-0"
        style={{ textAlign: "right", cursor: "pointer", border: "none" }}
        onClick={() => setShowModal(true)}
      >
        حذف المنتج
      </p>
      {showModal && (
        <Modal isOpen={showModal}>
          <div style={{ width: "380px", padding: "30px" }}>
            <div>
              <img
                src="/assets/images/Frame 6356147.png"
                alt="delete product"
                width={"140px"}
              />
            </div>
            <p className="border-0 fw-bolder mt-4 mb-4 fs-5">
              هل انت متأكد من حذف المنتج؟
            </p>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <button
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
                disabled={loading}
              >
                {loading ? "جاري التحميل..." : "نعم، حذف المنتج"}
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
export default DeleteCat;