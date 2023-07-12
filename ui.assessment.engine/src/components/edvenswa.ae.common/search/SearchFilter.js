import { Close, Search } from "@mui/icons-material";
import { Alert, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

export default function SearchFilter(props) {

    const { elements, searchKey, setFilteredElements } = props;
    const [value, setValue] = useState("");
    const [noResults, setNoResults] = useState(false);


    const handleChange = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const value = event.target.value.toLowerCase();
        setValue(event.target.value);
        if (value) {
            const filteredElements = elements.filter((element) => element[searchKey].toLowerCase().includes(value));
            setFilteredElements(filteredElements);
            setNoResults(filteredElements.length === 0);

        } else {
            setFilteredElements(elements);
            setNoResults(false);
        }
    };

    return (
        <>
            <TextField
                name="search"
                label="Search"
                size="small"
                value={value}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <Close fontSize="small" sx={{ cursor: "pointer" }} onClick={() => {
                                setValue("");
                                setFilteredElements(elements);
                                setNoResults(false);
                            }} />
                        </InputAdornment>
                    )
                }}
                onChange={handleChange}
            />
            {noResults && (<Alert severity="warning">
                No results found with term: {value}
            </Alert>)}
        </>
    )
}