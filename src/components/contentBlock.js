import React from "react"

const ContentBlock = ({
  title,
  price,
  description,
  textPositioning,
  isTypeCard,
}) => {
  const getTextPositioning = () => {
    return textPositioning === "right"
      ? "positioning-right"
      : "positioning-left"
  }
  return (
    <div
      className={`content-block ${getTextPositioning()} ${
        isTypeCard ? "content-block__card" : ""
      } `}
    >
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{price}</p>
    </div>
  )
}

export default ContentBlock
