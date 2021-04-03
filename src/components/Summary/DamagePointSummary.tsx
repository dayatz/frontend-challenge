import { PointObject } from "../../interfaces"
import { Progress, Spin } from "antd"
import { getDamageDistributionsByClassnames } from "./utils"

type Props = {
    data: PointObject[]
    isLoading: boolean
}

const getPercent = (subtotal: number, total: number) => Math.round((subtotal/total) * 100)

const DamagePointSummary: React.FC<Props> = ({ data, isLoading }) => {
    if (!data) {
        return <Spin />
    }
    const damageDistributionsByClassnames = getDamageDistributionsByClassnames(data)
    const { total, level1, level2, level3, level4, level5 } = damageDistributionsByClassnames
    return (
        <Spin spinning={isLoading}>
            <Progress percent={getPercent(level1, total)} strokeColor="#00FF01" />
            <Progress percent={getPercent(level2, total)} strokeColor="#FFD23D" />
            <Progress percent={getPercent(level3, total)} strokeColor="#FF9A4A" />
            <Progress percent={getPercent(level4, total)} strokeColor="#FF9A4A" />
            <Progress percent={getPercent(level5, total)} strokeColor="#FF443B" />
        </Spin>
    )
}

export default DamagePointSummary