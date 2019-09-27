import React, { useState } from "react"

const CheckBox = ({ name, value, addDataTypes, removeDataTypes }) => {
  const [isChecked, setIsChecked] = useState(true)

  const handleOnChange = value => {
    isChecked ? setIsChecked(false) : setIsChecked(true)
    if (!isChecked) {
      removeDataTypes(value)
    } else {
      addDataTypes(value)
    }
  }
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={isChecked}
        onChange={() => handleOnChange(value)}
      />
      {value}
    </label>
  )
}

export default CheckBox
