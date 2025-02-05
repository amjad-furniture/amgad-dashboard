import React, { useState } from "react";
import "./NewPassword.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Modal from "../../Common Components/Modal/Modal";

function NewPassword() {
  const [showModal, setShowModal] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialValues = {
    current_password: "",
    new_password: "",
  };
  const validationSchema = Yup.object({
    current_password: Yup.string().required("يرجي ادخال كلمة السر الحالية"),
    new_password: Yup.string().required("يرجي ادخال كلمة السر الجديدة"),
  });
  const handleSubmit = async (value) => {
    setLoading(true);
    const items = {
      current_password: value["current_password"],
      new_password: value["new_password"],
    };
    try {
      const response = await fetch(
        "http://104.248.251.235:8080/auth/change-password",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("access token"),
          },
          body: JSON.stringify(items),
        }
      );
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        setLoading(false);
        console.log("success");
        setShowModal(true);
        setModalError(false);
      } else {
        setLoading(false);
        console.log("failed");
        setShowModal(false);
        setModalError(true);
      }
    } catch (error) {
      console.error(error);
      setShowModal(false);
      setModalError(true);
    }
  };
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  return (
    <div className="newpasswordContainer">
      <aside>
        <div className="logo">
          <img src="/assets/images/Group (2).png" alt="logo" />
        </div>
        <div className="loginformContainer">
          <div>
            <h2 className="text-center fw-bolder">كلمة السر الجديدة </h2>
            <p className="text-center fw-bolder mt-3">
              قم بإدخال كلمة السر الجديدة
            </p>
          </div>
          <div className="">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="form">
                <div className="position-relative">
                  <label className="d-block" htmlFor="current_password">
                    كلمة السر الحالية
                  </label>
                  <Field
                    name="current_password"
                    id="current_password"
                    type={show ? "text" : "password"}
                    placeholder="كلمة السر الحالية"
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: 50,
                      left: 25,
                      cursor: "pointer",
                    }}
                    onClick={() => setShow(!show)}
                  >
                    {!show ? (
                      <img
                        src="/assets/images/close eye.png"
                        alt="hide password"
                        width={"20px"}
                        height={"20px"}
                      />
                    ) : (
                      <img
                        src="/assets/images/open eye.png"
                        alt="show password"
                        width={"20px"}
                        height={"20px"}
                      />
                    )}
                  </span>
                  <ErrorMessage
                    name="current_password"
                    component="div"
                    className="error-message fw-bolder text-danger"
                  />
                </div>
                <div className="position-relative">
                  <label className="d-block" htmlFor="new_password">
                    كلمة السر الجديدة
                  </label>
                  <Field
                    name="new_password"
                    id="new_password"
                    type={confirm ? "text" : "password"}
                    placeholder="كلمة السر الجديدة"
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: 50,
                      left: 25,
                      cursor: "pointer",
                    }}
                    onClick={() => setConfirm(!confirm)}
                  >
                    {!confirm ? (
                      <img
                        src="/assets/images/close eye.png"
                        alt="hide password"
                        width={"20px"}
                        height={"20px"}
                      />
                    ) : (
                      <img
                        src="/assets/images/open eye.png"
                        alt="show password"
                        width={"20px"}
                        height={"20px"}
                      />
                    )}
                  </span>
                  <ErrorMessage
                    name="new_password"
                    component="div"
                    className="error-message fw-bolder text-danger"
                  />
                </div>
                <div>
                  <button
                    className="mt-5"
                    type="submit"
                    style={{ cursor: "pointer" }}
                  >
                    {loading ? "جاري التحميل ...." : "حفظ"}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </aside>
      <aside>
        <div>
          <img
            src="/assets/images/Group 6356148.png"
            alt="logo"
            className="cover"
          />
        </div>
      </aside>
      {/* modal */}
      {showModal && (
        <Modal isOpen={showModal}>
          <div style={{ borderRadius: "10px" }} className="pt-5 ps-5 pe-5 pb-4">
            <div className="text-center mb-5">
              <img src="/assets/images/Group (2).png" alt="logo" />
            </div>
            <div>
              <h4 className="text-center fw-bolder">
                تم تغير كلمة السر
                <br /> الخاصة بك بنجاح{" "}
              </h4>
              <p className="text-center mt-5 fw-bolder">
                استخدم كلمة السر الجديدة عند تسجيل الدخول
                <br /> مرة اخرى في المرات القادمة
              </p>
              <div>
                <button className="login-btn mt-4" onClick={()=>navigate('/')}>تسجيل الدخول</button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {modalError && (
        <Modal isOpen={modalError}>
          <div style={{ width: "400px" }}>
            <div>
              <button
                className="close-modal"
                onClick={() => setModalError(false)}
              >
                X
              </button>
            </div>

            <div className="fail-img">
              <img src="/assets/images/fail.png" alt="fail" />
            </div>
            <div>
              <p className="text-center fw-bolder p-3">
                حدث خطأ برجاء المحاولة مرة أخري !
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
export default NewPassword;