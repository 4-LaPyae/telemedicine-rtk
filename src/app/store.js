import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { loginApi } from "../pages/login/feature/LoginApi";
import LoginSlice from "../pages/login/feature/LoginSlice";
import { AuthSliceReducer } from "./utils/authSlice";
import { adminApi } from "../pages/sysadmin/feature/sysAdminApi";
import { patientApi } from "../pages/patient/feature/patientApi";
import { doctorApi } from "../pages/doctor/feature/doctorApi";
import { coDoctorApi } from "../pages/doctor/feature/doctorApi";
import { specialistApi } from "../pages/specialist/feature/specialistApi";
import { inAppointmentApi } from "../pages/appointment/feature/appointmentApi";
import { coAppointmentApi } from "../pages/appointment/feature/appointmentApi";
import { HelperSlice } from "./helper/helperSlice";
import BlogSlice from "../pages/blogs/features/BlogSlice";
import { categoriesApi } from "../pages/categories/features/CategoriesApi";
import { dashboardApi } from "../pages/dashboard/feature/dashboardApi";
import { tagsApi } from "../pages/tags/features/TagsApi";
import { blogApi } from "../pages/blogs/features/BlogApi";
import { DashboardSlice } from "../pages/dashboard/feature/dashboardSlice";
import { packagesApi } from "../pages/packages/features/PackagesApi";
import { promoCodeApi } from "../pages/promo_code/feature/promoCodeApi";
import { paymentApi } from "../pages/setting/feature/paymentApi";
import { accountantApi } from "../pages/accountant/features/AccountantApi";
import { CsvSlice } from "./helper/csvDataSlice";

export const store = configureStore({
    reducer: {
        auth: AuthSliceReducer,
        HelperSlice,
        LoginSlice,
        BlogSlice,
        DashboardSlice,
        CsvSlice,
        [loginApi.reducerPath]: loginApi.reducer,
        [patientApi.reducerPath]: patientApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [doctorApi.reducerPath]: doctorApi.reducer,
        [coDoctorApi.reducerPath]: coDoctorApi.reducer,
        [coAppointmentApi.reducerPath]: coAppointmentApi.reducer,
        [inAppointmentApi.reducerPath]: inAppointmentApi.reducer,
        [specialistApi.reducerPath]: specialistApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        [tagsApi.reducerPath]: tagsApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [packagesApi.reducerPath]: packagesApi.reducer,
        [promoCodeApi.reducerPath]: promoCodeApi.reducer,
        [paymentApi.reducerPath]: paymentApi.reducer,
        [accountantApi.reducerPath]: accountantApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            loginApi.middleware,
            adminApi.middleware,
            doctorApi.middleware,
            coDoctorApi.middleware,
            patientApi.middleware,
            inAppointmentApi.middleware,
            coAppointmentApi.middleware,
            specialistApi.middleware,
            categoriesApi.middleware,
            dashboardApi.middleware,
            tagsApi.middleware,
            blogApi.middleware,
            packagesApi.middleware,
            promoCodeApi.middleware,
            paymentApi.middleware,
            accountantApi.middleware,
        ]),
});

setupListeners(store.dispatch);
