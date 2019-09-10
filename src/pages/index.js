import React, { useState, useEffect, Component } from "react"
import Layout from "../components/layout"
import axios from "axios-jsonp"
import jsonAdapter from "axios-jsonp"
import ShowcaseInfo from "../components/showcaseInfo"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"
import FullImageBG from "../components/fullImageBg"
import SideBySideView from "../components/SideBySideView"

const IndexPage = () => {
  const [menuData, setMenuData] = useState({})
  const [eventData, setEventData] = useState({})
  const [recurringData, setRecurringEventData] = useState({})
  const gonationID = process.env.GONATIONID
  const [formattedMenu, setFormattedMenu] = useState([])
  const [formattedRecurringEvents, setFormattedRecurringEvents] = useState([])

  const [randomNumber, setRandomNumber] = useState(1)

  // Make request for menu data
  // todo account for > 1 powered lists / dynamic
  const requestMenuData = id => {
    axios({
      url: `https://data.prod.gonation.com/pl/get?profile_id=${id}`,
      adapter: jsonAdapter,
    }).then(res => {
      setMenuData(res.data[0])
      console.log("menu datares: ", res.data[0])
    })
  }

  const requestEventData = id => {
    axios({
      url: `https://data.prod.gonation.com/profile/events?profile_id=${id}`,
      adapter: jsonAdapter,
    }).then(res => {
      setEventData(res)
      console.log("regular event res: ", res)
    })
  }

  const requestRecurringEventData = id => {
    axios({
      url: `https://data.prod.gonation.com/profile/recurringevents?profile_id=${id}`,
      adapter: jsonAdapter,
    }).then(res => {
      setRecurringEventData(res.data.events)
    })
  }

  useEffect(() => {
    requestMenuData(gonationID)
    requestEventData(gonationID)
    requestRecurringEventData(gonationID)
  }, [])

  const someData = []

  const buildSection = element => {
    element.inventory.forEach(item => {
      if (!item.section) {
        if (item.item.photo_id !== null) {
          someData.push({
            type: "item",
            name: item.item.name,
            desc: item.item.desc,
            sectionName: element.section.name,
            image: item.item.imageUrl,
            price:
              item.item.variants.length > 0 ? item.item.variants[0].price : "",
          })
        }
      } else {
        buildSection(item)
      }
    })
  }

  const runMenu = () => {
    menuData.inventory.forEach(element => {
      buildSection(element)
    })
    setFormattedMenu(someData)
  }

  const eventArr = []
  const formatRecurringData = () => {
    console.log(recurringData)
    recurringData.forEach(event => {
      eventArr.push({
        type: "event",
        name: event.name,
        desc: event.description,
        image: event.imageUrl,
        days: event.eventDays,
        tags: event.eventTags,
      })
    })
    setFormattedRecurringEvents(eventArr)
  }

  useEffect(() => {
    if (menuData && menuData.section) {
      runMenu()
    }
    if (recurringData.length) {
      formatRecurringData()
    }
  }, [menuData, recurringData])

  const pickRandom = () => {
    setRandomNumber(Math.floor(Math.random() * 2) + 1)
  }

  return (
    <Layout>
      <Carousel
        showThumbs={false}
        showArrows={true}
        showStatus={false}
        showIndicators={true}
        transitionTime={1000}
        autoPlay={true}
        interval={4000}
      >
        {formattedMenu.length > 1 &&
          formattedMenu.map(
            item => (
              //   <ShowcaseInfo
              //     title={item.title}
              //     description={item.desc}
              //     price={item.price}
              //     image={item.image}
              //   />
              // ))}

              <FullImageBG
                key={item.name}
                title={item.name}
                description={item.desc}
                price={item.price}
                image={item.image}
                textPositioning="right"
              />
            )
            // <SideBySideView
            //   key={item.name}
            //   title={item.name}
            //   description={item.desc}
            //   price={item.price}
            //   image={item.image}
            //   textPositioning="left"
            //   isTypeCard
            // ></SideBySideView>
          )}
      </Carousel>
    </Layout>
  )
}

export default IndexPage
