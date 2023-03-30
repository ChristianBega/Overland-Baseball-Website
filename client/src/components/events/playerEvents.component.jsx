import { Stack, Typography } from "@mui/material";
// Table, TableCell, TableContainer, TableRow, useTheme;
import React from "react";
// import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
export default function PlayerEvents({ currentInfo }) {
  // const theme = useTheme();
  return (
    <>
      {currentInfo.map((info, index) => (
        <>
          {/* <TableContainer sx={{ mb: 3, maxWidth: "90%", margin: "auto" }}>
            <Table>
              <TableRow>
                <TableCell
                  sx={{
                    width: "25%",
                    textAlign: "center",
                    p: 2,
                    backgroundColor: theme.palette.accent.accentThree,
                  }}
                >
                  {info.date}
                </TableCell>
                <TableCell
                  sx={{
                    width: "50%",
                    textAlign: "center",
                    p: 2,
                    backgroundColor: theme.palette.accent.accentThree,
                  }}
                >
                  {info.location}
                </TableCell>
                <TableCell
                  sx={{
                    width: "25%",
                    textAlign: "center",
                    p: 2,

                    backgroundColor: theme.palette.accent.accentThree,
                    textDecoration: "underline",
                    fontWeight: "bold",
                  }}
                >
                  {info.time}
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer> */}
          <Stack direction="column" spacing={3} sx={{ minHeight: "150px", p: 5, textAlign: "center" }}>
            <Typography typography="bodyTextSm">{info.content}</Typography>
            <Typography typography="bodyTextSm">{info.content2}</Typography>
            <Typography typography="bodyTextSm">{info.content3}</Typography>
            {info.content4 ? <Typography component="small">{info.content4}</Typography> : null}
          </Stack>
        </>
      ))}
    </>
  );
}
