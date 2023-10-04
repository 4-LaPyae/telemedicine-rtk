import { styled } from "@mui/material/styles";
import { Autocomplete } from "@mui/material";

export default styled(Autocomplete)(({ theme, ownerState }) => {
    const { fullWidth } = ownerState;
    return {
        width: fullWidth ? "100%" : 340,
        "& .MuiOutlinedInput-root.MuiInputBase-root": {
            padding: "8px 12px",
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: 2,
            borderRadius: "0.5rem",
            borderColor: "#d2d6da",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
                borderColor: "#35d1f5 ",
            },
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#35d1f5",
        },

        // select list color
        "& .MuiAutocomplete-listbox .MuiAutocomplete-option[aria-selected=true]":
            {
                backgroundColor: "rgb(51 88 216 / 25%)",
            },
    };
});
