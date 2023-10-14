
declare let ymaps: any;

async function getPathTime(from: number[], to: number[]) {
    const path = await ymaps.route([
        {type: 'wayPoint', point: from},
        {type: 'wayPoint', point: to}
    ])
    return path.getTime()
}

export {getPathTime}