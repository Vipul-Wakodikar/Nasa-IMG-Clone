import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import NotFound from "./Components/NotFound";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import DetailsPage from "./Components/DetailsPage";

// Lazy-loaded components
const HomePage = lazy(() => import("./Components/HomePage"));
const SearchedPage = lazy(() => import("./Components/SearchedPage"));
const Test = lazy(() => import("./Components/Test"));
const Test2 = lazy(() => import("./Components/Test"));

function App() {
  const searchValue = useSelector((state) => state.data.value);
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {searchValue === "" && (
            <Route exact path="/" element={<HomePage />} />
          )}
          <Route path="/" exact element={<SearchedPage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="test" element={<Test />} />
          <Route path="test2" element={<Test2 />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
