import { Card, CardContent, Chip, Popover, Stack } from "@mui/material";

export function SortFilterPopover(props) {

    const { el, filters, handleClose } = props;
    const popOverOpen = Boolean(el);

    return (
        <Popover
            id={"ae-sort-filter-popover"}
            open={popOverOpen}
            anchorEl={el}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <Card>
                <CardContent>
                    <Stack
                        direction={"column"}
                        spacing={2}
                    >
                        {
                            filters && filters.length > 0
                                ? filters.map((filter, idx) => {
                                    return (
                                        <Chip label={filter} key={idx}
                                            onClick={(event) => props.onFilterSelection(event, filter)}
                                            size={"small"}
                                        >
                                        </Chip>
                                    )
                                })
                                : <></>
                        }
                    </Stack>
                </CardContent>
            </Card>
        </Popover>
    )
};