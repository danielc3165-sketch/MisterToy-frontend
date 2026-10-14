import { toyService } from "./toy.service.local"

const labels=['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle']

export function getLabels(){
    return labels
}

export function getData() {
    return toyService.query()
    .then(toys =>
        labels.map(label =>
            toys.filter(toy => toy.labels.includes(label)).length
        )
    )
}

// export function getDataByPrice(){

// }