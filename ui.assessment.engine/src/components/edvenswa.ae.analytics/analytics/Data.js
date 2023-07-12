import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { saveAs } from "file-saver";

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { utils, write } from "xlsx";

const Data = () => {
  const location = useLocation();
  const barData = location.state.data[0].data;
  const Title = location.state.data[0].title;

  const exportToExcel = () => {
    const table = document.getElementById("he");

    const workbook = utils.table_to_book(table);
    const excelBuffer = write(workbook, { bookType: "xlsx", type: "array" });

    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(data, "alalytics.xlsx");
  };

  return (
    <>
      <Typography
        gutterBottom
        variant="h4"
        sx={{ textAlign: "center",marginTop:5}}
        component="h4"
        className="printableArea"
      >
        {Title}
      </Typography>

      <Button
        sx={{ float: "right", margin: "10px", paddingLeft: "14px" }}
        onClick={() => {
          window.print();
        }}
      >
        Export to PDF
      </Button>

      <Button
        sx={{ float: "right", margin: "10px", paddingLeft: "14px" }}
        onClick={() => {
          exportToExcel();
        }}
      >
        Export to EXCEL
      </Button>

      <TableContainer component={Paper} className="printableArea">
        <Table id="he" sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {location.state.labels.map((label) => {
                return <TableCell>{label}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {barData.map((data) => {
                return <TableCell>{data}</TableCell>;
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Data;
