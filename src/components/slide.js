import React, { useState } from "react"
import SideBySideView from "./SideBySideView"
import FullImageBG from "./fullImageBg"
import SectionShowcase from "./SectionShowcase"
import RecurringSlide from "./RecurringSlide.js"
import optimizeImage from "../helpers/cloudinaryOptimization"
import wood from "../images/wood.jpg"
import convertTime from "../helpers/convertTime"
import EventCountdown from "./eventCountdown"

// <FullImageBG
//         key={data.name}
//         title={data.name}
//         description={data.desc}
//         price={data.price}
//         image={data.image}
//         textPositioning="right"
//       />

// <SectionShowcase data={data} />
const Slide = ({ data, sectionData }) => {
  console.log("DATA IN SIDE: ", data, data.type === "section")
  const [isEvent, setisEvent] = useState(data.type === "event" ? true : false)
  const [isSection, setIsSection] = useState(data.type === "section")

  const getBackgroundImage = () => {
    if (data.type === "section") {
      return wood
    } else {
      return optimizeImage(data.image, 100)
    }
  }

  const background = {
    backgroundImage: `${
      isEvent ? "linear-gradient( rgba(0,0,0,0.5), rgba(0, 0, 0, 0.5) )," : ""
    } url(${getBackgroundImage()})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  }

  const renderSectionShowcase = () => {
    console.log("function:", data.items)
    return data.items.length >= 4 ? (
      <SectionShowcase sectionName={data.name} items={data.items} />
    ) : null
  }

  const getEventSlides = () => {
    if (data.eventType === "regular") {
      return (
        <EventCountdown
          title={data.name}
          description={data.desc}
          image={optimizeImage(data.image, 200)}
          starts={data.starts}
          ends={data.ends}
        />
      )
    } else {
      return (
        <RecurringSlide
          title={data.name}
          description={data.desc}
          image={optimizeImage(data.image, 200)}
          eventDays={data.days}
        />
      )
    }
  }

  return (
    <React.Fragment>
      {isSection ? (
        renderSectionShowcase()
      ) : (
        <div
          className={`${isEvent ? "countdown-overlay" : "slide-overlay "}`}
          style={background}
        >
          {data.type !== "event" ? (
            <FullImageBG
              type={data.type}
              title={data.name}
              description={data.desc}
              price={data.price}
              image={optimizeImage(data.image, 200)}
              eventDays={data.days}
              textPositioning="right"
            />
          ) : (
            getEventSlides()
          )}
        </div>
      )}
    </React.Fragment>
  )
}

export default Slide
