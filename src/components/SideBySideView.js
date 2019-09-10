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
}) => {
  const background = {
    background: `url(${wood})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  }
  return (
    <div className={`side-by-side-container`} style={background}>
      <div className="img-wrapper">
        <img src={image}></img>
      </div>

      <ContentBlock
        title={title}
        price={price}
        description={description}
        textPositioning={textPositioning}
        isTypeCard
      ></ContentBlock>
    </div>
  )
}

export default SideBySideView
