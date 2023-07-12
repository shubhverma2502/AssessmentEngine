import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slider, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function OptionsDialogBox(props) {
    const { formData, setFormData, setOptions, setCorrectOptions, options, correctOptions, questionType, setDialogOpen, dialogOpen } = props;
    const [optionsCount, setOptionsCount] = useState(0);

    useEffect(() => {
        if (options.length > 0) {
            setOptionsCount(options.length);
            setOptions(options);
        }
    }, []);

    const handleChange = (event, value) => {
        setOptionsCount(value);
    };

    const handleOptionChange = (event, index) => {
        const newOptions = [...options];
        newOptions[index] = event.target.value;
        setOptions(newOptions);
    };

    const handleCheckboxChange = (event, index) => {
        if (formData.questionType === 'RADIO') {
            const selectedOptionIndex = event.target.checked ? index : null;
            setCorrectOptions([selectedOptionIndex]);
        } else {
            const newCorrectOptions = correctOptions ? [...correctOptions] : [];
            if (event.target.checked) {
                newCorrectOptions.push(index);
            } else {
                const selectedIndex = newCorrectOptions.indexOf(index);
                if (selectedIndex !== -1) {
                    newCorrectOptions.splice(selectedIndex, 1);
                }
            }
            setCorrectOptions(newCorrectOptions);
        }
    };

    const handleApply = () => {
        const selectedCorrectOptions = correctOptions ? correctOptions.map(index => options[index]) : [];
        setFormData({
            ...formData,
            options: options,
            correctOptions: selectedCorrectOptions
        });
        setDialogOpen(false);
    };

    const optionFields = [];
    for (let i = 0; i < optionsCount; i++) {
        optionFields.push(
            <Grid item xs={12} key={i}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        defaultValue={options.length > 0 ? options[i] : ''}
                        style={{ width: '100%' }}
                        label={`Option ${i + 1}`}
                        onChange={(event) => handleOptionChange(event, i)}
                    />
                    <Checkbox
                        checked={correctOptions ? correctOptions.includes(i) : false}
                        onChange={(event) => handleCheckboxChange(event, i)}
                    />
                </Box>
            </Grid>
        );
    }

    return (
        <Dialog open={dialogOpen}>
            <DialogTitle>Options Configuration</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Typography gutterBottom>
                                Options Count
                            </Typography>
                        </Grid>
                        <Slider
                            value={optionsCount}
                            onChange={(event, value) => handleChange(event, value)}
                            step={1}
                            valueLabelDisplay='on'
                            min={0}
                            max={6}
                        />
                    </Grid>
                    {optionFields}
                    <Grid item xs={12}>
                        <Button
                            size="small"
                            variant="contained"
                            type="submit"
                            color="secondary"
                            onClick={handleApply}
                        >
                            Apply
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    size="small"
                    variant="contained"
                    onClick={() => {
                        setDialogOpen(false);
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};