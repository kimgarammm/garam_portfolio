import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "@src/index.css";
import { router } from "./router/router.tsx";

export const AppRouter = () => {
    return (
            <RouterProvider router={router} />
    );
};
const app = ReactDOM.createRoot(
    document.getElementById("root")! as HTMLElement,
);
app.render(<AppRouter />);
