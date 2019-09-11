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
  const background = {
    backgroundImage: `url(${image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100vh",
  }

  return (
    <div
      className={`showcase-info-bg ${isTypeCard ? "card-type" : ""}`}
      style={background}
    >
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
