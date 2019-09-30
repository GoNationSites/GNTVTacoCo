import React, { useState, useEffect } from "react"

const CheckBox = ({ name, value, handleAdd, handleRemoval }) => {
  const [isChecked, setIsChecked] = useState(true)

  const handleOnChange = () => {
    setIsChecked(!isChecked)
  }

  useEffect(() => {
    if (isChecked) {
      handleAdd(value)
    }
    if (!isChecked) {
      handleRemoval(value)
    }
  }, [isChecked])
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={isChecked}
        onChange={() => handleOnChange()}
      />
      {value}
    </label>
  )
}

export default CheckBox
