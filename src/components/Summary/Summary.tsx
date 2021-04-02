import { PointObject } from "../../interfaces"
import { Tabs } from "antd"
import DamageSummary from "./DamageSummary"

const { TabPane } = Tabs

type Props = {
    data: PointObject[]
    isLoading: boolean
}

const Summary: React.FC<Props> = ({ data, isLoading }) => {
    return (
        <Tabs defaultActiveKey="damage" centered>
            <TabPane tab="Skader" key="damage">
                <DamageSummary data={data} isLoading={isLoading} />
            </TabPane>
            <TabPane tab="Inventar" key="inventory">

            </TabPane>
        </Tabs>
    )
}

export default Summary