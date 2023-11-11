import { Outlet } from "react-router-dom";
import classes from "./RootLayout.module.css";

const RootLayoutPage = () => {
  return (
    <>
      <div className={classes.rootPage}>
        <Outlet />
      </div>

    </>
  );
};

export default RootLayoutPage;
