
function convertTimeHelper(unixTime) {
    const d = new Date(unixTime)
    const day = d.getDate()  
    const mon = d.getMonth() + 1
    const yr = d.getFullYear()
    const hr = d.getHours()
    const min = d.getMinutes()

    const formattedHr = hr > 12 ? hr - 12 : hr
    const formattedMin = min < 10 ? "0" + min : min

    return `${mon}/${day}/${yr}, ${formattedHr}:${formattedMin} ${hr > 12 ? "PM" : "AM"}`
}

export default convertTimeHelper