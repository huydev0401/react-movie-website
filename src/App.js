import Page404 from "components/Page404";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import Main from "./components/layouts/Main";
// Code splitting Routes -> vo trang nao thi load code cua trang do
const HomePage = lazy(() => import("./components/pages/HomePage"));
const MovieDetailsPage = lazy(() =>
  import("./components/pages/MovieDetailsPage")
);
const MoviePage = lazy(() => import("./components/pages/MoviePage"));

function App() {
  return (
    <>
      <Suspense>
        <Routes>
          <Route element={<Main></Main>}>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
            <Route
              path="/movies/:movieId"
              element={<MovieDetailsPage></MovieDetailsPage>}
            ></Route>
          </Route>
          <Route path="*" element={<Page404></Page404>}></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
