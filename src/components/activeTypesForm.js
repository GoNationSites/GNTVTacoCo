import React, { useState } from "react"
import Checkbox from "./checkBox"

const ActiveTypesForm = ({ handleAdd, handleRemoval }) => {
  return (
    <div className="column control flex-down">
      <h4>Content Displayed</h4>
      <Checkbox
        handleAdd={handleAdd}
        handleRemoval={handleRemoval}
        name={"contentType"}
        value={"item"}
      />
      <Checkbox
        handleAdd={handleAdd}
        handleRemoval={handleRemoval}
        name={"contentType"}
        value={"event"}
      />
      <Checkbox
        handleAdd={handleAdd}
        handleRemoval={handleRemoval}
        name={"contentType"}
        value={"shout"}
      />
    </div>
  )
}

export default ActiveTypesForm
