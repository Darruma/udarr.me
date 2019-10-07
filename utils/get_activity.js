const htmlparser = require('node-html-parser').parse
const fs = require('fs');
const path = require('path')
const activity_html_string = fs.readFileSync(path.join(__dirname, "..", "routes", "activity.html"), "utf8")
const root = htmlparser(activity_html_string)
const activity_html_array = root.querySelector(".calendar-column").childNodes.slice(4).filter(element => {
    return element.nodeType == 1
})
const activity = activity_html_array.map(element => {
    element.childNodes = element.childNodes.filter(element => element.nodeType == 1)
    const day_info = element.childNodes.reduce((acc, current) => {
        const info = current.childNodes[0].rawText;
        switch (current.classNames[0]) {
            case 'calendar-card__date':
                acc.date = info
                break;
            case "calendar-card__entry-time":
                acc.entry_time = info
                break;
            case "calendar-card__gym":
                acc.gym = info
                break;
            case "calendar-card__class":
                acc.time = info
                break;
            case "calendar-card__duration":
                acc.duration = info
                break;
        }
        return acc
    }, {})
    return day_info
})
console.log(activity)
