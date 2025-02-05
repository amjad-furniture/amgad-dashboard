import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import Modal from "../../Common Components/Modal/Modal";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("يرجي ادخال  البريد الالكتروني"),
    password: Yup.string().required("يرجي ادخال كلمة السر"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    const items = {
      username: values["username"],
      password: values["password"],
    };
    try {
      const response = await fetch("http://104.248.251.235:8080/auth/login", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(items),
      });
      const result = await response.json();

      if (response.ok) {
        setLoading(false);
        console.log("Login success:", result);
        localStorage.setItem("access token", result.data.access);
        localStorage.setItem("username", result.data.name);
        console.log(result.data.username)
        setShowModal(true);
        setModalError(false);
        setTimeout(() => {
          navigate("/HomePage");
        }, 2500);
      } else {
        setLoading(false)
        console.error("Login failed:", result.message);
        setShowModal(false);
        setModalError(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setShowModal(false);
      setModalError(true);
    }
  };

  return (
    <div className="loginConatiner">
      <aside>
        <div className="logo">
          <img src="/assets/images/Group (2).png" alt="logo" />
        </div>
        <div className="loginformContainer">
          <div>
            <h2 className="text-center fw-bolder">اهلا بك</h2>
            <p className="text-center fw-bolder mt-3">
              قم بإدخال بريدك الالكتروني وكلمة السر
              <br /> لتسجيل الدخول
            </p>
          </div>
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="form">
                <div>
                  <label className="d-block" htmlFor="username">
                     اسم المستخدم
                  </label>
                  <Field
                    placeholder="البريد الالكتروني*"
                    name="username"
                    id="username"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-danger fw-bolder error-message"
                  />
                </div>
                <div className="position-relative mt-3">
                  <label className="d-block" htmlFor="password">
                    كلمة السر
                  </label>
                  <Field
                    className=""
                    name="password"
                    id="password"
                    type={show ? "text" : "password"}
                    placeholder="كلمة السر"
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "58px",
                      left: "10px",
                      transform: "translateY(-50%)",
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
                    name="password"
                    component="div"
                    className="text-danger fw-bolder error-message"
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <p
                    className="mt-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/NewPassword")}
                  >
                    هل تريد تغير كلمة السر؟
                  </p>
                </div>
                <div className="mt-3">
                  <button type="submit" style={{ cursor: "pointer" }}>
                    {loading ? "جاري التحميل ..... " : "تسجيل الدخول"}
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
            alt="cover"
            className="cover"
          />
        </div>
      </aside>

      {showModal && (
        <Modal isOpen={showModal}>
          <div className="success-modal">
            <div>
            </div>
            <div className="success-img">
              <img style={{padding:"12px"}} src="/assets/images/success-achievement-award-medal-winner-svgrepo-com 1.png" alt="done" />
            </div>
            <h4 className=" text-center fw-bolder">
              لقد تم تسجيل دخولكم بنجاح
            </h4>
          </div>
        </Modal>
      )}

      {modalError && (
        <Modal isOpen={modalError}>
          <div>
            <div>
              <button
                onClick={() => setModalError(false)}
                className="close-modal"
              >
                X
              </button>
            </div>
            <div className="fail-img">
              <img src="/assets/images/fail.png" alt="failed" />
            </div>
            <p className="text-center fw-bolder p-4">
              لقد حدث خطأ ! يرجي التأكد من عنوان البريد الالكتروني و كلمة السر
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
export default Login;