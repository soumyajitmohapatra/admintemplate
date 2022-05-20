import "./App.css";
import { useDispatch } from "react-redux";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { store } from "./store";
import { useEffect, useState, lazy, Suspense } from "react";
import { userAdded } from "./store/userSlice";

const Dashboard = lazy(() => import("./views/Dashboard"));
const SamplePage = lazy(() => import("./views/SamplePage"));
const Login = lazy(() => import("./views/Login"));
const Layout = lazy(() => import("./Layout"));

function App() {
  const [islogged, setIslogged] = useState(false);

  function select(state) {
    return state.user;
  }
  function handleChange() {
    setIslogged(select(store.getState()).islogged);
    console.log("call", select(store.getState()).isLoading);
  }

  const unsubscribe = store.subscribe(handleChange);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Root />} />
          <Route element={<PrivateOutlet islogged={islogged} />}>
            <Route
              path="/dashboard"
              element={
                <Suspense fallback={<h1>Loading.......</h1>}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="/sample-page"
              element={
                <Suspense fallback={<h1>Loading.......</h1>}>
                  <SamplePage />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

function PrivateOutlet({ islogged }) {
  return islogged ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
}

const Root = ({ loading }) => {
  const [isLoading, setIsloading] = useState(true);

  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const t = setTimeout(() => {
      // dispatch(userAdded({ data: { email: "SAM", password: "password" } }));
      setIsloading(false);
      navigate("/dashboard");
    }, 5000);
    return () => {
      clearTimeout(t);
    };
  }, []);
  if (isLoading){
    return (
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "40%",
        }}
      >
        <div style={{}}></div>
        <h1>Loading............</h1>
      </div>
    )}
};
