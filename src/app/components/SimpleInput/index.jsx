import { InputBase } from "@mui/material";
import PropTypes from "prop-types";
export default function SimpleInput({
  placeholder = "Name",
  type,
  fullwidth = false,
  autoFocus = false,
  required = false,
  endAdornment = null,
  ...rest
}) {
  return (
    <InputBase
      {...rest}
      endAdornment={endAdornment}
      placeholder={placeholder}
      type={type}
      fullWidth={fullwidth ? true : false}
      autoFocus={autoFocus ? true : false}
      required={required ? true : false}
      sx={{
        border: "#d2d6da solid 2px",
        borderRadius: "12px",
        fontSize: "0.875em",
        padding: 1.1,
        "&.Mui-focused": {
          border: "#4eb70d solid 2px",
          outline: 0,
        },
      }}
    />
  );
}

SimpleInput.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  fullwidth: PropTypes.bool,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  endAdornment: PropTypes.object,
};
