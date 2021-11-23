const main = async () => {
    const currentLink = window.location.href
    if (currentLink.indexOf('https://www.youtube.com/watch?v=') !== -1) {
        console.log(currentLink)
        const vidID = currentLink.split('v=')[1].substring(0, 11)
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?key=AIzaSyCNXZquTUPTimrYNV-O9cWC6mPMn9MKEA8&id=${vidID}&part=statistics`)
        const data = await response.json()
        
       /*  google.youtube('v3').videos.list({
            key: 'AIzaSyCNXZquTUPTimrYNV-O9cWC6mPMn9MKEA8',
            id: vid_id,
            part: 'statistics'
        }) */
    
        console.log(data)
    
        const likes = String(data['items'][0]['statistics']['likeCount'])
        const dislikes = String(data['items'][0]['statistics']['dislikeCount'])
    
        console.log(`Likes: ${likes}`)
        console.log(`Dislikes: ${dislikes}`)

        const formattedDislikes = String(roundNumber(dislikes))
        
        //console.log(document.getElementsByTagName("yt-formatted-string"))
        document.getElementsByTagName("yt-formatted-string")[15].innerHTML = String(formattedDislikes)
    } 
}

const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const roundNumber = (number) => {
    let formattedNumber = ''
    number = parseInt(number)
    if (number <= 999) {
        formattedNumber = number
    } else if (number > 999 && number <= 999999) {
        number = numberWithCommas(number)
        formattedNumber = number.split(',')[0].concat('K')
    } else if (number > 999999 && number <= 999999999) {
        number = numberWithCommas(number)
        formattedNumber = number.split(',')[0].concat('M')
    } else if (number > 999999999 && number <= 999999999999) {
        number = numberWithCommas(number)
        formattedNumber = number.split(',')[0].concat('B')
    }
    return formattedNumber
}


main()
