import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import "./EditType.css";
import Modal from "../../../Common Components/Modal/Modal";

function EditType() {
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const category = state || {};
  const [iconPreview, setIconPreview] = useState(category.icon || "");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      if (values.icon) {
        formData.append("icon", values.icon);
      }

      const response = await fetch(
        `https://api.amgadfurniture.com/categories/${category.id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: localStorage.getItem("access token"),
          },
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        setShowModal(true);
        console.log("Success updated:", result);
      } else {
        setShowModal(false);
        setShowModalError(true);
        console.error("Failed to update:", result);
      }
    } catch (error) {
      setShowModal(false);
      setShowModalError(true);
      console.error("Error updating category:", error);
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    name: category.name || "",
    description: category.description || "",
    icon: null,
  };

  return (
    <div className="editContainer">
      <div
        className="d-flex align-items-center"
        style={ {
          backgroundColor: "#F5F5DC",
          border: "1px solid lightgray",
          borderRadius: "30px",
          padding: "0px 20px",
          width: "200px",
        } }
      >
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.1963 10H19.1963C21.1963 10 22.1963 9 22.1963 7V5C22.1963 3 21.1963 2 19.1963 2H17.1963C15.1963 2 14.1963 3 14.1963 5V7C14.1963 9 15.1963 10 17.1963 10Z"
            stroke="#909090"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.19629 22H7.19629C9.19629 22 10.1963 21 10.1963 19V17C10.1963 15 9.19629 14 7.19629 14H5.19629C3.19629 14 2.19629 15 2.19629 17V19C2.19629 21 3.19629 22 5.19629 22Z"
            stroke="#909090"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.19629 10C8.40543 10 10.1963 8.20914 10.1963 6C10.1963 3.79086 8.40543 2 6.19629 2C3.98715 2 2.19629 3.79086 2.19629 6C2.19629 8.20914 3.98715 10 6.19629 10Z"
            stroke="#909090"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.1963 22C20.4054 22 22.1963 20.2091 22.1963 18C22.1963 15.7909 20.4054 14 18.1963 14C15.9872 14 14.1963 15.7909 14.1963 18C14.1963 20.2091 15.9872 22 18.1963 22Z"
            stroke="#909090"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p className="mt-3 me-2 ms-2 fw-bolder">تعديل النوع</p>
      </div>
      <div className="addTypeForm">
        <Formik initialValues={ initialValues } onSubmit={ handleSubmit }>
          { ({ setFieldValue }) => (
            <Form>
              <div className="d-flex mb-4">
                <div className="ms-5">
                  <label className="d-block mb-2" htmlFor="name">
                    اسم النوع
                  </label>
                  <Field name="name" id="name" />
                </div>
                <div className="me-5">
                  <label className="d-block mb-2" htmlFor="description">
                    وصف
                  </label>
                  <Field name="description" id="description" />
                </div>
              </div>
              <div className="mb-4">
                <label className="d-block mb-2" htmlFor="icon">
                  الأيقونة
                </label>
                <input
                  id="icon"
                  name="icon"
                  type="file"
                  accept="image/*"
                  onChange={ (event) => {
                    const file = event.target.files[0];
                    setFieldValue("icon", file);
                    setIconPreview(URL.createObjectURL(file));
                  } }
                />
                { iconPreview && (
                  <div className="icon-preview mt-3">
                    <img
                      src={ iconPreview }
                      alt="Preview"
                      style={ { maxWidth: "100px", borderRadius: "8px" } }
                    />
                  </div>
                ) }
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={ loading }
                  style={ {
                    width: "300px",
                    border: "0px",
                    height: "50px",
                    borderRadius: "10px",
                    backgroundColor: "#260701",
                    color: "#fff",
                  } }
                >
                  { loading ? "جاري التحميل..." : "حفظ" }
                </button>
              </div>
            </Form>
          ) }
        </Formik>
      </div>
      { showModal && (
        <Modal isOpen={ showModal }>
          <div style={ { padding: "20px" } }>
            <div className="text-center">
              <img
                src="/assets/images/success-achievement-award-medal-winner-svgrepo-com 1.png"
                alt="success"
              />
            </div>
            <div>
              <p className="text-center fw-bolder">تم تعديل هذا النوع بنجاح</p>
              <button
                onClick={ () => navigate("/HomePage/AllTypes") }
                style={ {
                  border: "0px",
                  height: "50px",
                  width: "300px",
                  borderRadius: "10px",
                  color: "#fff",
                  backgroundColor: "#260701",
                } }
              >
                { loading ? "جاري التحميل..." : "العودة الي صفحة جميع الأنواع" }
              </button>
            </div>
          </div>
        </Modal>
      ) }

      { showModalError && (
        <Modal isOpen={ showModalError }>
          <div style={ { padding: "20px" } }>
            <div className="text-center">
              <img
                src="/assets/images/material-symbols_sms-failed-outline-rounded.png"
                alt="success"
              />
            </div>
            <div>
              <p className="text-center fw-bolder">
                حدث خطأ أثناء تعديل هذا النوع !
              </p>
              <button
                onClick={ () => navigate("/HomePage/AllTypes") }
                style={ {
                  border: "0px",
                  height: "50px",
                  width: "300px",
                  borderRadius: "10px",
                  color: "#fff",
                  backgroundColor: "#260701",
                } }
              >
                { loading ? "جاري التحميل..." : "العودة الي صفحة جميع الأنواع" }
              </button>
            </div>
          </div>
        </Modal>
      ) }
    </div>
  );
}
export default EditType;
