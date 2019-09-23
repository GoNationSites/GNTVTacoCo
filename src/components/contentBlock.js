import React, { useState } from "react"
import EventCountdown from "./eventCountdown"
import RecurringSlide from "./RecurringSlide"
import ShoutBlock from "./ShoutBlock"

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
}) => {
  const [blockType, setBlockType] = useState("default")
  const renderPrices = () => price.map(price => <span>$ {price.price}</span>)

  const handleNoPrices = () => {
    console.log("inside handle no prices case, price is: ", price)
  }

  const defaultContentBlock = () => (
    <div
      className={`content-block  ${isTypeCard ? "content-block__card" : ""} `}
    >
      <h1>{title}</h1>
      <p>{description}</p>
      <p>
        {type === "item" && price.length && Array.isArray(price)
          ? renderPrices()
          : handleNoPrices()}
      </p>
    </div>
  )

  const handleEventType = () => {
    console.log("eventType in handle is: ", eventType)
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
        console.log("%%%%%%%%%", description)
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
