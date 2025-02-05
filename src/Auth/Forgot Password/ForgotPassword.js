import React from "react";
import "./ForgotPassword.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
function ForgotPassword() {
    const navigate = useNavigate();
  const initialValues = {};
  const validationSchema = {};
  const handleSubmit = {};
  return (
    <div className="forgotPasswordContainer">
      <aside>
        <div className="logo">
          <img src="/assets/images/Group (2).png" alt="logo" />
        </div>
        <div className="loginformContainer">
          <div>
            <h2 className="text-center fw-bolder">هل نسيت كلمة السر؟</h2>
            <p className="text-center fw-bolder mt-3">
              قم بإدخال بريدك الالكتروني لارسال الرمز
              <br /> لتعديل كلمة السر
            </p>
          </div>
          <div className="">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="form">
                <div>
                  <label className="d-block">البريد الالكتروني</label>
                  <Field placeholder="البريد الالكتروني*" name="username" />
                </div>
                <div>
                  <button
                    className="mt-5"
                    type="submit"
                    style={{ cursor: "pointer" }}
                    onClick={() =>navigate("/ConfirmCode")}
                  >
                    ارسال الرمز
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
    </div>
  );
}

export default ForgotPassword;
