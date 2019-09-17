import React, { useState, useEffect, Component } from "react"
import Layout from "../components/layout"
import axios from "axios-jsonp"
import jsonAdapter from "axios-jsonp"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Slide from "../components/slide"
import { Carousel } from "react-responsive-carousel"
import slugify from "../helpers/slugify"
import shuffleArray from "../helpers/shuffleArray"

const IndexPage = () => {
  const [menuData, setMenuData] = useState({})
  const [eventData, setEventData] = useState({})
  const [recurringData, setRecurringEventData] = useState({})
  const gonationID = process.env.GONATIONID
  const [formattedMenu, setFormattedMenu] = useState([])
  const [formattedRecurringEvents, setFormattedRecurringEvents] = useState([])

  const [sectionData, setSectionData] = useState([])

  const [randomNumber, setRandomNumber] = useState(1)
  const [slideData, setSlideData] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  // Make request for menu data
  // todo account for > 1 powered lists / dynamic
  // ! we are only calling one powered list as of right now!!
  const requestMenuData = id => {
    axios({
      url: `https://data.prod.gonation.com/pl/get?profile_id=${id}`,
      adapter: jsonAdapter,
    }).then(res => {
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
  const sortedSections = []

  const buildSortedSectionData = data => {
    data.forEach((item, itmID) => {
      let sectionExists = true
      // For the first time through, we automatically populate the array
      if (sortedSections.length === 0) {
        sortedSections.push({
          type: "section",
          name: item.sectionName,
          items: [
            {
              name: item.name,
              desc: item.desc,
              price: item.variants,
              image: item.image,
            },
          ],
        })
      } else {
        sortedSections.forEach((section, secID) => {
          if (slugify(item.sectionName) === slugify(section.name)) {
            sectionExists = true
            section.items.push({
              name: item.name,
              desc: item.desc,
              price: item.variants,
              image: item.image,
            })
          } else {
            sectionExists = false
          }
        })
        if (!sectionExists) {
          sortedSections.push({
            type: "section",
            name: item.sectionName,
            items: [
              {
                name: item.name,
                desc: item.desc,
                price: item.variants,
                image: item.image,
              },
            ],
          })
        }
      }
    })

    console.log(sortedSections)
    const limitedResults = sortedSections.filter(
      section => section.items.length >= 4
    )
    console.log(limitedResults)

    setSectionData(limitedResults)
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

  useEffect(() => {
    if (menuData && menuData.section && recurringData.length) {
      setIsLoading(false)
    }
    if (!isLoading) {
      setSlideData(
        shuffleArray(
          formattedRecurringEvents.concat(formattedMenu).concat(sectionData)
        )
      )
    }
  }, [isLoading, menuData, recurringData])

  const pickRandom = () => {
    setRandomNumber(Math.floor(Math.random() * 2) + 1)
  }

  // const allData = sectionData

  console.log("all data is now: ", slideData)

  return (
    <Layout>
      <Carousel
        showThumbs={false}
        showArrows={true}
        showStatus={true}
        showIndicators={false}
        transitionTime={1000}
        autoPlay={true}
        interval={000}
      >
        {!isLoading &&
          slideData.length > 1 &&
          slideData.map(item => <Slide data={item} />)}
      </Carousel>
    </Layout>
  )
}

export default IndexPage
