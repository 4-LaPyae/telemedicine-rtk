import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DoctorProfileCard from "./DoctorProfileCard";
import DoctorAppointmentTableItem from "./DoctorAppointmentTableItem";
import { useDispatch } from "react-redux";
import { doctorApi, coDoctorApi } from "../../feature/doctorApi";

const DoctorDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { data } = location.state;
  const [combineDoctor, setCombineDoctor] = useState("");
  useEffect(() => {
    if (data?.type === "INHOUSE") {
      console.log("inhouse");
      dispatch(
        doctorApi.endpoints.getDoctorDetail.initiate({ id: data?._id })
      ).then((res) => setCombineDoctor(res));
    } else {
      console.log("cooperate");
      dispatch(
        coDoctorApi.endpoints.getCoDoctorDetail.initiate({ id: data?._id })
      ).then((res) => setCombineDoctor(res));
    }
  }, []);

  // const combineDoctor = useMemo(() => {
  //   if (data.type === "INHOUSE") {
  //     return { doctors: inhouseDoctor, loading: inhouseLoading };
  //   } else {
  //     return { doctors: coDoctor, loading: coLoading };
  //   }
  // }, [inhouseDoctor, coDoctor]);
  // console.log(combineDoctor.loading, combineDoctor.doctors?.doctor);
  return (
    // <>Dr Detail</>
    <Stack
      direction={"row"}
      width={"100%"}
      spacing={5}
      justifyContent={"space-around"}
    >
      <Box width={"30%"}>
        <DoctorProfileCard doctor={combineDoctor?.data?.doctor} />
      </Box>
      <Box width={"70%"}>
        <DoctorAppointmentTableItem
          loading={combineDoctor?.isLoading}
          appointments={combineDoctor?.data?.appointments}
        />
      </Box>
    </Stack>
  );
};

export default DoctorDetail;
