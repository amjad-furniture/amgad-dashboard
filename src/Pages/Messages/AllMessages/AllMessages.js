import React, { useEffect, useState } from "react";
import "./AllMessages.css";
import DeleteMessage from "../Delete Message/DeleteMessage";
import { useNavigate } from "react-router-dom";

function AllMessages() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function getAllMessages() {
      setLoading(true);
      try {
        const response = await fetch("https://api.amgadfurniture.com/support/", {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        });
        const messages = await response.json();
        if (response.ok) {
          console.log("success get messages");
          setAllMessages(messages.data);
          setLoading(false);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      }
    }
    getAllMessages();
  }, []);

  const handleDeleteMessage = (deletedId) => {
    setAllMessages(allMessages.filter((message) => message.id !== deletedId));
  };

  return (
    <div className="allmessagesContainer">
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
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.98 10.79V14.79C17.98 15.05 17.97 15.3 17.94 15.54C17.71 18.24 16.12 19.58 13.19 19.58H12.79C12.54 19.58 12.3 19.7 12.15 19.9L10.95 21.5C10.42 22.21 9.56 22.21 9.03 21.5L7.82999 19.9C7.69999 19.73 7.41 19.58 7.19 19.58H6.79001C3.60001 19.58 2 18.79 2 14.79V10.79C2 7.86001 3.35001 6.27001 6.04001 6.04001C6.28001 6.01001 6.53001 6 6.79001 6H13.19C16.38 6 17.98 7.60001 17.98 10.79Z"
            stroke="#909090"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21.9791 6.79001V10.79C21.9791 13.73 20.6291 15.31 17.9391 15.54C17.9691 15.3 17.9791 15.05 17.9791 14.79V10.79C17.9791 7.60001 16.3791 6 13.1891 6H6.78906C6.52906 6 6.27906 6.01001 6.03906 6.04001C6.26906 3.35001 7.85906 2 10.7891 2H17.1891C20.3791 2 21.9791 3.60001 21.9791 6.79001Z"
            stroke="#909090"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.4956 13.25H13.5046"
            stroke="#909090"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.99561 13.25H10.0046"
            stroke="#909090"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.49561 13.25H6.50461"
            stroke="#909090"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="mt-3 me-2 ms-2 fw-bolder">جميع الرسائل</p>
      </div>

      { error ? (
        <p
          className="text-danger"
          style={ {
            textAlign: "center",
            fontSize: "30px",
            margin: "100px 350px",
            fontFamily: "Amiri",
          } }
        >
          حدث خطأ أثناء تحميل البيانات...
        </p>
      ) : loading ? (
        <p
          style={ {
            textAlign: "center",
            fontSize: "30px",
            margin: "100px 350px",
            fontFamily: "Amiri",
          } }
        >
          جاري تحميل البيانات....
        </p>
      ) : allMessages.length === 0 ? (
        <p className="fw-bolder no-message">لا يوجد رسائل في الوقت الحالي</p>
      ) : (
        <div className="mt-5 tableContainer">
          <table className="table">
            <thead>
              <tr>
                <th className="pb-4">م</th>
                <th className="pb-4">الاسم</th>
                <th className="pb-4">رقم التليفون</th>
                <th className="pb-4">البريد الالكتروني</th>
                <th className="pb-4">الرسالة</th>
                <th className="pb-4 text-center">خيارات</th>
              </tr>
            </thead>
            <tbody>
              { allMessages.map((message, index) => (
                <tr key={ message.id }>
                  <td className="pb-4">{ index + 1 }</td>
                  <td className="pb-4">{ message.name }</td>
                  <td className="pb-4">{ message.phone_number }</td>
                  <td className="pb-4">{ message.email }</td>
                  <td
                    className="pb-4"
                    onClick={ () =>
                      navigate(`/HomePage/AllMessages/${message.id}/`)
                    }
                    style={ { cursor: "pointer" } }
                  >
                    { message.message }
                  </td>
                  <td className="text-center position-relative">
                    <img
                      src="/assets/images/Group 6356159.png"
                      alt="options"
                      onClick={ () =>
                        setSelectedMessageId(
                          selectedMessageId === message.id ? null : message.id
                        )
                      }
                      style={ { cursor: "pointer" } }
                    />
                    <div>
                      { selectedMessageId === message.id && (
                        <div className="delete-option">
                          <DeleteMessage
                            id={ message.id }
                            onDelete={ handleDeleteMessage }
                          />
                        </div>
                      ) }
                    </div>
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
export default AllMessages;
