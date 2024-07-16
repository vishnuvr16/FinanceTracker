import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage/HomePage.jsx";
import LoginForm from "./components/Users/Login.jsx";
import RegistrationForm from "./components/Users/Register.jsx";
import PublicNavbar from "./components/Navbar/PublicNavbar.jsx";
import PrivateNavbar from "./components/Navbar/PrivateNavbar.jsx";
import { getUserFromStorage } from "./utils/getUserFromStorage.js";
import { useSelector } from "react-redux";
import AddCategory from "./components/Category/AddCategory.jsx";
import CategoriesList from "./components/Category/CategoryLists.jsx";
import UpdateCategory from "./components/Category/UpdateCategory.jsx";
import AuthRoute from "./components/Auth/AuthRoute.jsx";
import TransactionForm from "./components/Transactions/TransactionForm.jsx";
import TransactionList from "./components/Transactions/TransactionList.jsx";
import UserProfile from "./components/Users/Profile.jsx";
import Dashboard from "./components/Users/Dashboard.jsx";

function App() {
  // get the token
  // const token = getUserFromStorage();
  const user = useSelector((state) => state?.auth?.user);
  return (
    <BrowserRouter>
      {user ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/categories" element={<CategoriesList />} />
        <Route
          path="/update-category/:id"
          element={
            <AuthRoute>
              <UpdateCategory />
            </AuthRoute>
          }
        />
        <Route path="/add-transaction" element={<TransactionForm />} />
        <Route path="/transactions/lists" element={<TransactionList />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
