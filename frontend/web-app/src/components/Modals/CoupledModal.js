import React, { useState } from "react";

export default function CoupledModal({
  element: Element,
  modalElement: Modal,
  modalOpenState,
  ...props
}) {
  const [open, setOpen] = useState(modalOpenState);
  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  return (
    <>
      {React.isValidElement(Element) &&
        React.cloneElement(Element, {
          onClick: handleOpen,
        })}

      {React.isValidElement(Modal) &&
        React.cloneElement(Modal, {
          open: open,
          onCloseHandler: handleClose,
          ...props,
        })}
    </>
  );
}
