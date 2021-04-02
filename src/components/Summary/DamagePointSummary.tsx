import { PointObject } from "../../interfaces"
import { Progress, Spin } from "antd"
import { getDamageDistributionsByClassnames } from "./utils"

type Props = {
    data: PointObject[]
    isLoading: boolean
}
const DamagePointSummary: React.FC<Props> = ({ data, isLoading }) => {
    if (!data) {
        return <Spin />
    }
    const damageDistributionsByClassnames = getDamageDistributionsByClassnames(data)
    const { total, level1, level2, level3, level4, level5 } = damageDistributionsByClassnames
    return (
        <Spin spinning={isLoading}>
            <Progress percent={(level1/total) * 100} strokeColor="#00FF01" />
            <Progress percent={(level2/total) * 100} strokeColor="#FFD23D" />
            <Progress percent={(level3/total) * 100} strokeColor="#FF9A4A" />
            <Progress percent={(level4/total) * 100} strokeColor="#FF9A4A" />
            <Progress percent={(level5/total) * 100} strokeColor="#FF443B" />
        </Spin>
    )
}

export default DamagePointSummary