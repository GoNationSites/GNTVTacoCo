import React from "react"
import ContentBlock from "./contentBlock"
const FullImageBG = ({
  type,
  title,
  price,
  description,
  image,
  textPositioning,
  isTypeCard,
}) => {
  return (
    <div className={`${isTypeCard ? "card-type" : ""}`}>
      <ContentBlock
        title={title}
        price={price ? price : ""}
        description={description}
        textPositioning={textPositioning}
        type={type}
      ></ContentBlock>
    </div>
  )
}

export default FullImageBG
