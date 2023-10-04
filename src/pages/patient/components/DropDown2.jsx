import { useState } from "react";

const DropDown2 = ({ items, setGender, setBloodType }) => {
  const handleSelectChange = (e) => {
    if (setGender) setGender(e.target.value);
  };
  return (
    <>
      <select
        id="cars"
        style={{
          borderColor: "#4eb70d",
          borderRadius: "5px",
          cursor: "pointer",
          textAlignLast: "center",
          outline: "none",
          //   boxShadow: "0 0 5px #4eb70d", // Optional: Add a focus shadow
        }}
        onChange={handleSelectChange}
      >
        {items?.map((item) => (
          <>
            <option value={item}>{item}</option>
          </>
        ))}
      </select>
    </>
  );
};

export default DropDown2;
