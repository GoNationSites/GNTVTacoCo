/* eslint-disable no-restricted-globals */
export default (imgUrl, width) => {
  console.log("imgUrl: ", imgUrl)
  const convertedUrl = imgUrl.split("/gonation")
  convertedUrl.splice(1, 1)
  const params = `/gonation/w_${width},c_fill,c_scale,fl_lossy,f_auto,q_auto`
  convertedUrl.splice(1, 0, params)
  convertedUrl.splice(2, 0, "/gonation")
  return convertedUrl.join("")
}
