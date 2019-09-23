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

const Slide = ({ data, showcaseType, slideStyleType }) => {
  const [displayedSlide, setDisplayedSlide] = useState()
  const getDataType = () => data.type
  const handleListType = () => {
    console.log("handling list type")
  }

  // generate random styles. Either full background or side by side view.
  const randomlyPickSlideStyle = () => {
    const getRandomNumber = () => Math.floor(Math.random() * Math.floor(2))
    if (getRandomNumber === 0) {
      setDisplayedSlide("sideBySideView")
    } else if (getRandomNumber === 1) {
      setDisplayedSlide("fullImageBG")
    } else {
      setDisplayedSlide("fullImageBG")
    }
  }

  const handleSimpleData = () => {
    // event data can be showcased with a full background or side by side view. Events can either be of type recurring or regular. They are both similar except regular get a countdown and recurring does not.
    switch (slideStyleType) {
      case "random":
        randomlyPickSlideStyle()
        break
      case "fullImageBG":
        setDisplayedSlide("fullImageBG")
        break
      case "sideBySideView":
        setDisplayedSlide("sideBySideView")
        break
    }
  }

  // handle slides based on data type
  const handleDefaultType = () => {
    const type = getDataType()
    switch (type) {
      case "event":
        handleSimpleData("event")
        break
      case "item":
        handleSimpleData("item")
        break
      case "shout":
        handleSimpleData("shout")
        break
      case "section":
        setDisplayedSlide("sectionShowcase")
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
