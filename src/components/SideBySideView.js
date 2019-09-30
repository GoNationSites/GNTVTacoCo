import React from "react"
import ContentBlock from "./contentBlock"
import wood from "../images/wood.jpg"

const SideBySideView = ({
  title,
  price,
  description,
  image,
  textPositioning,
  isTypeCard,
  shoutedAt,
  type,
  eventType,
  eventDays,
  starts,
  ends,
}) => {
  const background = {
    background: `url(${wood})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  }
  return (
    <div
      className={`side-by-side-container columns is-marginless ${
        Math.floor(Math.random() * Math.floor(2)) === 0 ? "is-last" : "is-first"
      }`}
      style={background}
    >
      <div className={`column is-one-fourth img-col  `}>
        <div className="img-wrapper">
          <img src={image}></img>
        </div>
      </div>

      <ContentBlock
        title={title}
        price={price}
        description={description}
        textPositioning={textPositioning}
        isTypeCard
        isSideBySide
        shoutedAt={shoutedAt}
        type={type}
        eventType={eventType}
        eventDays={eventDays}
        starts={starts}
        ends={ends}
      ></ContentBlock>
    </div>
  )
}

export default SideBySideView
