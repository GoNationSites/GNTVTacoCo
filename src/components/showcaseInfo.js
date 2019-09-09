import React from "react"

const ShowcaseInfo = ({ title, price, description, image }) => {
  return (
    <div className="showcase-info-block">
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{price}</p>
    </div>
  )
}

export default ShowcaseInfo
