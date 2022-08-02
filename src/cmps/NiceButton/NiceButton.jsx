import React from "react";

export default function NiceButton({ onClick, Icon, children, className }) {
  return (
    <button className={className} onClick={onClick}>
      <Icon />
      {children}
    </button>
  );
}
