import React from "react"
import SideBySideView from "./SideBySideView"
import FullImageBG from "./fullImageBg"
import SectionShowcase from "./SectionShowcase"

// <FullImageBG
//         key={data.name}
//         title={data.name}
//         description={data.desc}
//         price={data.price}
//         image={data.image}
//         textPositioning="right"
//       />

// <SectionShowcase data={data} />
const Slide = ({ data, sectionData }) => {
  console.log("Data recieved into slide component: ", data)
  return (
    <React.Fragment>
      <FullImageBG
        type={data.type}
        title={data.name}
        description={data.desc}
        price={data.price}
        image={data.image}
        textPositioning="right"
      />
    </React.Fragment>
  )
}

export default Slide
