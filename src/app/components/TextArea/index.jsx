import TextareaAutosize from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import PropTypes from "prop-types";
export default function SimpleTextArea({ placeholder = "Name" }) {
    const StyledTextarea = styled(TextareaAutosize)(
        () => `
    line-height: 1.5;
    padding: 12px;
    font-family:Poppins,Helvetica,sans-serif;
    font-weight: 100;
    font-size:15px;
    border-radius: 8px 8px 0 8px;
    border: #d2d6da solid 2px;
    &:focus {
        border: #088395 solid 2px;
        outline: 0
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
    );

    return (
        <StyledTextarea
            aria-label="empty textarea"
            placeholder={placeholder}
        />
    );
}

SimpleTextArea.propTypes = {
    placeholder: PropTypes.string,
};
