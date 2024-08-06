const today = new Date();
const span = document.getElementById('greet')
const p = document.createElement('p')

function greet() {
    const curHr = today.getHours()
    let timeOftheDay;

    if (curHr < 12) {
        timeOftheDay = ('good morning')
    } else if (curHr < 18) {
        timeOftheDay = ('good afternoon')
    } else {
        timeOftheDay = ('good evening')
    }
    p.classList.add('greet__style')
    p.textContent = timeOftheDay;

    span.append(p)
    // return timeOftheDay;
}

greet();

// setTimeout(() => {
//     span.remove(p);
// }, 4000);
  


function dateBgFormat() {
    const month = today.getUTCMonth() + 1; //months from 1-12
    const day = today.getUTCDate();
    const year = today.getUTCFullYear();

    const newdate = day + "/" + month + "/" + year;
    return newdate
}

module.exports = {
    greet,
    dateBgFormat
};