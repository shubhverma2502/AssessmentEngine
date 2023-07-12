import { Box, Button, Card, CardContent, Container, Grid, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { axiosInstance } from '../../../interceptors/AxiosInterceptor';
import { CONTENT_FIELD_ID, FILE_NAME } from '../constants/constants';
import { getContentFields } from '../forms/GetFields';
import { Link } from 'react-router-dom';

const ContentCreate = (props) => {

    const [file, setFile] = useState(null);
    const fields = [CONTENT_FIELD_ID];
    const formFields = getContentFields(fields);
    const [errors, setErrors] = useState({});
    const { t } = useTranslation();

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (Object.keys(errors).length === 0) {
            const formData = new FormData();
            const reader = new FileReader();
            reader.onload = () => {
                const fileData = JSON.parse(reader.result);
                formData.append("file", fileData);
                axiosInstance.post('/content/questions', fileData).then(res => {
                    props?.onSuccess("Questions saved successfully");
                })
            };
            reader.readAsText(file);
        }
    }

    const handleFileChange = (e, field_name) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "application/json") {
            setFile(selectedFile);
            setErrors(delete [field_name]);
        } else {
            setErrors({ [field_name]: { message: "Please select a valid JSON file." } })
        }
    }

    const handleDownload = () => {
        axiosInstance.get("/content/download").then(response => {
            const json = JSON.stringify(response.data);
            const url = window.URL.createObjectURL(new Blob([json]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', FILE_NAME);
            document.body.appendChild(link);
            link.click();
        });
    }
    return (
        <Container maxWidth={"lg"} component={"main"}>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ textAlign: "end" }}>
                            <Link
                                to={"#"}
                                onClick={handleDownload}
                                style={{ fontSize: "14px" }}
                            >
                                Looking for sample schema? Download here
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Box component="form" encType="multipart/form-data" onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    {
                                        formFields.map((field, key) => {
                                            return (
                                                <Grid item key={key} xs={12}>
                                                    <TextField
                                                        type='file'
                                                        key={key}
                                                        {...field}
                                                        onChange={(e) => handleFileChange(e, field.name)}
                                                        fullWidth
                                                        label={t(field.label)}
                                                        error={errors[field.name] ? true : false}
                                                        helperText={(errors?.[field.name]?.message)}
                                                    />
                                                </Grid>
                                            )
                                        })
                                    }
                                    <Grid item xs>
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            size='small'
                                        >
                                            UPLOAD
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    )
}

export default ContentCreate
