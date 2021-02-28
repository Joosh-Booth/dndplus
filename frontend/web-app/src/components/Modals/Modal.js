import React from "react";
import CloseButton from '../CloseButton'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
  const top = 50 
  const left = 50 

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const useStyles = makeStyles((theme) => ({
  paper: (props) => ({
    position: "absolute",
    width: props.fullPage ? "100%" : 600,
    height: props.fullPage ? "100%" : null,
    maxHeight: `80%`,
    maxWidth: `calc(100% - ${10})`,
    padding: 20,
    boxSizing: "border-box",
    backgroundColor: "#FFF",
    borderRadius: props.fullPage ? 0 : 2,
    outline: 0,
    display:'auto'
  }),
}));

export default function MyModal({
  open=false, 
  body,
  onCloseHandler = () => null,
}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleClose = () => {
    onCloseHandler(false)
  };

  const modalStyledBody = (
    <div style={modalStyle} className={classes.paper}>      
      <div style={{display:'block'}}>
      {body}
      </div>
      
    </div>
  );

  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalStyledBody}
      </Modal>
    </div>
  );
}

