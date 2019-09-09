import React from "react"

const FullImageBG = ({ title, price, description, image }) => {
  const background = {
    backgroundImage: `url(${image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100vh",
  }
  return (
    <div className="showcase-info-bg" style={background}>
      <div className="content-block">
        <h1>{title}</h1>
        <p>{description}</p>
        <p>{price}</p>
      </div>
    </div>
  )
}

export default FullImageBG
