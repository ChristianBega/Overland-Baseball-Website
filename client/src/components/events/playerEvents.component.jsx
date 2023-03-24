import { Stack, Table, TableCell, TableContainer, TableRow, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
// import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
export default function PlayerEvents({ currentInfo }) {
  const theme = useTheme();
  return (
    <>
      {currentInfo.map((info, index) => (
        <Box key={index}>
          <TableContainer sx={{ mb: 3, maxWidth : "90%", margin : "auto", border : `2px solid ${theme.palette.primary.main}` }}>
            <Table>
              <TableRow>
                <TableCell
                  sx={{
                    width: "30%",
                    textAlign: "center",
                    p: 4,
                    backgroundColor: theme.palette.accent.accentThree,
                  }}
                >
                  {info.date}
                </TableCell>
                <TableCell
                  sx={{
                    width: "40%",
                    textAlign: "center",
                    p: 4,
                    backgroundColor: theme.palette.accent.accentThree,
                  }}
                >
                  {info.location}
                </TableCell>
                <TableCell
                  sx={{
                    width: "30%",
                    textAlign: "center",
                    p: 4,

                    backgroundColor: theme.palette.accent.accentThree,
                    textDecoration: "underline",
                    fontWeight: "bold",
                  }}
                >
                  {info.time}
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
          <Stack direction="column" spacing={3} sx={{ height: "150px", p: 5, textAlign : "center" }}>
            <Typography typography="bodyTextSm">{info.content}</Typography>
            <Typography typography="bodyTextSm">{info.content2}</Typography>
          </Stack>

          {/* <Box sx={{ display: "flex", columnGap: 5 }}>
            <Box sx={{ width: "50%", height: "65px", backgroundColor: "blue" }}>Documents</Box>
            <Box sx={{ width: "50%", height: "65px", backgroundColor: "red" }}>Faqs</Box>
          </Box> */}
        </Box>
      ))}
    </>
  );
}
