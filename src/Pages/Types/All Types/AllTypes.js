import React, { useEffect, useState, useRef } from "react";
import "./AllTypes.css";
import DeleteType from "../Delete Type/DeleteType";
import { useNavigate } from "react-router-dom";
function AllTypes() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [options, setOptions] = useState(false);
  const navigate = useNavigate();
  const optionsRef = useRef(null);
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.amgadfurniture.com/categories/",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: localStorage.getItem("access token"),
            },
          }
        );
        const result = await response.json();
        console.log(result);
        if (response.ok) {
          setLoading(false);
          console.log("success get cats");
          setCategory(result.data);
        } else {
          setLoading(false);
          console.log("failed get cats");
          setError(error);
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
        setError(error);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setOptions(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="alltypesContainer">
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

        <p className="mt-3 me-2 ms-2 fw-bolder">جميع الانواع</p>
      </div>
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
          حدث خطأ أثناء تحميل البيانات
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
          جاري تحميل البيانات....
        </p>
      ) : category.length === 0 ? (
        <p className="no-message fw-bolder">
          لا يوجد بيانات لعرضها في الوقت الحالي
        </p>
      ) : (
        <div className="tableContainer mt-5">
          <table className="table">
            <thead>
              <tr>
                <th className="pb-4">م</th>
                <th className="pb-4">النوع</th>
                <th className="text-center pb-4 ">خيارات</th>
              </tr>
            </thead>
            <tbody>
              { category.map((category, index) => (
                <tr key={ index }>
                  <td className="pb-4">{ index + 1 }</td>
                  <td className="pb-4">{ category.name }</td>
                  <td className="text-center pb-4 position-relative options-container">
                    <button
                      className="icon-button"
                      onClick={ (e) => {
                        e.stopPropagation();
                        setOptions(options === category.id ? null : category.id);
                      } }
                      aria-label="Options"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>
                    { options === category.id && (
                      <div
                        className="showOptions"
                        ref={ optionsRef }
                        onClick={ (e) => e.stopPropagation() }
                      >
                        <p
                          className="fw-bolder p-2"
                          style={ { cursor: "pointer" } }
                          onClick={ () =>
                            navigate("/HomePage/EditType", {
                              state: category,
                            })
                          }
                        >
                          تعديل البيانات
                        </p>
                        <p
                          className="fw-bolder p-2"
                          style={ { cursor: "pointer" } }
                          onClick={ () =>
                            navigate(`/HomePage/AllTypes/${category.id}/`)
                          }
                        >
                          عرض المنتجات الخاصة بهذا النوع
                        </p>
                        <DeleteType id={ category.id } />
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
export default AllTypes;
