import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseUrl, { url } from "../../../app/hook";
import { getLocalStorage } from "../../../app/utils/localStorage";
const user = await getLocalStorage("user");
export const accountantApi = createApi({
    reducerPath: "accountantApi",
    baseQuery: baseUrl,
    keepUnusedDataFor: 0,
    tagTypes: ["Accountant"],
    endpoints: (builder) => ({
        getAccountant: builder.query({
            query: (data) => ({
                url: `/sys-admin/patients/subscribe?page=${data.page}&limit=${data.limit}&phoneName=${data.filterPhoneName}&packageId=${data.packageId}&promoCode=${data.promoCode}`,
                method: "GET",
            }),
            providesTags: ["Accountant"],
        }),
    }),
});
export const { useGetAccountantQuery } = accountantApi;

export const getAllSubscribedPatients = async () => {
    // console.log(user.token);
    const res = await fetch(`${url}/sys-admin/patients/subscribe`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + user.token,
        },
    });
    const data = await res.json();
    // console.log(data);
    return data;
};
