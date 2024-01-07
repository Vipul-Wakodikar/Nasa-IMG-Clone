import HomePage from "./Components/HomePage";
import { useSelector } from "react-redux";
import SearchedPage from "./Components/SearchedPage";
import { Route, Routes } from "react-router-dom";
import NotFound from "./Components/NotFound";
import Header from "./Components/Header";

import Test2 from "./Components/Test2";
import Test from "./Components/Test";
import Footer from "./Components/Footer";

function App() {
  const searchValue = useSelector((state) => state.data.value);
  return (
    <>
      <Header />
      <Routes>
        {searchValue === "" && <Route exact path="/" element={<HomePage />} />}
        <Route path="/" exact element={<SearchedPage />} />
        {/* <Route
          path="/"
          exact
          element={searchValue === "" ? <HomePage /> : <SearchedPage />}
        /> */}
        <Route path="test" element={<Test />} />
        <Route path="test2" element={<Test2 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
