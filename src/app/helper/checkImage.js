import DocMale from "../assets/images/DMP.png";
import DocFemale from "../assets/images/DFP.jpeg";
import DefaultAdmin from "../assets/images/Admin.jpg";

export const checkImageLink = (e, gender = "MALE") => {
  if (e) {
    e.currentTarget.src = gender === "MALE" ? DocMale : DocFemale;
  } else {
    return gender === "MALE" ? DocMale : DocFemale;
  }
};

export const checkProfileImageLink = (e) => {
  return DefaultAdmin;
};
