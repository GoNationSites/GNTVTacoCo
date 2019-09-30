import React, { useState } from "react"

const CheckBox = ({ name, value, addDataTypes, removeDataTypes }) => {
  const [isChecked, setIsChecked] = useState(true)

  const handleOnChange = value => {
    isChecked ? setIsChecked(false) : setIsChecked(true)
    if (!isChecked) {
      console.log("should trigger remove", value)
      addDataTypes(value)
    } else {
      alert("ye")
      removeDataTypes(value)
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
