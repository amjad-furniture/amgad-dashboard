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
      { [
        {
          icon: "/assets/images/Group 6356134.png",
          value: status.total_products,
          label: "جميع المنتجات"
        },
        {
          icon: "/assets/images/Group 6356136.png",
          value: status.active_products,
          label: "جميع المنتجات المعروضة"
        },
        {
          icon: "/assets/images/Group 6356138.png",
          value: status.inactive_products,
          label: "جميع المنتجات المخفية"
        },
        {
          icon: "/assets/images/Group 6356140.png",
          value: status.total_categories,
          label: "جميع الانواع الحالية"
        },
        {
          icon: "/assets/images/Group 6356138 (1).png",
          value: status.category_stats && status.category_stats.find(
            (category) => category.category_name === "نيو كلاسيك"
          )?.product_count,
          label: "نيو كلاسيك"
        },
        {
          icon: "/assets/images/Group 6356136 (1).png",
          value: status.category_stats && status.category_stats.find(
            (category) => category.category_name === "كلاسيك"
          )?.product_count,
          label: "كلاسيكي"
        },
        {
          icon: "/assets/images/Group 6356140 (1).png",
          value: status.total_support_messages,
          label: "جميع الرسائل"
        },
        {
          icon: "/assets/images/Group 6356138 (2).png",
          value: status.new_support_messages,
          label: "رسائل جديدة"
        }
      ].map((stat, index) => (
        <div key={ index } className="item">
          <div className="d-flex align-items-center gap-4">
            <div className="stat-icon">
              <img
                src={ stat.icon }
                alt="icon"
                width="35px"
              />
            </div>
            <div className="stat-content">
              <h4 className="mb-0 fw-bolder">{ stat.value }</h4>
              <p>{ stat.label }</p>
            </div>
          </div>
        </div>
      )) }
    </div>
  );
}

export default Container;