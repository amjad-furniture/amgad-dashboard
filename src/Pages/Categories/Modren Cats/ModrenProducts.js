import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HideCat from "../Hide Cat/HideCat";
import DeleteCat from "../Delete Cats/DeleteCat";

function ModrenProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [options, setOptions] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllProducts() {
      setLoading(true);
      try {
        const response = await fetch("https://api.amgadfurniture.comcom/products/", {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: localStorage.getItem("access token"),
          },
        });
        const result = await response.json();
        if (response.ok) {
          const ModrenProducts = result.data.filter(
            (product) => product.category && product.category.name === "Modern"
          );
          setLoading(false);
          setProducts(ModrenProducts);
        } else {
          setLoading(false);
          console.error("Failed to fetch products.");
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
        setError(true);
      }
    }
    getAllProducts();
  }, []);

  const updateProductStatus = (id, newStatus) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, is_active: newStatus } : product
      )
    );
  };

  // Handle sorting by price
  const handleSort = (order) => {
    setSortOrder(order);
    const sortedProducts = [...products].sort((a, b) => {
      if (order === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setProducts(sortedProducts);
  };

  return (
    <div className="allproductsContainer">
      <div className="d-flex align-items-center justify-content-between">
        <div
          className="d-flex align-items-center"
          style={ {
            backgroundColor: "#F5F5DC",
            border: "1px solid lightgray",
            borderRadius: "30px",
            padding: "0px 20px 0px 20px",
            width: "200px",
            height: "45px"
          } }
        >
          <img
            src="/assets/images/sofa-livingroom-svgrepo-com (1).png"
            alt="product classic"
            width={ '20px' }
            className="ms-2"
          />
          <p className="mt-3 me-2 ms-2 fw-bolder">نيو كلاسيك</p>
        </div>
        <div className="sort-options mb-3">
          <label htmlFor="sortOrder" className="fw-bold me-2 ms-2">
            ترتيب حسب السعر :
          </label>
          <select
            id="sortOrder"
            value={ sortOrder }
            onChange={ (e) => handleSort(e.target.value) }
            className="form-select"
            style={ { width: "200px", display: "inline-block" } }
          >
            <option value="asc">من الأقل إلى الأعلى</option>
            <option value="desc">من الأعلى إلى الأقل</option>
          </select>
        </div>
      </div>
      { error ? (
        <p
          className="text-danger"
          style={ {
            textAlign: "center",
            fontSize: "35px",
            margin: "100px 350px ",
            fontFamily: "Amiri",
          } }
        >
          حدث خطأ أثناء تحميل البيانات.....
        </p>
      ) : loading ? (
        <p
          style={ {
            textAlign: "center",
            fontSize: "35px",
            margin: "100px 350px ",
            fontFamily: "Amiri",
          } }
        >
          جاري تحميل البيانات.....
        </p>
      ) : products.length === 0 ? (
        <p className="no-message fw-bolder">
          لا يوجد منتجات لعرضها في الوقت الحالي
        </p>
      ) : (
        <div className="tableContainer mt-5">
          <table className="table">
            <thead>
              <tr>
                <th>م</th>
                <th>اسم المنتج</th>
                <th>النوع</th>
                <th>عدد القطع</th>
                <th>السعر</th>
                <th>الحالة</th>
                <th className="text-center">خيارات</th>
              </tr>
            </thead>
            <tbody>
              { products.map((product, index) => (
                <tr key={ index }>
                  <td>{ index + 1 }</td>
                  <td>{ product.name }</td>
                  <td>
                    { product.category ? product.category.name : "No Category" }
                  </td>
                  <td>{ product.stock }</td>
                  <td>{ product.price }</td>
                  <td>{ product.is_active ? "معروض" : "مخفي" }</td>
                  <td className="text-center position-relative">
                    <img
                      src="/assets/images/Group 6356159.png"
                      alt="options"
                      style={ { cursor: "pointer" } }
                      onClick={ () =>
                        setOptions(options === product.id ? null : product.id)
                      }
                    />
                    { options === product.id && (
                      <div className="allOptions p-3">
                        <p
                          className="fw-bolder pb-2"
                          style={ { textAlign: "right", cursor: "pointer" } }
                          onClick={ () =>
                            navigate("/HomePage/EditProductForm", { state: { product } })
                          }
                        >
                          تعديل البيانات
                        </p>
                        <HideCat
                          id={ product.id }
                          isActive={ product.is_active }
                          onStatusChange={ (newStatus) =>
                            updateProductStatus(product.id, newStatus)
                          }
                        />
                        <DeleteCat id={ product.id } />
                      </div>
                    ) }
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
        </div>
      ) }
    </div>
  );
}

export default ModrenProducts;
