import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import Home from "./pages/home";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import Header from "./components/site_template/header";
import Footer from "./components/site_template/footer";
import Signin from "./pages/Signin";
import List from "./pages/List";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
