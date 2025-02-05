import React, { useEffect, useState } from "react";
import "./RelatedProducts.css";
import { useNavigate, useParams } from "react-router-dom";
import HideCat from "../../Categories/Hide Cat/HideCat";
import DeleteCat from "../../Categories/Delete Cats/DeleteCat";
function RelatedProducts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState([]);
  const [options, setOptions] = useState(false);
  useEffect(() => {
    async function getRelatedProducts() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.amgadfurniture.com/category/${id}/products/`,
          {
            method: "GET",
            headers: {
              accept: "*/*",
              Authorization: localStorage.getItem("access token"),
            },
          }
        );
        const result = await response.json();
        console.log(result);
        if (response.ok) {
          setLoading(false);
          console.log("success get related types");
          setProduct(result.data.products);
        } else {
          setLoading(false);
          setError(error);
          console.log("failed to get related types");
        }
      } catch (error) {
        setLoading(false);
        setError(error);
        console.error(error);
      }
    }
    getRelatedProducts();
  }, [error, id]);

  const updateProductStatus = (id, newStatus) => {
    setProduct((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, is_active: newStatus } : product
      )
    );
  };
  return (
    <div className="relatedProductContainer">
      { error ? (
        <p
          className="text-danger"
          style={ {
            textAlign: "center",
            fontSize: "30px",
            margin: "100px 350px ",
            fontFamily: "Amiri",
          } }
        >
          حدث خطأ أثناء تحميل البيانات....
        </p>
      ) : loading ? (
        <p
          style={ {
            textAlign: "center",
            fontSize: "30px",
            margin: "100px 350px ",
            fontFamily: "Amiri",
          } }
        >
          جاري تحميل البيانات.....
        </p>
      ) : product.length === 0 ? (
        <p className="fw-bolder no-message">
          لا يوجد بيانات لعرضها في الوقت الحالي
        </p>
      ) : (
        <>
          <div
            className="d-flex align-items-center"
            style={ {
              backgroundColor: "#F5F5DC",
              border: "1px solid lightgray",
              borderRadius: "30px",
              padding: "0px 20px 0px 20px",
              width: "200px",
              height: "45px",
            } }
          >
            { [
              ...new Map(
                product.map((item) => [item.category?.id, item.category])
              ).values(),
            ].map(
              (category, index) =>
                category && (
                  <div className="d-flex align-items-center" key={ index }>
                    <img
                      src={ `https://api.amgadfurniture.com${category.icon}` }
                      alt="icon"
                      width="20px"
                      className="ms-2"
                    />
                    <p className="mt-3 me-2 ms-2 fw-bolder">{ category.name }</p>
                  </div>
                )
            ) }
          </div>

          {/* product table */ }
          <div className="tableContainer mt-5">
            <table className="table">
              <thead>
                <tr>
                  <th className="pb-4">م</th>
                  <th className="pb-4">اسم المنتج</th>
                  <th className="pb-4">النوع</th>
                  <th className="pb-4">عدد القطع</th>
                  <th className="pb-4">السعر</th>
                  <th className="pb-4">الحالة</th>
                  <th className="pb-4 text-center">خيارات</th>
                </tr>
              </thead>
              <tbody>
                { product.map((product, index) => (
                  <tr key={ index }>
                    <td className="pb-4">{ index + 1 }</td>
                    <td className="pb-4">{ product.name }</td>
                    <td className="pb-4">
                      { product.category && product.category.name }
                    </td>
                    <td className="pb-4">{ product.stock }</td>
                    <td className="pb-4">{ product.price }</td>
                    <td className="pb-4">
                      { product.is_active === true ? "معروض" : "مخفي" }
                    </td>
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
                              navigate("/HomePage/Edit", { state: { product } })
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
        </>
      ) }
    </div>
  );
}
export default RelatedProducts;
