function randomBetween(min,max){
    return Math.floor(
        Math.random()*(max-min)+min
    )
}

export {randomBetween};