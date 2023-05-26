import React from "react";
import "./Boolean.css";

const Boolean = (props) => {
  let containerBgColor = ["Boolean"];
  let handleBgColor = ["handle"];
  if (props.value) {
    containerBgColor.push("righthandlebgcolor");
    handleBgColor.push("right");
  } else {
    containerBgColor.push("lefthandlebgcolor");
    handleBgColor.push("left");
  }

  return (
    <label id={props.id} className={containerBgColor.join(" ")}>
      <div className={handleBgColor.join(" ")}>
        <input
          id={props.id}
          type={"checkbox"}
          checked={props.value ? true : false}
          onChange={props.onChange}
        />
      </div>
    </label>
  );
};

export default Boolean;
