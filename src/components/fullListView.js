import React from "react"
import wood from "../images/wood.jpg"
import logo from "../images/logo.png"
const FullListView = props => {
  const defImg =
    "https://res.cloudinary.com/gonation/gonation.data.prod/default/img-itm-cover-full.png"
  const background = {
    background: `url(${wood})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  }
  return (
    <div className="list-view-wrap" style={background}>
      <div className="logo-background">
        <img src={logo}></img>
      </div>
      <div className="list-view-content-container">
        <div className="columns is-marginless is-multiline item-block-columns">
          {props.data.map((item, idx) => (
            <div
              key={`${item}-${idx}`}
              className="item-block column is-half columns"
            >
              <div className="column is-paddingless is-one-third">
                <img
                  className={`${
                    item.image !== defImg ? "custom-image" : "default-list-logo"
                  }`}
                  src={item.image !== defImg ? item.image : logo}
                ></img>
              </div>
              <div className="list-item-content">
                <h3>
                  <span className="list-item-section">{item.sectionName}</span>{" "}
                  <span className="list-item-name">{item.name}</span>
                </h3>
                <p className="list-item-description">{item.description}</p>
                <p className="list-item-price">
                  {item.price.length ? `$ ${item.price[0].price}` : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FullListView
