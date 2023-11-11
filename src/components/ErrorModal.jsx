import { Card } from "@material-ui/core";
import { useState } from "react";
import ReactDOM from "react-dom";
import classes from "./ErrorModal.module.css";
import Button from "./ui/Button";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  const [text, setText] = useState("Add to Favourite");
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message[0]}</p>
        <p>{props.message[1]}</p>
      </div>
      <footer className={classes.actions}>
        <Button onClick={props.onConfirm} width="100%">
          Close
        </Button>
        {props.isPlayerData && (
          <Button
            onClick={() => {
              setText("Added");
              props.onClickFavourite(props.playerId);
            }}
            width="100%"
            disabled={props.isPlayerFavourite || text === 'Added'}
          >
            {props.isPlayerFavourite ? "Added" : text}
          </Button>
        )}
      </footer>
    </Card>
  );
};

const ErrorModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onConfirm={props.onConfirm}
          title={props.title}
          message={props.message}
          isPlayerData={props.isPlayerData}
          onClickFavourite={props.onClickFavourite}
          playerId={props.playerId}
          isPlayerFavourite={props.isPlayerFavourite}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default ErrorModal;
