import React, { useState } from "react"
import Checkbox from "./checkBox"

const ActiveTypesForm = ({ addDataTypes, removeDataTypes }) => {
  return (
    <div className="control flex-down">
      <h4>Content Displayed</h4>
      <Checkbox
        addDataTypes={addDataTypes}
        removeDataTypes={removeDataTypes}
        name={"contentType"}
        value={"item"}
      />
      <Checkbox
        addDataTypes={addDataTypes}
        removeDataTypes={removeDataTypes}
        name={"contentType"}
        value={"event"}
      />
      <Checkbox
        addDataTypes={addDataTypes}
        removeDataTypes={removeDataTypes}
        name={"contentType"}
        value={"shout"}
      />
    </div>
  )
}

export default ActiveTypesForm
