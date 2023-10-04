import { TableCell, TableRow } from "@mui/material";
import React from "react";

const TableEmptyRow = ({ emptyRows, colSpan, hval = 88.484 }) => {
    return (
        emptyRows > 0 && (
            <TableRow
                style={{
                    height: hval * emptyRows,
                }}
            >
                <TableCell colSpan={colSpan}></TableCell>
            </TableRow>
        )
    );
};

export default TableEmptyRow;

// {emptyRows > 0 && (
//     <TableRow
//         style={{
//             height: 53.3 * emptyRows,
//         }}
//     >
//         <TableCell colSpan={8} />
//     </TableRow>
// )}
