import React, { useState } from "react";
import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; //up and down arrow

function SidebarBox() {
  const [openItemId, setOpenItemId] = useState(null);
  const [activeItemId, setActiveItemId] = useState(null);
  const navigate = useNavigate();

  const handleToggle = (itemId) => {
    setOpenItemId((prevItemId) => (prevItemId === itemId ? null : itemId));
  };

  const handleNavigate = (itemId, navigateTo) => {
    setActiveItemId(itemId);
    navigate(navigateTo);
  };

  const menuItems = [
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
            stroke="#909090"
            stroke-width="1.5"
          />
          <path
            d="M15 18H9"
            stroke="#909090"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      ),
      title: "الصفحة الريئسية",
      itemId: "home",
      navigateTo: "/HomePage",
    },
    {
      icon: (
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
      ),
      title: "الانواع",
      itemId: "types",
      subItems: [
        { title: "جميع الأنواع", navigateTo: "/HomePage/AllTypes" },
        { title: "اضافة نوع جديد", navigateTo: "/HomePage/AddNewType" },
      ],
    },
    {
      icon: (
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
      ),
      title: "المنتجات",
      itemId: "productd",
      subItems: [
        { title: "جميع المنتجات", navigateTo: "/HomePage/AllCats" },
        { title: "اضافة منتج جديد", navigateTo: "/HomePage/AddNewCat" },
        { title: "كلاسيك", navigateTo: "/HomePage/ClassicProducts" },
        { title: "نيو كلاسيك", navigateTo: "/HomePage/ModrenProducts" },
      ],
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.98 10.79V14.79C17.98 15.05 17.97 15.3 17.94 15.54C17.71 18.24 16.12 19.58 13.19 19.58H12.79C12.54 19.58 12.3 19.7 12.15 19.9L10.95 21.5C10.42 22.21 9.56 22.21 9.03 21.5L7.82999 19.9C7.69999 19.73 7.41 19.58 7.19 19.58H6.79001C3.60001 19.58 2 18.79 2 14.79V10.79C2 7.86001 3.35001 6.27001 6.04001 6.04001C6.28001 6.01001 6.53001 6 6.79001 6H13.19C16.38 6 17.98 7.60001 17.98 10.79Z"
            stroke="#909090"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21.9791 6.79001V10.79C21.9791 13.73 20.6291 15.31 17.9391 15.54C17.9691 15.3 17.9791 15.05 17.9791 14.79V10.79C17.9791 7.60001 16.3791 6 13.1891 6H6.78906C6.52906 6 6.27906 6.01001 6.03906 6.04001C6.26906 3.35001 7.85906 2 10.7891 2H17.1891C20.3791 2 21.9791 3.60001 21.9791 6.79001Z"
            stroke="#909090"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.4956 13.25H13.5046"
            stroke="#909090"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.99561 13.25H10.0046"
            stroke="#909090"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.49561 13.25H6.50461"
            stroke="#909090"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      title: "الرسائل",
      itemId: "messages",
      navigateTo: "/HomePage/AllMessages",
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebarContainer">
        <ul className="menu">
          {menuItems.map((item) => (
            <li key={item.itemId || item.title} className="menu-item">
              <div
                className={`menu-item-header ${
                  activeItemId === item.itemId ? "active-item" : ""
                }`}
                onClick={() => {
                  setActiveItemId(item.itemId);
                  if (item.navigateTo) {
                    handleNavigate(item.itemId, item.navigateTo);
                  } else {
                    handleToggle(item.itemId);
                  }
                }}
              >
                <span>
                  <span className="menu-item-icon">{item.icon}</span>
                  {item.title}
                </span>
                {item.subItems ? (
                  openItemId === item.itemId ? (
                    <FaChevronUp className="up-icon" />
                  ) : (
                    <FaChevronDown className="down-icon" />
                  )
                ) : null}
              </div>
              {item.subItems && openItemId === item.itemId && (
                <ul className="submenu">
                  {item.subItems.map((subItem, index) => (
                    <li
                      key={index}
                      className={`submenu-item ${
                        activeItemId === subItem.navigateTo ? "active-item" : ""
                      }`}
                      onClick={() => {
                        setActiveItemId(subItem.navigateTo);
                        navigate(subItem.navigateTo);
                      }}
                    >
                      {subItem.title}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SidebarBox;