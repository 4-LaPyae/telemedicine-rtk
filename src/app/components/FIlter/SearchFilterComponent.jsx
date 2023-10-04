import SimpleInput from "../../../app/components/SimpleInput/index";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";

const SearchFilterComponent = ({
    placeholderName,
    setFilterValue,
}) => {
    const [filter, setFilter] = useState("");
    const searchFilterHandler = (e) => {
        e.preventDefault();
        if (filter.length === 1) setFilterValue("");
        setFilter(e.target.value);
    };
    const sumbitHandler = (e) => {
        e.preventDefault();
        setFilterValue(filter);
    };
    const closeHandler = () => {
        setFilterValue("");
        setFilter("");
    };
    return (
        <form onSubmit={sumbitHandler}>
            <SimpleInput
                fullwidth
                placeholder={placeholderName}
                onChange={searchFilterHandler}
                value={filter}
                startAdornment={
                    <InputAdornment>
                        <IconButton disabled>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment>
                        {filter.length > 0 && (
                            <IconButton>
                                <CloseIcon onClick={closeHandler} />
                            </IconButton>
                        )}
                    </InputAdornment>
                }
            />
        </form>
    );
};

export default SearchFilterComponent;
