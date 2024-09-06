// export default function formatDate(isoDate) {
//     const options = {
//          year: 'numeric',
//          month: 'long',
//         //  month: 'short',
//          day: 'numeric' 
//         };
//         const timeOptions = {
//             hour: '2-digit',
//             minute: '2-digit',
//             second: '2-digit'
//         };

//     const datePart = new Date(isoDate).toLocaleDateString('bg-BG', dateOptions);
//     const timePart = new Date(isoDate).toLocaleTimeString('bg-BG', timeOptions);

//     return ({datePart, timePart});
// }

function date(isoDate) {
    const options = {
        year: 'numeric',
        month: 'long',
        //  month: 'short',
        day: 'numeric'
    };

    const mydate = (new Date(isoDate).toLocaleDateString('bg-BG', options));
    let result = ""
    result += `${mydate.split(' ')[0]} `;
    result += `${mydate.split(' ')[1].slice(0, 3)} `;
    result += `${mydate.split(' ')[2]}`;
    
    return result
}


function dateTime(isoDate) {
    const timeOptions = {
        year: 'numeric',
        month: 'long',
        //  month: 'short',
        day: 'numeric'
    };

    return (new Date(isoDate).toLocaleTimeString('bg-BG', timeOptions));
}

const formatDateTime = {
    date,
    dateTime
}

export default formatDateTime;
