import {
    Stack,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

const TableHeader = ({ headers }) => {
    return (
        <TableHead>
            <TableRow>
                {headers.map((header) => (
                    <TableCell
                        align={header.align ?? ""}
                        key={header.id}
                        sx={{
                            width: header.custon_width,
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold" }}
                        >
                            {header.myFilter ? (
                                <Stack
                                    alignItems={"center"}
                                    direction={"row"}
                                    justifyContent={
                                        header.stackPosition ??
                                        "center"
                                    }
                                >
                                    <>{header.label}</>
                                    <>{header.myFilter}</>
                                </Stack>
                            ) : (
                                <>{header.label}</>
                            )}
                        </Typography>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default TableHeader;
