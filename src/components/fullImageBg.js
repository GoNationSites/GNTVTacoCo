import React from "react"
import ContentBlock from "./contentBlock"
import optimizeImage from "../helpers/cloudinaryOptimization"
const FullImageBG = ({
  type,
  title,
  price,
  description,
  image,
  textPositioningId,
  isTypeCard,
  starts,
  ends,
  eventType,
  eventDays,
  shoutedAt,
}) => {
  const fullImageBackground = {
    background: `url(${optimizeImage(image, 100)}) center center / cover`,
    height: "100vh",
    width: "100%",
  }

  const getTextPositioning = () => {
    return textPositioningId === 0 ? "positioning-left" : "positioning-right"
  }

  return (
    <div
      className={`full-background-slide ${
        isTypeCard ? "card-type" : ""
      } ${getTextPositioning()}`}
      style={fullImageBackground}
    >
      <ContentBlock
        title={title}
        price={price ? price : ""}
        description={description}
        textPositioningId={Math.floor(Math.random() * Math.floor(2))}
        type={type}
        image={image}
        starts={starts}
        ends={ends}
        eventType={eventType}
        eventDays={eventDays}
        shoutedAt={shoutedAt}
      ></ContentBlock>
    </div>
  )
}

export default FullImageBG
