import React from "react";
import { useSelector } from "react-redux";
import MaterialTable from "@material-table/core";
import tableIcons from "./tableaction";

const DetailScreen = () => {
  const DetailRead = useSelector((state) => state.DetailRead);
  const { Details } = DetailRead;
  const data = [];
  Details?.map((detail) =>
    data.push({
      email: detail.Email,
      name: detail.Name,
      mobileNo: detail.MobileNo,
    })
  );

  const columns = [
    { title: "Email", field: "email" },
    { title: "Name", field: "name" },
    { title: "MobileNo", field: "mobileNo", type: "numeric" },
  ];
  return (
    <MaterialTable
      style={{ width: "100%" }}
      icons={tableIcons}
      title="User Table"
      columns={columns}
      data={data}
      options={{
        actionsColumnIndex: -1,
        rowStyle: { backgroundColor: "#EEE" },
        headerStyle: {
          backgroundColor: "rgb(25 118 210)",
          color: "#FFF",
        },
      }}
    />
  );
};

export default DetailScreen;
