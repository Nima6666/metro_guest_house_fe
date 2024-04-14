import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Form from "./pages/home";
import ImageUploadForm from "./pages/imageUpload";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <ImageUploadForm />,
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
