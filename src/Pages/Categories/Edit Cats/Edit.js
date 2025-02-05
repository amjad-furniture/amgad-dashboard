import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../../Common Components/Modal/Modal";
import "./Edit.css";

function EditProductForm() {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    category_id: "",
    name: "",
    description: "",
    price: "",
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
    is_active: true,
    vedio: null,
    is_best_seller: false,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://api.amgadfurniture.com/categories")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setCategories(data.data);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));

    if (state) {
      setProductData(state.product);
    }
  }, [state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      uploaded_images: Array.from(e.target.files),
    }));
  };

  const validateForm = () => {
    if (!productData.name || !productData.price || !productData.category_id) {
      alert("الرجاء ملء جميع الحقول الإلزامية");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const updatedProductData = {
      ...productData,
      price: parseFloat(productData.price),
      stock: parseInt(productData.stock),
    };

    try {
      setLoading(true);
      const token = localStorage.getItem("access token");
      if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
      }

      const formData = new FormData();
      Object.keys(updatedProductData).forEach((key) => {
        if (key === "uploaded_images") {
          updatedProductData.uploaded_images.forEach((file) => {
            formData.append("uploaded_images", file);
          });
        } else if (key === "product_video") {
          if (updatedProductData.product_video) {
            formData.append("product_video", updatedProductData.product_video); // Append the video file
          }
        } else {
          formData.append(key, updatedProductData[key]);
        }
      });

      const response = await fetch(
        `https://api.amgadfurniture.com/products/${state.product.id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: token,
          },
          body: formData,
        }
      );

      const responseData = await response.json();
      console.log("API Response:", responseData);

      if (response.ok) {
        setLoading(false);
        setShowModal(true);
        setShowModalError(false);
      } else {
        setLoading(false);
        setShowModal(false);
        setShowModalError(true);
        console.error("Failed to update product. Response:", responseData);
      }
    } catch (error) {
      setLoading(false);
      setShowModal(false);
      setShowModalError(true);
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="editContainer">
      <div className="d-flex align-items-center justify-content-between">
        <div
          className="d-flex align-items-center mb-3"
          style={ {
            backgroundColor: "#F5F5DC",
            border: "1px solid lightgray",
            borderRadius: "30px",
            padding: "0px 20px 0px 20px",
            width: "200px",
            height: "45px",
          } }
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.196 8.5V3C16.196 1.89543 15.3006 1 14.196 1H3.19605C2.09148 1 1.19604 1.89543 1.19604 3V14C1.19604 15.1046 2.09148 16 3.19604 16H8.69604"
              stroke="#909090"
              stroke-width="1.5"
            />
            <rect
              x="8.19604"
              y="8"
              width="15"
              height="15"
              rx="2"
              stroke="#909090"
              stroke-width="1.5"
            />
          </svg>

          <p className="mt-3 me-2 ms-2 fw-bolder">تعديل المنتج</p>
        </div>
      </div>

      <form className="editForm" onSubmit={ handleSubmit }>
        <div className="fw-bolder mt-4">
          <p>المعلومات الاساسية : </p>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="ms-5">
            <label className="d-block mb-2">اسم المنتج</label>
            <input
              type="text"
              name="name"
              value={ productData.name }
              onChange={ handleChange }
              required
            />
            <p className="text-secondary mt-2" style={ { fontSize: "14px" } }>
              مثال: صالون كبير
            </p>
          </div>

          <div className="me-5" style={ { margin: "-55px 0px 0px 0px" } }>
            <label className="d-block mb-2">النوع</label>
            <select
              className="input"
              name="category_id"
              value={ productData.category_id }
              onChange={ handleChange }
              required
            >
              <option value="">اختر النوع</option>
              { categories.map((category) => (
                <option key={ category.id } value={ category.id }>
                  { category.name }
                </option>
              )) }
            </select>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="ms">
            <label className="d-block mb-2 mt-4">السعر بالجنيه المصري</label>
            <input
              name="price"
              value={ productData.price }
              onChange={ handleChange }
              required
            />
            <p className="text-secondary mt-2" style={ { fontSize: "14px" } }>
              ارقام فقط
            </p>
          </div>

          <div className="">
            <label className="d-block mt-4 mb-2">عدد القطع</label>
            <input
              name="stock"
              value={ productData.stock }
              onChange={ handleChange }
            />
            <p className="text-secondary mt-2" style={ { fontSize: "14px" } }>
              ارقام فقط
            </p>
          </div>
        </div>
        <div className="">
          <label className="mb-2 mt-4 d-block">كتابة وصف المنتج</label>
          <input
            className="message"
            name="description"
            value={ productData.description }
            onChange={ handleChange }
            rows="5"
          />
          <p className="text-secondary mt-2" style={ { fontSize: "14px" } }>
            كتابة جمل وصفية - الالوان المتاحة
          </p>
        </div>
        <hr className="mt-5" style={ { position: "relative", zIndex: "-1" } } />
        <div>
          <p className="fw-bolder">تفاصيل : </p>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="ms-5">
            <label className="mb-2 d-block">خامة الخشب : </label>
            <input
              name="wood_material"
              value={ productData.wood_material }
              onChange={ handleChange }
            />
            <p className="text-secondary mt-2" style={ { fontSize: "14px" } }>
              { " " }
              مثال: زان
            </p>
          </div>
          <div className="me-5">
            <label className="mb-2 d-block">خامة القماش : </label>
            <input
              name="fabric_material"
              value={ productData.fabric_material }
              onChange={ handleChange }
            />
            <p className="text-secondary mt-2" style={ { fontSize: "14px" } }>
              مثال: كتان
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="ms-5">
            <label className="mb-2 mt-4 d-block">خامة التنجيد : </label>
            <input
              name="upholstery_material"
              value={ productData.upholstery_material }
              onChange={ handleChange }
            />
            <p className="text-secondary mt-2" style={ { fontSize: "14px" } }>
              مثال: اسفنج عالي الكثافة
            </p>
          </div>
          <div className="me-5">
            <label className="mb-2 mt-4 d-block"> عدد شهور الضمان : </label>
            <input
              name="warranty_months"
              value={ productData.warranty_months }
              onChange={ handleChange }
            />
          </div>
        </div>
        <hr className="mt-5" style={ { position: "relative", zIndex: "-1" } } />
        <div>
          <p className="fw-bolder">المواصفات : </p>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="ms-5">
            <label className="mb-2 d-block">الطول ( cm )</label>
            <input
              name="length_cm"
              value={ productData.length_cm }
              onChange={ handleChange }
            />
            <p className="text-secondary mt-2" style={ { fontSize: "14px" } }>
              ارقام فقط
            </p>
          </div>
          <div className="me-5">
            <label className="mb-2  d-block">العرض ( cm )</label>
            <input
              name="width_cm"
              value={ productData.width_cm }
              onChange={ handleChange }
            />
            <p className="text-secondary mt-2" style={ { fontSize: "14px" } }>
              ارقام فقط
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="ms-5">
            <label className="mb-2 mt-4 d-block">الارتفاع ( cm )</label>
            <input
              name="height_cm"
              value={ productData.height_cm }
              onChange={ handleChange }
            />
            <p className="text-secondary mt-2" style={ { fontSize: "14px" } }>
              ارقام فقط
            </p>
          </div>
          <div className="me-5">
            <label className="mb-2 mt-4 d-block">العمق ( cm )</label>
            <input
              name="depth_cm"
              value={ productData.depth_cm }
              onChange={ handleChange }
            />
            <p className="text-secondary mt-2" style={ { fontSize: "14px" } }>
              ارقام فقط
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="ms-5">
            <label className="mb-2 mt-4 d-block">اللون</label>
            <input
              name="color"
              value={ productData.color }
              onChange={ handleChange }
            />
            <p className="text-secondary mt-2" style={ { fontSize: "14px" } }>
              ادخل لون للمنتج
            </p>
          </div>
          <div className="me-5">
            <label className="mb-2 mt-4 d-block">بلد المنشأ</label>
            <input
              name="country_of_origin"
              value={ productData.country_of_origin }
              onChange={ handleChange }
            />
            <p className="text-secondary mt-2" style={ { fontSize: "14px" } }>
              ادخل بلد المنشأ مثال : مصر
            </p>
          </div>
        </div>
        <hr className="mt-5" style={ { position: "relative", zIndex: "-1" } } />
        <div className="">
          <label className="mb-2 mt-4 d-block">الصور</label>
          <input
            type="file"
            name="uploaded_images"
            multiple
            onChange={ handleFileChange }
          />
        </div>
        <div className="">
          <label className="mb-2 mt-4 d-block">فيديو المنتج</label>
          <input
            type="file"
            name="product_video"
            onChange={ (e) =>
              setProductData((prevData) => ({
                ...prevData,
                product_video: e.target.files[0],
              }))
            }
          />
        </div>
        <div className="d-flex align-items-center mt-4">
          <label className="ms-3">الحالة</label>
          <input
            style={ { width: "20px" } }
            type="checkbox"
            name="is_active"
            checked={ productData.is_active }
            onChange={ (e) =>
              handleChange({
                target: { name: "is_active", value: e.target.checked },
              })
            }
          />
        </div>

        <div className="d-flex align-items-center">
          <label className="ms-3">منتج أكثر مبيعا ؟</label>
          <input
            style={ { width: "20px" } }
            type="checkbox"
            name="is_best_seller"
            checked={ productData.is_best_seller }
            onChange={ (e) =>
              handleChange({
                target: { name: "is_best_seller", value: e.target.checked },
              })
            }
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={ loading }
            style={ {
              width: "300px",
              height: "50px",
              padding: "10px",
              color: "#fff",
              backgroundColor: "#260701",
              borderRadius: "10px",
              margin: "0px 200px 0px 0px",
            } }
          >
            { loading ? "جاري التحميل...." : "حفظ" }
          </button>
        </div>
      </form>

      { showModal && (
        <Modal isOpen={ showModal }>
          <div className="" style={ { width: "400px", padding: "20px" } }>
            <div className="text-center">
              <img
                src="/assets/images/success-achievement-award-medal-winner-svgrepo-com 1.png"
                alt="success"
                width={ "120px" }
              />
            </div>
            <p className="text-center fw-bolder fs-5 mt-4">
              تم تحديث المنتج بنجاح!
            </p>
            <div className="text-center">
              <button
                className="mt-4 fw-bolder"
                style={ {
                  width: "300px",
                  height: "50px",
                  padding: "10px",
                  color: "#fff",
                  backgroundColor: "#260701",
                  borderRadius: "10px",
                } }
                onClick={ () => navigate("/HomePage/AllCats") }
              >
                الرجوع الي صفحة جميع المنتجات
              </button>
            </div>
          </div>
        </Modal>
      ) }

      { showModalError && (
        <Modal isOpen={ showModalError }>
          <div className="" style={ { width: "400px", padding: "30px" } }>
            <div className="text-center">
              <img
                src="/assets/images/material-symbols_sms-failed-outline-rounded.png"
                alt="failed"
              />
            </div>
            <p className="text-center fw-bolder mt-4 fs-5">
              حدث خطأ أثناء تحديث المنتج. حاول مجددًا.
            </p>
            <div className="text-center">
              <button
                className="mt-4 fw-bolder"
                style={ {
                  width: "300px",
                  height: "50px",
                  padding: "10px",
                  color: "#fff",
                  backgroundColor: "#260701",
                  borderRadius: "10px",
                } }
                onClick={ () => navigate("/HomePage/AllCats") }
              >
                الرجوع الي صفحة جميع المنتجات
              </button>
            </div>
          </div>
        </Modal>
      ) }
    </div>
  );
}

export default EditProductForm;