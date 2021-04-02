import { useState } from "react"
import { PointObject } from "../../interfaces"
import { Radio } from "antd"
import DamagePointSummary from "./DamagePointSummary"

type Props = {
    data: PointObject[]
    isLoading: boolean
}
const DamageSummary: React.FC<Props> = ({ data, isLoading }) => {
    const [currentSummaryCategory, setCurrentSummaryCategory] = useState<number>(0)
    return (
        <div>
            <div style={{ textAlign: "center", marginBottom: 32, marginTop: 16 }}>
                <Radio.Group onChange={(e) => setCurrentSummaryCategory(e.target.value)} value={currentSummaryCategory}>
                    <Radio.Button value={0}>Point</Radio.Button>
                    <Radio.Button value={1}>Kategorier</Radio.Button>
                    <Radio.Button value={2}>Akutte huller</Radio.Button>
                </Radio.Group>
            </div>

            {currentSummaryCategory === 0 &&
                <DamagePointSummary data={data} isLoading={isLoading} />
            }
        </div>
    )
}

export default DamageSummary