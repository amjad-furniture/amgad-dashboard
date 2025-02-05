import React from "react";
import "./ConfirmCode.css";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
function ConfirmCode() {
  const initialValues = {};
  const validationSchema = {};
  const handleSubmit = {};
  const navigate = useNavigate();
  return (
    <div className="confirmCodeContainer">
      <aside>
        <div className="logo">
          <img src="/assets/images/Group (2).png" alt="logo" />
        </div>
        <div className="loginformContainer">
          <div>
            <h2 className="text-center fw-bolder">ادخال الرمز</h2>
            <p className="text-center fw-bolder mt-3">
              قم بإدخال الرمز المرسل اليك عبر بريدك
              <br /> الالكتروني
            </p>
          </div>
          <div className="">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="confirmForm">
                <div className="mt-3">
                  <Field  name="username" />
                  <Field  name="username" />
                  <Field  name="username" />
                  <Field  name="username" />
                  <Field  name="username" />
                </div>
                <div>
                  <button
                    className="mt-5"
                    type="submit"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/NewPassword")}
                  >
                    التالي
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
export default ConfirmCode;
