import {
    faCalendarCheck,
    faHouse,
    faStethoscope,
    faUserDoctor,
    faHospitalUser,
    faBlog,
    faList,
    faHashtag,
    faRightFromBracket,
    faCircleUser,
    faUserGear,
    faCubes,
    faFileCode,
    faGear,
    faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import { clearLocalStorage } from "../../utils/localStorage";

export const BlogRoutes = [
    {
        text: "Blogs",
        route: "blogs",
        icon: faBlog,
    },
    {
        text: "Categories",
        route: "categories",
        icon: faList,
    },
    // {
    //   text: "Sub-Categories",
    //   route: "sub-categories",
    //   icon: faHashtag,
    // },
];

export const Routes = [
    {
        text: "Dashboard",
        route: "dashboard",
        icon: faHouse,
    },
    {
        text: "Doctors",
        route: "doctors",
        icon: faUserDoctor,
    },
    {
        text: "Patients",
        route: "patients",
        icon: faHospitalUser,
    },
    {
        text: "Appointment",
        route: "appointment",
        icon: faCalendarCheck,
    },
    {
        text: "Specialist",
        route: "specialist",
        icon: faStethoscope,
    },
    {
        text: "Packages",
        route: "packages",
        icon: faCubes,
    },
    {
        text: "Accountant",
        route: "accountant",
        icon: faReceipt,
    },
    {
        text: "System Admin",
        route: "sys-admin",
        icon: faUserGear,
    },
];

// const

export const ProfileRoute = [
    {
        text: "Profile",
        route: "profile",
        icon: faCircleUser,
    },
    {
        text: "Setting",
        route: "setting",
        icon: faGear,
    },
    {
        text: "Logout",
        route: "logout",
        icon: faRightFromBracket,
        action: () => clearLocalStorage("user"),
    },
];
