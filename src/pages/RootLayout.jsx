import { Outlet } from "react-router-dom";
import classes from "./RootLayout.module.css";
import WelcomePage from "./Welcome";

const RootLayoutPage = () => {
  return (
    <>
      <div className={classes.rootPage}>
        <WelcomePage />
        <Outlet />
      </div>
    </>
  );
};

export default RootLayoutPage;
