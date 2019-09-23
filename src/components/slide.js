import React, { useState } from "react"
import SideBySideView from "./SideBySideView"
import FullImageBG from "./fullImageBg"
import SectionShowcase from "./SectionShowcase"
import RecurringSlide from "./RecurringSlide.js"
import optimizeImage from "../helpers/cloudinaryOptimization"
import wood from "../images/wood.jpg"
import convertTime from "../helpers/convertTime"
import EventCountdown from "./eventCountdown"

// data: data object
// showcaseType: default or list
// slideStyleType: random, fullBG, Sidebyside -- Random by default

const Slide = ({ data, sectionData, showcaseType, slideStyleType }) => {
  const getDataType = () => data.type
  const handleListType = () => {
    console.log("handling list type")
  }

  const handleEventData = () => {}

  // handle slides based on data type
  const handleDefaultType = () => {
    const type = getDataType()
    switch (type) {
      case "event":
        handleEventData()
        break
      case "item":
        handleItemData()
        break
      case "shout":
        handleShoutData()
        break
      case "section":
        handleSectionData()
        break
      default:
        console.log("error: invalid data type")
        break
    }
  }

  // check if showcaseType is list, section, or default
  const handleStyleType = () => {
    switch (showcaseType) {
      case "list":
        handleListType()
        break
      default:
        handleDefaultType()
    }
  }

  return (
    <React.Fragment>
      <div className="slide-overlay"></div>
    </React.Fragment>
  )
}

export default Slide
