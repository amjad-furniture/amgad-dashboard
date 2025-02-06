import React, { useEffect, useState } from "react";
import "./Container.css";

function Container() {
  const [status, setStatus] = useState({});

  useEffect(() => {
    async function fetchDashboardStatus() {
      try {
        const response = await fetch(
          "https://api.amgadfurniture.com/dashboard-stats/",
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
          console.log("success fetch status");
          setStatus(result.data);
        } else {
          console.log("failed fetch status");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchDashboardStatus();
  }, []);

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-around item">
        <div>
          <img
            src="/assets/images/Group 6356134.png"
            alt="icon"
            width={ "35px" }
          />
        </div>
        <div className="mt-3">
          <h4 className="mb-0 fw-bolder">{ status.total_products }</h4>
          <p>جميع المنتجات</p>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-around item">
        <div>
          <img
            src="/assets/images/Group 6356136.png"
            alt="icon"
            width={ "35px" }
          />
        </div>
        <div className="mt-3">
          <h4 className="mb-0 fw-bolder">{ status.active_products }</h4>
          <p>
            جميع المنتجات
            <br /> المعروضة
          </p>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-around item">
        <div>
          <img
            src="/assets/images/Group 6356138.png"
            alt="icon"
            width={ "35px" }
          />
        </div>
        <div className="mt-3">
          <h4 className="mb-0 fw-bolder">{ status.inactive_products }</h4>
          <p>
            جميع المنتجات <br />
            المخفية
          </p>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-around item">
        <div>
          <img
            src="/assets/images/Group 6356140.png"
            alt="icon"
            width={ "35px" }
          />
        </div>
        <div className="mt-3">
          <h4 className="mb-0 fw-bolder">{ status.total_categories }</h4>
          <p>
            جميع الانواع <br />
            الحالية
          </p>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-around item">
        <div>
          <img
            src="/assets/images/Group 6356138 (1).png"
            alt="icon"
            width={ "35px" }
          />
        </div>
        <div className="mt-3">
          <h4 className="mb-0 fw-bolder">
            {
              status.category_stats &&
              status.category_stats.find(
                (category) => category.category_name === "Modern"
              )?.product_count
            }
          </h4>
          <p>نيو كلاسيك</p>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-around item">
        <div>
          <img
            src="/assets/images/Group 6356136 (1).png"
            alt="icon"
            width={ "35px" }
          />
        </div>
        <div className="mt-3">
          <h4 className="mb-0 fw-bolder">
            {
              status.category_stats &&
              status.category_stats.find(
                (category) => category.category_name === "classic"
              )?.product_count
            }
          </h4>
          <p>كلاسيكي</p>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-around item">
        <div>
          <img
            src="/assets/images/Group 6356140 (1).png"
            alt="icon"
            width={ "35px" }
          />
        </div>
        <div className="mt-3">
          <h4 className="mb-0 fw-bolder">{ status.total_support_messages }</h4>
          <p>جميع الرسائل</p>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-around item">
        <div>
          <img
            src="/assets/images/Group 6356138 (2).png"
            alt="icon"
            width={ "35px" }
          />
        </div>
        <div className="mt-3">
          <h4 className="mb-0 fw-bolder">{ status.new_support_messages }</h4>
          <p>رسائل جديدة</p>
        </div>
      </div>
    </div>
  );
}

export default Container;