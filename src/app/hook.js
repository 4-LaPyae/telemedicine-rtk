import { setAuthorize } from "./helper/helperSlice";
import { getLocalStorage } from "./utils/localStorage";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
export const url = "https://api.telemed.sabahna.com/api";
// export const blogUrl =
//     "http://192.168.100.8:5002/api/sys-admin/blogs/uploadphoto";
export const blogUrl =
    "https://api.telemed.sabahna.com/api/sys-admin/blogs/uploadphoto";
//const url = "http://192.168.100.9:5002/api";
// export const url = "http://192.168.100.8:5002/api";

const baseQuery = fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: async (headers) => {
        const user = await getLocalStorage("user");
        if (user) {
            headers.set("Authorization", `Bearer ${user.token}`);
            headers.set("Cache-Control", "no-cache");
        }
        return headers;
    },
});
const baseUrl = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
        api.dispatch(setAuthorize());
    } else {
        return result;
    }
};

// export const baseBlogUrl = fetchBaseQuery({
//   baseUrl: blogUrl,
//   prepareHeaders: async (headers, { _ }) => {
//     const user = await getLocalStorage("user");
//     if (user) {
//       headers.set("Authorization", `Bearer ${user.token}`);
//       headers.set("Cache-Control", "no-cache");
//     }
//     return headers;
//   },
// });

export default baseUrl;
