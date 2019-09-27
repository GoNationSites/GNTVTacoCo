import React, { useState } from "react"

const SectionToggleCheckbox = ({
  section,
  idx,
  removeSectionFromTV,
  addSectionToTV,
}) => {
  const [isChecked, setIsChecked] = useState(true)

  const handleSectionToggle = section => {
    isChecked ? setIsChecked(false) : setIsChecked(true)
    // if the section is checked, it must be included, therefore we must make sure it's NOT in the set filter array. If the section is not checked, it must not be included, meaning we add it to the setFilterArray
    if (!isChecked) {
      removeSectionFromTV(section)
    } else {
      addSectionToTV(section)
    }
  }
  return (
    <label key={`${section}-${idx}`} className="checkbox">
      <input
        type="checkbox"
        name="contentType"
        onChange={() => handleSectionToggle(section)}
        // we have an array of items that are NOT going to be displayed. We compare The current section with that array. If it is there then we return false. Else we return true.
        checked={isChecked}
      />
      {section.name}
    </label>
  )
}

export default SectionToggleCheckbox
