import { ChartPai } from "../cmps/ChartPai"
import { ChartLine } from "../cmps/ChartLine"

export function Dashboard(){
    return <div className="chart-container">
    <ChartPai /> 
    <ChartLine />
    </div>
}