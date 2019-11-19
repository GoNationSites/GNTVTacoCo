import React from "react"
import ContentBlock from "./contentBlock"
import optimizeImage from "../helpers/cloudinaryOptimization"
import woodBg from "../images/wood.jpg"
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
  const defaultImg = 'https://res.cloudinary.com/gonation/w_2000,c_fill,c_scale,fl_lossy,f_auto,q_auto/gonation.data.prod/default/img-bzn-avatar-full.png'
  const backgroundImage = image === defaultImg ? woodBg : image
  const fullImageBackground = {
    background: `url(${backgroundImage}) center center / cover`,
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
        } ${getTextPositioning()} ${type === "event" ? "darken-overlay" : ""}`}
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
