import { Stack, TableCell, TableRow, Tooltip } from "@mui/material";
import {
    ChangeDate,
    changeDateTime,
} from "../../../app/helper/changeDateandTimeFormat";
import InfoIcon from "@mui/icons-material/Info";
import { formatNumberWithCommas } from "../../../app/helper/withComma";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function AccountantTableItem({ item }) {
    // console.log(item);
    return (
        <TableRow>
            <TableCell>
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    gap={2}
                >
                    <Stack>
                        <span> {item.patient.name}</span>
                        <span>{item.patient.phone}</span>
                    </Stack>
                    <Tooltip
                        title={`Register at ${ChangeDate(
                            item.patient.createdAt
                        )}`}
                    >
                        <InfoIcon
                            color="primary"
                            sx={{ cursor: "pointer" }}
                        />
                    </Tooltip>
                </Stack>
            </TableCell>

            <TableCell>{item.package.name}</TableCell>
            <TableCell>
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    gap={3}
                >
                    <span
                        style={{ color: "blue", fontWeight: "bold" }}
                    >
                        {changeDateTime(item.subscribeDate).date}
                    </span>
                    <Tooltip
                        title={
                            changeDateTime(item.subscribeDate).time
                        }
                    >
                        <AccessTimeIcon sx={{ cursor: "pointer" }} />
                    </Tooltip>
                </Stack>
            </TableCell>
            <TableCell>
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    gap={3}
                >
                    <span
                        style={{ color: "red", fontWeight: "bold" }}
                    >
                        {changeDateTime(item.expireDate).date}
                    </span>
                    <Tooltip
                        title={changeDateTime(item.expireDate).time}
                    >
                        <AccessTimeIcon sx={{ cursor: "pointer" }} />
                    </Tooltip>
                </Stack>
            </TableCell>
            <TableCell>
                {item.promoCode === null ? "N/A" : item.promoCode}
            </TableCell>
            <TableCell>
                {formatNumberWithCommas(item.totalPrice)} MMK
            </TableCell>
        </TableRow>
    );
}
