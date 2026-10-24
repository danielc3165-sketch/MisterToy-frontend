import { toyService } from "./toy.service.local"

const labels=['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle']

export function getLabels(){
    return labels
}

export async function getData() {
    const toys= await toyService.query()
    return labels.map(label =>
        toys.filter(toy => toy.labels.includes(label)).length
    )
    
}