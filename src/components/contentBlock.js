import React from "react"

const ContentBlock = ({
  title,
  price,
  description,
  textPositioningId,
  isTypeCard,
  type,
}) => {
  const renderPrices = () => price.map(price => <span>$ {price.price}</span>)

  const handleNoPrices = () => {
    console.log("inside handle no prices case, price is: ", price)
  }

  return (
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
}

export default ContentBlock
