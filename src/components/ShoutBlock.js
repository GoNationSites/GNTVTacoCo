import React from "react"
import dayjs from "dayjs"

const ShoutBlock = ({ description, shoutedAt }) => {
  return (
    <div className="content-block shout-block">
      <h1>Recent Shout</h1>
      <p className="shout-time">
        Shouted On: {dayjs(shoutedAt).format("dddd MMMM MM, H:mm A")}
      </p>
      <p className="shout-desc">{description}</p>
    </div>
  )
}

export default ShoutBlock
