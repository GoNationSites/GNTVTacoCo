import React, { useState, useEffect, Component } from "react"
import Layout from "../components/layout"
import axios from "axios-jsonp"
import jsonAdapter from "axios-jsonp"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Slide from "../components/slide"
import { Carousel } from "react-responsive-carousel"
import slugify from "../helpers/slugify"
import shuffleArray from "../helpers/shuffleArray"
import PoweredToolsSlide from "../components/poweredToolsSlide"

const IndexPage = () => {
  const [menuData, setMenuData] = useState({})
  const [eventData, setEventData] = useState({})
  const [recurringData, setRecurringEventData] = useState({})
  const gonationID = process.env.GONATIONID
  const [formattedMenu, setFormattedMenu] = useState([])
  const [formattedRecurringEvents, setFormattedRecurringEvents] = useState([])

  const [sectionData, setSectionData] = useState([])
  const [shoutData, setShoutData] = useState({})
  const [formattedShoutData, setFormattedShoutData] = useState([])

  const [randomNumber, setRandomNumber] = useState(1)
  const [slideData, setSlideData] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  const [formattedEventData, setFormattedEventData] = useState([])

  // !This is temporary: will be used in the form / transfered to state

  // form state
  const [isListView, setIsListView] = useState(false)

  const imgOnly = isListView ? false : true

  const [slideDuration, setSlideDuration] = useState(15000)
  const [activeTypes, setActiveTypes] = useState([
    "item",
    "event",
    "section",
    "shout",
  ])

  // end form state

  // Make request for menu data
  // todo account for > 1 powered lists / dynamic
  // ! we are only calling one powered list as of right now!!
  const requestMenuData = id => {
    axios({
      url: `https://data.prod.gonation.com/pl/get?profile_id=${id}`,
      adapter: jsonAdapter,
    }).then(res => {
      setMenuData(res.data)
    })
  }

  const requestEventData = id => {
    axios({
      url: `https://data.prod.gonation.com/profile/events?profile_id=${id}`,
      adapter: jsonAdapter,
    }).then(res => {
      setEventData(res.data.events)
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

  const fetchShoutData = id => {
    axios({
      url: `https://data.prod.gonation.com/profile/shoutsnew/${id}`,
      adapter: jsonAdapter,
    }).then(res => {
      setShoutData(res.data)
    })
  }

  // Make requests when page loads
  useEffect(() => {
    requestMenuData(gonationID)
    requestEventData(gonationID)
    requestRecurringEventData(gonationID)
    fetchShoutData(gonationID)
  }, [])

  // todo render ALL prices
  const getPrices = () => {}

  const formattedMenuDataArr = []
  const buildSection = element => {
    if (element.inventory) {
      element.inventory.forEach(item => {
        if (!item.section) {
          if (item.item.photo_id !== null || !imgOnly) {
            formattedMenuDataArr.push({
              type: "item",
              name: item.item.name,
              description: item.item.desc,
              sectionName: element.section.name,
              image: item.item.imageUrl,
              price: item.item.variants.length > 0 ? item.item.variants : "",
            })
          }
        } else {
          buildSection(item)
        }
      })
    } else {
      if (element.item.photo_id !== null || !imgOnly) {
        formattedMenuDataArr.push({
          type: "item",
          name: element.item.name,
          description: element.item.desc,
          sectionName: element.section ? element.section.name : "",
          image: element.item.imageUrl,
          price: element.item.variants.length > 0 ? element.item.variants : "",
        })
      }
    }
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
              description: item.desc,
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
              description: item.desc,
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
                description: item.desc,
                price: item.variants,
                image: item.image,
              },
            ],
          })
        }
      }
    })
    const limitedResults = sortedSections.filter(
      section => section.items.length >= 4
    )
    setSectionData(sortedSections)
  }

  // Helps format the menu
  const runMenu = () => {
    //Theres only 1 powered list id here unlike beef barl
    menuData.forEach(poweredList => {
      // console.log("poweredList: ", poweredList)
      poweredList.inventory.forEach(element => {
        // console.log("element in run menu: ", element)
        buildSection(element)
      })
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
        eventType: "recurring",
        name: event.name,
        description: event.description,
        image: event.imageurl,
        days: event.eventDays,
        tags: event.eventTags,
      })
    })
    setFormattedRecurringEvents(eventArr)
  }

  const formatEventData = () => {
    const formattedEvents = []
    eventData.forEach(event => {
      formattedEvents.push({
        type: "event",
        eventType: "regular",
        name: event.name,
        description: event.description,
        image: event.imageurl,
        tags: event.eventTags,
        starts: event.starts,
        ends: event.ends,
      })
    })
    setFormattedEventData(formattedEvents)
  }

  const formatShoutData = () => {
    const formattedShout = []
    formattedShout.push({
      type: "shout",
      description: shoutData.shout.text,
      name: "Recent Shout",
      shoutedAt: shoutData.shout.updatedAt,
      image: `${shoutData.imageBaseUrl}/${shoutData.shout.image.image.cloudinaryId}`,
    })
    setFormattedShoutData(formattedShout)
  }

  // This effect formats the data the way we need it for the slide component

  // const allData = sectionData

  // console.log(formattedMenu)
  // const mapped = formattedMenu.map(function(el, i) {
  //   return { index: i, value: el.sectionName.toLowerCase() }
  // })
  const sortFormattedMenu = () =>
    formattedMenu.sort((a, b) => {
      if (a.sectionName > b.sectionName) {
        return 1
      }
      if (a.sectionName < b.sectionName) {
        return -1
      }
      return 0
    })

  // handles pagination of list view.
  const paginatedItems = (perPage, items) => {
    const paginatedItemsArr = []
    let tmpArr = []
    items.forEach((itm, idx) => {
      if ((idx + 1) % perPage === 0) {
        tmpArr.push(itm)
        paginatedItemsArr.push(tmpArr)
        tmpArr = []
      } else {
        tmpArr.push(itm)
      }
      if (tmpArr.length && idx === items.length - 1) {
        paginatedItemsArr.push(tmpArr)
      }
    })
    return paginatedItemsArr
  }

  useEffect(() => {
    if (
      (activeTypes.includes("item") || activeTypes.includes("section")) &&
      menuData.length
    ) {
      runMenu()
    }
    if (activeTypes.includes("event") && recurringData.length) {
      formatRecurringData()
    }
    if (activeTypes.includes("event") && eventData.length) {
      formatEventData()
    }
    if (shoutData.hasOwnProperty("shout") && activeTypes.includes("shout")) {
      formatShoutData()
    }
  }, [menuData, recurringData, eventData, shoutData, isListView])

  useEffect(() => {
    if (menuData.length && recurringData.length && eventData && shoutData) {
      setIsLoading(false)
    }
    if (!isLoading) {
      if (!isListView) {
        setSlideData(
          shuffleArray(
            formattedMenu

              // .concat(sectionData)
              .concat(formattedEventData)
              .concat(formattedShoutData)
              .concat(formattedRecurringEvents)
          )
        )
      }
    }
  }, [isLoading, menuData, recurringData, shoutData, isListView])

  // console.log("PAGINATED ITEMS ARE: ", paginatedItems(8, formattedMenu))

  console.log("formattedMenu: ", formattedMenu, "slideData: ", slideData)

  return (
    <Layout>
      <PoweredToolsSlide
        duration={slideDuration}
        setSlideDuration={setSlideDuration}
        activeTypes={activeTypes}
        setActiveTypes={setActiveTypes}
        listData={sectionData}
        isListView={isListView}
        setIsListView={setIsListView}
      />
      <Carousel
        showThumbs={false}
        useKeyboardArrows={true}
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        transitionTime={1000}
        autoPlay={true}
        interval={slideDuration}
      >
        {!isLoading && isListView && sortFormattedMenu().length
          ? paginatedItems(12, sortFormattedMenu()).map((pile, idx) => (
              <Slide
                key={`${pile}-${idx}`}
                slideStyleType={"sideBySideView"}
                showcaseType="list"
                data={pile}
              />
            ))
          : !isLoading &&
            slideData.length > 0 &&
            slideData
              .filter(
                item =>
                  item.image !==
                  "https://res.cloudinary.com/gonation/gonation.data.prod/default/img-itm-cover-full.png"
              )
              .map((item, idx) => {
                console.log("item: ", item, idx)
                return (
                  <Slide
                    key={`${item}-${idx}`}
                    slideStyleType={"random"}
                    // showcaseType={"default"}
                    data={item}
                  />
                )
              })}
      </Carousel>
    </Layout>
  )
}

export default IndexPage
