import React, { useState } from "react";

export default function CoupledModal({
  element: Element,
  modalElement: Modal,
  modalOpenState=null,
  onClose=()=>null,
  ...props
}) {
  const [open, setOpen] = useState(modalOpenState||false);
  const handleOpen = () => {
    setOpen(true);
    Element.props.onClick&&Element.props.onClick();
  }
  const handleClose = () => {
    setOpen(false);
    onClose()
  }
  return (
    <div>
      {React.isValidElement(Element) &&
        React.cloneElement(Element, {
          onClick: handleOpen,
        })}

      {React.isValidElement(Modal) &&
        React.cloneElement(Modal, {
          open: modalOpenState!=null?modalOpenState:open,
          onCloseHandler: handleClose,
          ...props,
        })}
    </div>
  );
}
