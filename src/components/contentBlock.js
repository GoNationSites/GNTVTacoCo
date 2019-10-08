import React, { useState } from "react"
import EventCountdown from "./eventCountdown"
import RecurringSlide from "./RecurringSlide"
import ShoutBlock from "./ShoutBlock"
import dayjs from "dayjs"

const ContentBlock = ({
  title,
  price,
  description,
  textPositioningId,
  isTypeCard,
  type,
  image,
  eventType,
  starts,
  ends,
  eventDays,
  shoutedAt,
  isSideBySide,
}) => {
  const [blockType, setBlockType] = useState("default")
  const renderPrices = () =>
    price.map((price, idx) => (
      <span key={`${price}-${idx}`}>$ {price.price}</span>
    ))

  const handleNoPrices = () => {
    // console.log("inside handle no prices case, price is: ", price)
  }

  const defaultContentBlock = () => (
    <div
      className={`content-block  ${isTypeCard ? "content-block__card " : ""} ${
        isSideBySide ? "column" : ""
      }`}
    >
      <h1>{title}</h1>
      <p className="content-description">{description}</p>
      <p>
        {type === "item" && price.length && Array.isArray(price)
          ? renderPrices()
          : handleNoPrices()}
      </p>
      <p className="shout-date">
        {shoutedAt !== ""
          ? dayjs(shoutedAt).format("dddd MMMM MM, hh:ss A")
          : ""}
      </p>
    </div>
  )

  const handleEventType = () => {
    if (eventType === "regular") {
      return (
        <EventCountdown
          title={title}
          description={description}
          image={image}
          starts={starts}
          ends={ends}
        />
      )
    }
    if (eventType === "recurring") {
      return (
        <RecurringSlide
          title={title}
          description={description}
          image={image}
          eventDays={eventDays}
          isSideBySide={isSideBySide}
          starts={starts}
          ends={ends}
        />
      )
    }
  }

  const RenderBlockType = () => {
    switch (type) {
      case "event":
        return handleEventType()
        break
      case "shout":
        return <ShoutBlock description={description} shoutedAt={shoutedAt} />
        break
      default:
        return defaultContentBlock()
        break
    }
  }

  return <React.Fragment>{RenderBlockType()}</React.Fragment>
}

export default ContentBlock
