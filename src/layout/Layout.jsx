import { Typography } from "@mui/material";
import React from "react";

const Layout = ({ children, title = "" }) => {
  return (
    <div>
      {title && (
        <Typography fontSize="22px" padding="10px 0" fontWeight="600">
          {title}
        </Typography>
      )}

      {children}
    </div>
  );
};

export default Layout;
