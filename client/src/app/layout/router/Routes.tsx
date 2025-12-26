import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../../../feature/home/HomePage";
import ActivityDashboard from "../../../feature/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../../feature/activities/form/ActivityForm";
import ActivityDetailPage from "../../../feature/activities/details/ActivityDetailPage";
import Counter from "../../../feature/counter/Counter";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'activities', element: <ActivityDashboard /> },
            { path: 'activities/:id', element: <ActivityDetailPage /> },
            { path: 'createActivity', element: <ActivityForm key='create' /> },
            { path: 'counter', element: <Counter /> },
            { path: 'manage/:id', element: <ActivityForm /> },
        ]
    }
]);