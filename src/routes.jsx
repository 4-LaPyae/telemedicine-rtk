import {
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoutes from "./app/utils/PrivateRoutes";
import Doctor from "./pages/doctor/Doctor";
import Patients from "./pages/patient/Patients";
import Login from "./pages/login/Login";
import Appointment from "./pages/appointment/Appointment";
import Specialist from "./pages/specialist/Specialist";
import SysAdmin from "./pages/sysadmin/SysAdmin";
import LayoutWrapper from "./LayoutWrapper";
import Blogs from "./pages/blogs/Blogs";
import Categories from "./pages/categories/Categories";
import Tags from "./pages/tags/Tags";
import Profile from "./pages/profile/Profile";
import BlogUpload from "./pages/blogs/components/BlogUpload";
import BlogUpdate from "./pages/blogs/components/BlogUpdate";
import PatientDetail from "./pages/patient/components/patient_detail/PatientDetail";
import DoctorDetail from "./pages/doctor/component/doctor_detail/DoctorDetail";
import Package from "./pages/packages";
import PromoCode from "./pages/promo_code/PromoCode";
import Setting from "./pages/setting/Setting";
import Payment from "./pages/setting/component/payment/Payment";
import Accountant from "./pages/accountant/Accountant";

export default function routes() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <LayoutWrapper />,
            children: [
                {
                    id: "dashboard",
                    path: "/dashboard",
                    element: <Dashboard />,
                },
                {
                    id: "doctor",
                    path: "/doctors",
                    element: <Doctor />,
                },
                {
                    path: "/doctors/:name",
                    element: <DoctorDetail />,
                },
                {
                    id: "patient",
                    path: "/patients",
                    element: <Patients />,
                },
                {
                    path: "/patients/:name",
                    element: <PatientDetail />,
                },
                {
                    id: "appointment",
                    path: "/appointment",
                    element: <Appointment />,
                    // element: <Appointment2 />,
                },
                {
                    id: "specialist",
                    path: "/specialist",
                    element: <Specialist />,
                },
                {
                    id: "packages",
                    path: "/packages",
                    element: <Package />,
                },
                {
                    id: "accountant",
                    path: "/accountant",
                    element: <Accountant />,
                },
                {
                    id: "sys-admin",
                    path: "/sys-admin",
                    element: <SysAdmin />,
                },
                {
                    id: "blogs",
                    path: "/blogs",
                    element: <Blogs />,
                },
                {
                    id: "blogUpload",
                    path: "/blogs/upload",
                    element: <BlogUpload />,
                },
                {
                    id: "blogUpdate",
                    path: "/blogs/update",
                    element: <BlogUpdate />,
                },
                {
                    id: "categories",
                    path: "/categories",
                    element: <Categories />,
                },
                // {
                //   id: "sub-categories",
                //   path: "/sub-categories",
                //   element: <Tags />,
                // },
                {
                    id: "profile",
                    path: "profile",
                    element: <Profile />,
                },
                {
                    id: "setting",
                    path: "setting",
                    element: <Setting />,
                },
                {
                    id: "payment",
                    path: "/setting/payment",
                    element: <Payment />,
                },
                {
                    id: "promocode",
                    path: "setting/promocode",
                    element: <PromoCode />,
                },
            ],
        },
        {
            id: "login",
            path: "/*",
            element: (
                <PrivateRoutes>
                    <Login />
                </PrivateRoutes>
            ),
        },
    ]);

    return <RouterProvider router={router} />;
}
