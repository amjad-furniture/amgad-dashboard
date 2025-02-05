import React, { useState } from "react";
import "./AddNewType.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "../../../Common Components/Modal/Modal";
import { useNavigate } from "react-router-dom";
function AddNewType() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    description: "",
    icon: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("يرجي ادخال النوع"),
    description: Yup.string(),
    icon: Yup.mixed().required("يرجي تحميل أيقونة"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);

    // Create FormData object
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("icon", values.icon);

    try {
      const response = await fetch("http://104.248.251.235:8080/categories/", {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: localStorage.getItem("access token"),
        },
        body: formData,
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setLoading(false);
        setShowModal(true);
        console.log("تمت إضافة النوع بنجاح");
      } else {
        setShowModal(false);
        setShowModalError(true);
        setLoading(false);
        console.log("فشل في إضافة النوع");
      }
    } catch (error) {
      setShowModal(false);
      setShowModalError(true);
      setLoading(false);
      console.error("خطأ:", error);
    }
  };

  return (
    <div className="addTypeContainer">
      <div
        className="d-flex align-items-center"
        style={{
          backgroundColor: "#F5F5DC",
          border: "1px solid lightgray",
          borderRadius: "30px",
          padding: "0px 20px 0px 20px",
          width: "200px",
          height: "43px",
        }}
      >
        <p className="mt-3 fw-bolder">+</p>
        <p className="mt-3 me-2 ms-2 fw-bolder"> اضافة نوع جديد</p>
      </div>

      <div className="addTypeForm">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="d-flex">
                <div className="ms-5">
                  <label className="d-block mb-2" htmlFor="name">
                    اسم النوع
                  </label>
                  <Field name="name" id="name" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger fw-bolder error-message"
                  />
                  <p
                    className="text-secondary mt-2"
                    style={{ fontSize: "14px" }}
                  >
                    مثل : موديرن
                  </p>
                </div>
                <div className="me-5">
                  <label className="d-block mb-2" htmlFor="description">
                    كتابة وصف
                  </label>
                  <Field name="description" id="description" />
                </div>
              </div>
              <div>
                <label className="d-block mb-2 mt-5">تحميل ايقون</label>
                <input
                  type="file"
                  id="icon"
                  accept="image/*"
                  onChange={(event) =>
                    setFieldValue("icon", event.currentTarget.files[0])
                  }
                />
                <ErrorMessage
                  name="icon"
                  component="div"
                  className="text-danger error-message fw-bolder"
                />
              </div>
              <div className="text-center mt-5">
                <button className="saveBtn" type="submit" disabled={loading}>
                  {loading ? "جاري التحميل..." : "حفظ"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {showModal && (
        <Modal isOpen={showModal}>
          <div style={{ padding: "20px", width: "400px" }}>
            <div className="text-center">
              <img
                src="/assets/images/success-achievement-award-medal-winner-svgrepo-com 1.png"
                alt="success"
                width={"130px"}
              />
            </div>
            <div>
              <p className="text-center fw-bolder mt-4">
                تم اضافة هذا النوع بنجاح
              </p>
              <div className="text-center mt-2">
                <button
                  onClick={() => navigate("/HomePage/AllTypes")}
                  style={{
                    border: "0px",
                    height: "50px",
                    width: "300px",
                    borderRadius: "10px",
                    color: "#fff",
                    backgroundColor: "#260701",
                  }}
                >
                  {loading ? "جاري التحميل..." : "العودة الي صفحة جميع الأنواع"}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {showModalError && (
        <Modal isOpen={showModalError}>
          <div style={{ padding: "20px" }}>
            <div className="text-center">
              <img
                src="/assets/images/material-symbols_sms-failed-outline-rounded.png"
                alt="success"
              />
            </div>
            <div>
              <p className="text-center fw-bolder">
                حدث خطأ أثناء اضافة هذا النوع !
              </p>
              <button
                onClick={() => navigate("/HomePage/AllTypes")}
                style={{
                  border: "0px",
                  height: "50px",
                  width: "300px",
                  borderRadius: "10px",
                  color: "#fff",
                  backgroundColor: "#260701",
                }}
              >
                {loading ? "جاري التحميل..." : "العودة الي صفحة جميع الأنواع"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
export default AddNewType;
