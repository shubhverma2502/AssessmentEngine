import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useLocation, useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import { useState } from "react";
import { Home } from "@mui/icons-material";

export default function BasicBreadcrumbs(props) {

  const { title, path } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const paths = location.pathname.split("/").filter((x) => x);

  const [breadcrumbNameMap, setBreadcrumbNameMap] = useState(() => {
    const storedBreadcrumbNameMap = localStorage.getItem("breadcrumbName");
    return storedBreadcrumbNameMap ? JSON.parse(storedBreadcrumbNameMap) : {};
  });

  React.useEffect(() => {
    if (path && title) {
      setBreadcrumbNameMap((prevBreadcrumbNameMap) => ({
        ...prevBreadcrumbNameMap,
        [path]: title,
      }));
    }
  }, [path, title]);

  React.useEffect(() => {
    localStorage.setItem("breadcrumbName", JSON.stringify(breadcrumbNameMap));
  }, [breadcrumbNameMap]);

  return (
    <Breadcrumbs aria-label="breadcrumb" separator={"›"}>
      {Array.isArray(paths) &&
        paths.map((name, index) => {
          const path = `/${paths.slice(0, index + 1).join("/")}`;
          const route = breadcrumbNameMap[path];
          const customName = index === 0 ? "Home" : "";
          if (!route && index > 0) {
            return null;
          }
          return (
            <Chip
              size="small"
              label={route ? route : customName}
              key={name}
              sx={{ backgroundColor: "#428c98 !important" }}
              onClick={() =>
                navigate(path, {
                  state: { examType: "ALL" },
                })
              }
              icon={customName === "Home" ? <Home color="red" /> : <></>}
            ></Chip>
          );
        })}
    </Breadcrumbs>
  );
}