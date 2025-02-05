import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Auth/Login/Login";
import ForgotPassword from "./Auth/Forgot Password/ForgotPassword";
import ConfirmCode from "./Auth/Confirm Code/ConfirmCode";
import NewPassword from "./Auth/Create New Password/NewPassword";
import HomePage from "./Pages/Home Page/HomePage";
import AllTypes from "./Pages/Types/All Types/AllTypes";
import Container from "./Pages/Container/Container";
import AllMessages from "./Pages/Messages/AllMessages/AllMessages";
import DeleteMessage from "./Pages/Messages/Delete Message/DeleteMessage";
import AddNewType from "./Pages/Types/Add New Type/AddNewType";
import AllCats from "./Pages/Categories/All Categories/AllCats";
import EditProductForm from "./Pages/Categories/Edit Cats/Edit";
import AddNewCat from "./Pages/Categories/Add New Cats/AddNewCat";
import MessageDetail from "./Pages/Messages/Message Detail/MessageDetail";
import ClassicProducts from "./Pages/Categories/Classic Cats/ClassicProducts";
import ModrenProducts from "./Pages/Categories/Modren Cats/ModrenProducts";
import RelatedProducts from "./Pages/Types/Related Products/RelatedProducts";
import EditType from "./Pages/Types/Edit Type/EditType";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ConfirmCode" element={<ConfirmCode />} />
        <Route path="/NewPassword" element={<NewPassword />} />

        <Route path="/HomePage" element={<HomePage />}>
          <Route index element={<Container />} />
          <Route path="/HomePage/AllTypes" element={<AllTypes />} />
          <Route path="/HomePage/AllMessages" element={<AllMessages />} />
          <Route path="/HomePage/DeleteMessage" element={<DeleteMessage />} />
          <Route path="/HomePage/AddNewType" element={<AddNewType />} />
          <Route path="/HomePage/AllCats" element={<AllCats />} />
          <Route path="/HomePage/EditProductForm" element={<EditProductForm />} />
          <Route path="/HomePage/AddNewCat" element={<AddNewCat />} />
          <Route
            path="/HomePage/AllMessages/:id/"
            element={<MessageDetail />}
          />
          <Route
            path="/HomePage/ClassicProducts"
            element={<ClassicProducts />}
          />
          <Route path="/HomePage/ModrenProducts" element={<ModrenProducts />} />
          <Route path="/HomePage/AllTypes/:id/" element={<RelatedProducts />} />
          <Route path="/HomePage/EditType" element={<EditType />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
