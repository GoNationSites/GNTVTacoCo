import React, { useState } from "react"

const EventRadio = props => {
  const handleRadioChange = event => {
    props.setSingleEventItem(event)
  }
  return (
    <label key={props.event.name} className="checkbox">
      <input
        type="radio"
        name="contentType"
        onChange={() => handleRadioChange(props.event.name)}
        // we have an array of items that are NOT going to be displayed. We compare The current section with that array. If it is there then we return false. Else we return true.
      />
      {props.event.name}
    </label>
  )
}

export default EventRadio
