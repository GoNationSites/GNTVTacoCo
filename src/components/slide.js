import React, { useState, useEffect } from "react"
import SideBySideView from "./SideBySideView"
import FullImageBG from "./fullImageBg"
import SectionShowcase from "./SectionShowcase"
import RecurringSlide from "./RecurringSlide.js"
import optimizeImage from "../helpers/cloudinaryOptimization"
import wood from "../images/wood.jpg"
import convertTime from "../helpers/convertTime"
import EventCountdown from "./eventCountdown"
import FullListView from "./fullListView"

// data: data object
// showcaseType: default or list
// slideStyleType: random, fullBG, Sidebyside -- Random by default

const Slide = ({ data, showcaseType, slideStyleType }) => {
  console.log("data:::", data)
  // console.log(
  //   "Data coming into slide: ",
  //   data,
  //   "showcaseType: ",
  //   showcaseType,
  //   "slideStyleType: ",
  //   slideStyleType
  // )
  const [displayedSlide, setDisplayedSlide] = useState()
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * Math.floor(2))
  )
  const getDataType = () => (showcaseType === "list" ? "list" : data.type)
  const handleListType = () => {}

  // generate random styles. Either full background or side by side view.
  const randomlyPickSlideStyle = () => {
    console.log("random is: ", randomNumber)
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
    console.log("type is: ", type)
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
    if (showcaseType === "list") {
      return <FullListView data={data} />
    } else {
      switch (displayedSlide) {
        case "fullImageBG":
          if (data.image === undefined) {
            console.log("ERROR!!", data, data.image)
          } else {
            console.log("good!!", data, data.image)
          }
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
              shoutedAt={data.shoutedAt ? data.shoutedAt : ""}
            />
          )
        case "sideBySideView":
          return (
            <SideBySideView
              type={data.type}
              title={data.name}
              description={data.description}
              price={data.price ? data.price : ""}
              image={optimizeImage(data.image, 200)}
              eventDays={data.days ? data.days : ""}
              textPositioning="right"
              isTypeCard={false}
              shoutedAt={data.shoutedAt ? data.shoutedAt : ""}
              eventType={data.eventType}
            />
          )
        case "sectionShowcase":
          console.log(
            "the reason were here is becase displayedSlide is: ",
            displayedSlide
          )
          console.log("and data is: ", data)
          return (
            <SectionShowcase
              items={data.items}
              sectionName={data.sectionName}
            />
          )
        // default:
        //   break
      }
    }
  }

  return (
    <React.Fragment>
      <div className="slide-overlay">{getSlideStyle()}</div>
    </React.Fragment>
  )
}

export default Slide
