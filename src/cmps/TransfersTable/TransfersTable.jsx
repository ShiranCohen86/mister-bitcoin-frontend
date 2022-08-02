import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

export const TransfersTable = ({ rows, title }) => {
  const loggedUser = useSelector((state) => state.userReducer.user);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h2">{title}</Typography>
      <Table aria-label="sticky table">
        <TableHead>
          <TableRow hover role="checkbox">
            <TableCell>Date</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              hover={true}
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                {new Date(row.createdAt).toLocaleDateString("en-Gb", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                {new Date(row.createdAt).toLocaleTimeString("en-Gb")}
              </TableCell>
              {row.to ? (
                <TableCell>{loggedUser.fullname}</TableCell>
              ) : (
                <TableCell>{row.from}</TableCell>
              )}
              {row.from ? (
                <TableCell>{loggedUser.fullname}</TableCell>
              ) : (
                <TableCell>{row.to}</TableCell>
              )}
              <TableCell className={row.from ? "amount-plus" : "amount-minus"}>
                {row.from ? `+${row.transferAmount}` : `-${row.transferAmount}`}
              </TableCell>
              {row.to ? (
                <TableCell>{row.fromBalance?.toFixed(2)}</TableCell>
              ) : (
                <TableCell>{row.toBalance?.toFixed(2)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
