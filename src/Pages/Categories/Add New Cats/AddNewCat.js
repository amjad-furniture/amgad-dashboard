import React, { useState, useEffect } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import Modal from "../../../Common Components/Modal/Modal";
import * as Yup from "yup";
import "./AddNewCat.css";

function AddNewCat() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  const initialValues = {
    name: "",
    description: "",
    price: "",
    category_id: "",
    color: "",
    length_cm: "",
    width_cm: "",
    height_cm: "",
    depth_cm: "",
    stock: "",
    country_of_origin: "",
    wood_material: "",
    fabric_material: "",
    upholstery_material: "",
    warranty_months: "",
    uploaded_images: [],
    product_video: null,
    is_active: true, //by default
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("يرجي ادخال الأسم"),
    description: Yup.string(),
    price: Yup.number().required("يرجي ادخال السعر"),
    color: Yup.string().required("يرجي ادخال اللون"),
    length_cm: Yup.number().required("يرجي ادخال الطول بالأرقام فقط"),
    width_cm: Yup.number().required("يرجي ادخال العرض بالأرقام فقط"),
    height_cm: Yup.number().required("يرجي ادخال الأرتفاع بالأرقام فقط"),
    depth_cm: Yup.number().required("يرجي ادخال السمك بالأرقام فقط"),
    stock: Yup.number().required("يرجي ادخال عدد القطع بالأرقام فقط"),
    country_of_origin: Yup.string().required("يردي اخال بلد المنشأ"),
    wood_material: Yup.string().required("يردي ادخال خامة الخشب"),
    fabric_material: Yup.string().required("يرجي ادخال مادة القماش "),
    upholstery_material: Yup.string().required("يرجي ادخال مادة التنجيد"),
    warranty_months: Yup.string().required(
      "يرجي ادخال عدد أشهر الضمان بالأرقام فقط"
    ),
    category_id: Yup.string().required("يرجي اختيار نوع المنتج"),
    uploaded_images: Yup.array()
      .of(Yup.mixed().required("يرجي تحميل الصور"))
      .min(1, "يرجي تحميل صورة واحدة على الأقل"),
    // product_video: Yup.mixed()
    //   .test(
    //     "is-valid-video",
    //     "يرجى تحميل فيديو صحيح",
    //     (value) =>
    //       value instanceof File ||
    //       (typeof value === "string" && value.startsWith("http"))
    //   )
    //   .nullable(),
    is_active: Yup.boolean(),
  });

  const handleSubmit = async (values) => {
    setLoading(true);

    const formData = new FormData();
    for (let key in values) {
      if (key !== "uploaded_images" && key !== "product_video") {
        formData.append(key, values[key]);
      }
    }

    if (values.uploaded_images?.length > 0) {
      Array.from(values.uploaded_images).forEach((file) => {
        formData.append("uploaded_images", file);
      });
    }

    if (values.product_video) {
      formData.append("product_video", values.product_video);
    }

    console.log("FormData before sending:");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      const response = await fetch("https://api.amgadfurniture.com/products/", {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("access token"),
          accept: "application/json",
        },
        body: formData,
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (response.ok) {
        setLoading(false);
        setShowModal(true);
        setShowModalError(false);
      } else {
        console.error("Error in response:", result);
        setShowModal(false);
        setShowModalError(true);
        setLoading(false);
      }
    } catch (error) {
      setShowModal(false);
      setShowModalError(true);
      console.error("Error during submission:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://api.amgadfurniture.com/categories/");
        const data = await response.json();
        if (response.ok) {
          setCategories(data.data);
        } else {
          setError("فشل في جلب أنواع المنتجات.");
        }
      } catch (error) {
        setError("حدث خطأ أثناء جلب أنواع المنتجات.");
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="editContainer">
      { error && (
        <p
          className="text-danger"
          style={ {
            textAlign: "center",
            fontSize: "30px",
            margin: "100px 350px ",
            fontFamily: "Amiri",
          } }
        >
          { error }
        </p>
      ) }
      { !error && (
        <>
          <div
            className="d-flex align-items-center"
            style={ {
              backgroundColor: "#F5F5DC",
              border: "1px solid lightgray",
              borderRadius: "30px",
              padding: "0px 20px 0px 20px",
              width: "200px",
              height: "43px",
            } }
          >
            <p className="mt-3 fw-bolder">+</p>
            <p className="mt-3 me-2 ms-2 fw-bolder"> اضافة منتج جديد</p>
          </div>
          <Formik
            initialValues={ initialValues }
            validationSchema={ validationSchema }
            onSubmit={ handleSubmit }
          >
            { ({ setFieldValue }) => (
              <Form className="addForm mt-5">
                <div>
                  <p className="fw-bolder">المعلومات الاساسية : </p>
                </div>
                <div className="d-flex  justify-content-between">
                  <div className="form-group ms-5">
                    <label className="mb-2">إسم المنتج</label>
                    <Field name="name" type="text" className="form-control" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger fw-bolder error-message"
                    />
                    <p
                      className="mt-2 text-secondary"
                      style={ { fontSize: "14px" } }
                    >
                      مثال: صالون كبير
                    </p>
                  </div>

                  <div className="form-group me-5">
                    <label className="mb-2">نوع المنتج:</label>
                    <Field
                      as="select"
                      name="category_id"
                      className="form-control selectOption"
                    >
                      <option value="">إختر نوع المنتج</option>
                      { categories.map((category) => (
                        <option key={ category.id } value={ category.id }>
                          { category.name }
                        </option>
                      )) }
                    </Field>
                    <ErrorMessage
                      name="category_id"
                      component="div"
                      className="text-danger error-message fw-bolder"
                    />
                  </div>
                </div>
                {/* 2 */ }
                <div className="d-flex  justify-content-between">
                  <div className="form-group ms-5">
                    <label className="mt-4 mb-2">السعر بالجنيه المصري</label>
                    <Field
                      name="price"
                      // type="number"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-danger fw-bolder error-message"
                    />
                    <p
                      className="text-secondary mt-2"
                      style={ { fontSize: "14px" } }
                    >
                      ارقام فقط
                    </p>
                  </div>
                  <div className="form-group me-5">
                    <label className="mt-4 mb-2">عدد القطع</label>
                    <Field
                      name="stock"
                      // type="number"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="stock"
                      component="div"
                      className="text-danger fw-bolder error-message"
                    />
                    <p
                      className="text-secondary mt-2"
                      style={ { fontSize: "14px" } }
                    >
                      ارقام فقط
                    </p>
                  </div>
                </div>
                <div className="form-group">
                  <label>الوصف:</label>
                  <Field name="description" className="form-control message" />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-danger fw-bolder error-message"
                  />
                  <p
                    className="text-secondary mt-2"
                    style={ { fontSize: "14px" } }
                  >
                    كتابة جمل وصفية - الالوان المتاحة
                  </p>
                </div>
                {/* 3 */ }
                <hr
                  className="mt-5"
                  style={ { position: "relative", zIndex: "-1" } }
                />
                <div>
                  <p className="fw-bolder">تفاصيل : </p>
                </div>
                <div className="d-flex  justify-content-center">
                  <div className="form-group ms-5">
                    <label className="mb-2 mt-4">خامة الخشب</label>
                    <Field
                      name="wood_material"
                      type="text"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="wood_material"
                      component="div"
                      className="text-danger error-message fw-bolder"
                    />
                    <p
                      className="text-secondary mt-2"
                      style={ { fontSize: "14px" } }
                    >
                      مثال: زان
                    </p>
                  </div>

                  <div className="form-group me-5">
                    <label className="mb-2 mt-4">خامة القماش</label>
                    <Field
                      name="fabric_material"
                      type="text"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="fabric_material"
                      component="div"
                      className="text-danger fw-bolder error-message"
                    />
                    <p
                      className="text-secondary mt-2"
                      style={ { fontSize: "14px" } }
                    >
                      مثال: كتان
                    </p>
                  </div>
                </div>
                {/* 4 */ }
                <div className="d-flex justify-content-between ">
                  <div className="form-group ms-4">
                    <label className="mt-4 mb-2">خامة التنجيد</label>
                    <Field
                      name="upholstery_material"
                      type="text"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="upholstery_material"
                      component="div"
                      className="text-danger fw-bolder error-message"
                    />
                    <p
                      className="text-secondary mt-2"
                      style={ { fontSize: "14px" } }
                    >
                      مثال: اسفنج عالي الكثافة
                    </p>
                  </div>

                  <div className="form-group me-5">
                    <label className="mt-4 mb-2">عدد شهور الضمان</label>
                    <Field
                      name="warranty_months"
                      type="text"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="warranty_months"
                      component="div"
                      className="text-danger fw-bolder error-message"
                    />
                    <p
                      className="text-secondary mt-2"
                      style={ { fontSize: "14px" } }
                    >
                      ارقام فقط
                    </p>
                  </div>
                </div>
                <hr
                  className="mt-5"
                  style={ { position: "relative", zIndex: "-1" } }
                />
                <div>
                  <p className="fw-bolder">المواصفات : </p>
                </div>
                <div className="d-flex  justify-content-between">
                  <div className="form-group ms-5">
                    <label className="mb-2">الطول ( cm )</label>
                    <Field
                      name="length_cm"
                      // type="number"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="length_cm"
                      component="div"
                      className="text-danger error-message fw-bolder"
                    />
                    <p
                      className="text-secondary mt-2"
                      style={ { fontSize: "14px" } }
                    >
                      ارقام فقط
                    </p>
                  </div>

                  <div className="form-group me-5">
                    <label className="mb-2">العرض ( cm )</label>
                    <Field
                      name="width_cm"
                      // type="number"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="width_cm"
                      component="div"
                      className="text-danger error-message fw-bolder"
                    />
                    <p
                      className="text-secondary mt-2"
                      style={ { fontSize: "14px" } }
                    >
                      ارقام فقط
                    </p>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="form-group  ms-5">
                    <label className="mt-4 mb-2">الارتفاع ( cm )</label>
                    <Field
                      name="height_cm"
                      // type="number"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="height_cm"
                      component="div"
                      className="text-danger fw-bolder error-message"
                    />
                    <p
                      className="text-secondary mt-2"
                      style={ { fontSize: "14px" } }
                    >
                      ارقام فقط
                    </p>
                  </div>

                  <div className="form-group me-5">
                    <label className="mt-4 mb-2">العمق ( cm )</label>
                    <Field
                      name="depth_cm"
                      // type="number"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="depth_cm"
                      component="div"
                      className="text-danger fw-bolder error-message"
                    />
                    <p
                      className="text-secondary mt-2"
                      style={ { fontSize: "14px" } }
                    >
                      ارقام فقط
                    </p>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="form-group ms-5">
                    <label className="mt-4 mb-2">اللون</label>
                    <Field name="color" type="text" className="form-control" />
                    <ErrorMessage
                      name="color"
                      component="div"
                      className="text-danger fw-bolder error-message"
                    />
                    <p
                      className="text-secondary mt-2"
                      style={ { fontSize: "14px" } }
                    >
                      ادخال لون للمنتج
                    </p>
                  </div>

                  <div className="form-group me-5">
                    <label className="mt-4 mb-2">بلد المنشأ</label>
                    <Field
                      name="country_of_origin"
                      type="text"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="country_of_origin"
                      component="div"
                      className="text-danger"
                    />
                    <p
                      className="text-secondary mt-2"
                      style={ { fontSize: "14px" } }
                    >
                      ادخل بلد المنشأ مثال: مصر
                    </p>
                  </div>
                </div>
                <hr
                  className="mt-5"
                  style={ { position: "relative", zIndex: "-1" } }
                />
                <div>
                  <p className="fw-bolder">تحميل الصور : </p>
                  <p style={ { color: "gray" } }>
                    يجب تحميل صورة واحدة على الاقل <br />
                    الصورة الاولى تظهر كصورة خارجية{ " " }
                  </p>
                </div>
                <input
                  type="file"
                  name="uploaded_images"
                  multiple
                  onChange={ (e) => {
                    // Convert FileList to an array before setting it in Formik
                    const filesArray = Array.from(e.target.files);
                    setFieldValue("uploaded_images", filesArray);
                  } }
                />

                <div className="form-group">
                  <label className="mt-4 mb-2 d-block">
                    تحميل فيديو المنتج (اختياري) :{ " " }
                  </label>
                  <input
                    type="file"
                    name="product_video"
                    accept="video/*"
                    onChange={ (e) =>
                      setFieldValue("product_video", e.target.files[0])
                    }
                  />
                  <ErrorMessage
                    name="product_video"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="text-center mt-4">
                  <button
                    type="submit"
                    style={ {
                      margin: "0px 200px 0px 0px",
                      border: "0px",
                      height: "50px",
                      width: "300px",
                      borderRadius: "10px",
                      padding: "10px",
                      color: "#fff",
                      backgroundColor: "#260701",
                      fontWeight: "bolder",
                    } }
                    disabled={ loading }
                  >
                    { loading ? "جاري التحميل..." : "إضافة المنتج" }
                  </button>
                </div>
              </Form>
            ) }
          </Formik>
        </>
      ) }
      { showModal && (
        <Modal isOpen={ showModal }>
          <div style={ { padding: "20px", width: "400px" } }>
            <div className="text-center">
              <img
                src="/assets/images/success-achievement-award-medal-winner-svgrepo-com 1.png"
                alt="success"
                width={ '130px' }
              />
            </div>
            <div>
              <p className="text-center fw-bolder mt-4">تم اضافة هذا المنتج بنجاح</p>
              <div className="text-center">
                <button
                  className="mt-2"
                  onClick={ () => navigate("/HomePage/AllCats") }
                  style={ {
                    border: "0px",
                    height: "50px",
                    width: "300px",
                    borderRadius: "10px",
                    color: "#fff",
                    backgroundColor: "#260701",
                  } }
                >
                  { loading
                    ? "جاري التحميل..."
                    : "العودة الي صفحة جميع المنتجات" }
                </button>
              </div>
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
                حدث خطأ أثناء اضافة هذا النتج !
              </p>
              <button
                onClick={ () => navigate("/HomePage/AllCats") }
                style={ {
                  border: "0px",
                  height: "50px",
                  width: "300px",
                  borderRadius: "10px",
                  color: "#fff",
                  backgroundColor: "#260701",
                } }
              >
                { loading ? "جاري التحميل..." : "العودة الي صفحة جميع المنتجات" }
              </button>
            </div>
          </div>
        </Modal>
      ) }
    </div>
  );
}
export default AddNewCat;
