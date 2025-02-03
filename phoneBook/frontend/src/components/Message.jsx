import React from "react";

function Message({ message, errorMessage }) {
  if (message !== null) return <div className="ok">{message}</div>;
  if (errorMessage !== null) return <div className="error">{errorMessage}</div>;
  return null;
}

export default Message;
