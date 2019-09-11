import React, { useState, useEffect, Component } from "react"
import Layout from "../components/layout"
import axios from "axios-jsonp"
import jsonAdapter from "axios-jsonp"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Slide from "../components/slide"
import { Carousel } from "react-responsive-carousel"
import slugify from "../helpers/slugify"

const IndexPage = () => {
  const [menuData, setMenuData] = useState({})
  const [eventData, setEventData] = useState({})
  const [recurringData, setRecurringEventData] = useState({})
  const gonationID = process.env.GONATIONID
  const [formattedMenu, setFormattedMenu] = useState([])
  const [formattedRecurringEvents, setFormattedRecurringEvents] = useState([])
  const [sectionData, setSectionData] = useState([])

  const [randomNumber, setRandomNumber] = useState(1)

  // Make request for menu data
  // todo account for > 1 powered lists / dynamic
  // ! we are only calling one powered list as of right now!!
  const requestMenuData = id => {
    axios({
      url: `https://data.prod.gonation.com/pl/get?profile_id=${id}`,
      adapter: jsonAdapter,
    }).then(res => {
      console.log(res.data[0])
      setMenuData(res.data[0])
    })
  }

  const requestEventData = id => {
    axios({
      url: `https://data.prod.gonation.com/profile/events?profile_id=${id}`,
      adapter: jsonAdapter,
    }).then(res => {
      setEventData(res)
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

  // Make requests when page loads
  useEffect(() => {
    requestMenuData(gonationID)
    requestEventData(gonationID)
    requestRecurringEventData(gonationID)
  }, [])

  const getPrices = () => {}

  const formattedMenuDataArr = []
  const buildSection = element => {
    element.inventory.forEach(item => {
      if (!item.section) {
        if (item.item.photo_id !== null) {
          formattedMenuDataArr.push({
            type: "item",
            name: item.item.name,
            desc: item.item.desc,
            sectionName: element.section.name,
            image: item.item.imageUrl,
            price: item.item.variants.length > 0 ? item.item.variants : "",
          })
        }
      } else {
        buildSection(item)
      }
    })
  }

  // This code creates an object of section objects. Used for the section showcase component
  // !This can and will most likely be moved to a different component
  // todo this is a very long function, break it up.
  const sortedSections = {}
  const buildSortedSectionData = data => {
    data.forEach(item => {
      const sluggedItem = slugify(item.sectionName)
      // if the key already exist, we just push the item inside the section
      if (sluggedItem in sortedSections) {
        sortedSections[`${sluggedItem}`].items.push({
          name: item.name,
          desc: item.desc,
          price: item.price,
          image: item.image,
        })
      }
      // else if not, we create the new key(section) and push the item with it
      else {
        sortedSections[`${sluggedItem}`] = {
          items: [
            {
              name: item.name,
              desc: item.desc,
              price: item.price,
              image: item.image,
            },
          ],
        }
      }
    })
    const sectionNames = Object.keys(sortedSections)
    sectionNames.forEach((element, idx) => {
      if (sortedSections[element].items.length >= 3) {
        sectionNames.splice(idx, 1)
      }
    })
    setSectionData(sortedSections)
  }

  // Helps format the menu
  const runMenu = () => {
    menuData.inventory.forEach(element => {
      buildSection(element)
    })
    buildSortedSectionData(formattedMenuDataArr)
    setFormattedMenu(formattedMenuDataArr)
  }

  // Formats the recurring event data
  const eventArr = []
  const formatRecurringData = () => {
    recurringData.forEach(event => {
      eventArr.push({
        type: "event",
        name: event.name,
        desc: event.description,
        image: event.imageurl,
        days: event.eventDays,
        tags: event.eventTags,
      })
    })
    setFormattedRecurringEvents(eventArr)
  }

  // This effect formats the data the way we need it for the slide component
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

  // todo concatinate the menu item data and the event data. Then figure out how to concatinate the section data
  // 1. Find where each state of data is living.
  // 2. run the concatinate function between the 2
  // 3. Keep in mind this is only happening if 'shuffle' is true, but for MVP we are just going to have shuffle as the only option
  const allData = formattedRecurringEvents.concat(formattedMenu)
  return (
    <Layout>
      <Carousel
        showThumbs={false}
        showArrows={true}
        showStatus={false}
        showIndicators={true}
        transitionTime={1000}
        autoPlay={false}
        interval={4000}
      >
        {allData.length > 1 && allData.map(item => <Slide data={item} />)}
      </Carousel>
    </Layout>
  )
}

export default IndexPage
