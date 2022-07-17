import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import Main from "./components/layouts/Main";
import HomePage from "./components/pages/HomePage";
import MovieDetailsPage from "./components/pages/MovieDetailsPage";
import MoviePage from "./components/pages/MoviePage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Main></Main>}>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
          <Route
            path="/movies/:movieId"
            element={<MovieDetailsPage></MovieDetailsPage>}
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
