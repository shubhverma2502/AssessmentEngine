import React, { useState } from "react";
import { FilterAlt, FilterAltOff } from "@mui/icons-material";
import { SortFilterPopover } from "./SortFilterPopover";

export default function SortFilter(props) {

    const { elements, searchKey, setFilteredElements } = props;
    const [filterPopoverEl, setFilterPopoverEl] = useState(null);
    const [filterMode, setFilterMode] = useState(true);

    const handleFilterSelection = (event, filter) => {
        event.preventDefault();
        const filteredItems = elements.filter(element => element[searchKey] === filter);
        setFilteredElements(filteredItems);
        // close the popover on selection
        setFilterPopoverEl(null);
        // set the filter mode to false
        setFilterMode(false);
    };

    return (
        <React.Fragment>
            {
                filterMode
                    ? <FilterAlt fontSize="large" sx={{ color: "grey" }}
                        onClick={(event) => {
                            setFilterPopoverEl(event.target);
                        }}
                    />
                    : <FilterAltOff fontSize="large" sx={{ color: "grey" }}
                        onClick={(event) => {
                            event.preventDefault();
                            setFilterMode(true);
                            setFilteredElements(elements);
                        }}
                    />
            }
            <SortFilterPopover
                el={filterPopoverEl}
                handleClose={() => setFilterPopoverEl(null)}
                // In future, the filters can be generic and the parent component should pass the filters.
                filters={[...new Set(elements.map((element) => element[searchKey]))]}
                onFilterSelection={handleFilterSelection}
            />
        </React.Fragment>
    );
};