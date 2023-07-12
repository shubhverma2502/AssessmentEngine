import { CircularProgress } from "@mui/material";

import * as React from "react";

export default function CircularStatic(props) {
  const { perc, size ,result, color} = props;

  let percentage = perc;

  let val = percentage % 10;

  const [progress, setProgress] = React.useState(val);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= percentage ? prevProgress : prevProgress + 10
      );
    }, 90);

    return () => {
      clearInterval(timer);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <CircularProgress
      color={color ? color : (result === "PASSED"? "success" : "error")}
      variant="determinate"
      value={progress}
      size={size}
    />
  );
}
