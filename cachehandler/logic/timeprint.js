const getTimeString = () => {
    const d = new Date();
    return `${dateString(d)} ${timeString(d)}`
}

const dateString = (d) => {
    const date = [
        d.getDate(),
        d.getDay(),
        d.getFullYear()
    ]
    return date.map(n => {
        return n.toString().padStart(2, '0')
    }).join('.')
}

const timeString = (d) => {
    const time = [
        d.getHours(),
        d.getMinutes(),
        d.getSeconds()
    ]
    return time.map(n => {
        return n.toString().padStart(2, '0')
    }).join(':');
}

module.exports = getTimeString;