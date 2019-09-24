import React, { useState, useEffect } from "react"
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
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * Math.floor(2))
  )
  const getDataType = () => data.type
  const handleListType = () => {
    // console.log("handling list type")
  }

  // generate random styles. Either full background or side by side view.
  const randomlyPickSlideStyle = () => {
    if (randomNumber == 0) {
      setDisplayedSlide("sideBySideView")
    } else if (randomNumber == 1) {
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
        console.error("error: invalid data type")
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

  useEffect(() => {
    handleStyleType()
  }, [])

  const getSlideStyle = () => {
    switch (displayedSlide) {
      case "fullImageBG":
        return (
          <FullImageBG
            type={data.type}
            title={data.name}
            description={data.description}
            price={data.price ? data.price : ""}
            image={optimizeImage(data.image, 200)}
            eventDays={data.days ? data.days : ""}
            starts={data.starts}
            ends={data.ends}
            eventType={data.eventType}
            textPositioningId={Math.floor(Math.random() * Math.floor(2))}
            shoutedAt={data.shoutedAt}
          />
        )
      case "sideBySideView":
        return (
          <SideBySideView
            type={data.type}
            title={data.name}
            description={data.desc}
            price={data.price ? data.price : ""}
            image={optimizeImage(data.image, 200)}
            eventDays={data.days ? data.days : ""}
            textPositioning="right"
            isTypeCard={false}
          />
        )
      case "sectionShowcase":
        return (
          <SectionShowcase items={data.items} sectionName={data.sectionName} />
        )
    }
  }

  return (
    <React.Fragment>
      <div className="slide-overlay">{getSlideStyle()}</div>
    </React.Fragment>
  )
}

export default Slide
