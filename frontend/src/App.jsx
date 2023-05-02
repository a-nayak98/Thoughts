import "./styles/scss/MyStyle.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/scss/MyResponsive.scss";
import Home from "./pages/Home";
import SinglePostPage from "./pages/SinglePostPage";
import CreatePost from "./pages/CreatePost";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ModalContext } from "./context/ModalContext";
import { useEffect, useState } from "react";
import axios from "axios";
import CurrentUserPostsPage from "./pages/CurrentUserPostsPage";

const postId = 1234;
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: `/single-post`,
    element: <SinglePostPage />,
  },
  {
    path: "/create_post",
    element: <CreatePost />,
  },
  {
    path: "/current-user-post",
    element: <CurrentUserPostsPage />,
  },
]);

// secret key to verify the token expiry
// const secretKey = "bloggingWebsite@BabuNayak1997";

function App() {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    avatar: null,
    name: "User",
    token: null,
    _id: null,
  });
  // state is used to save user submission  data on current state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    croppedFile: null,
    edit: false,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleUser = (userData) => setUser(userData);
  let token = localStorage.getItem("userToken");

  // Api Url
  const ApiUrl = "https://thoughts-b9rq.onrender.com";

  const userData = async () => {
    try {
      // api call for get user rote(/api/getUser)
      // console.log(token);
      const response = await axios.get(`${ApiUrl}/api/get-user`, {
        headers: {
          token: token,
        },
      });
      // console.log(response, "mililaaaa");
      const userData = response.data.data;
      // console.log(user);
      setUser({ ...userData });
      return user;
    } catch (error) {
      console.log(error.response, "response err");
      if (error.response.status === 401) {
        localStorage.removeItem("userToken");
      }
    }
  };

  useEffect(() => {
    if (token) {
      userData();
    }
  }, []);

  return (
    <ModalContext.Provider
      value={{
        show,
        handleClose,
        handleShow,
        handleUser,
        user,
        formData,
        setFormData,
      }}
    >
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ModalContext.Provider>
  );
}

export default App;
