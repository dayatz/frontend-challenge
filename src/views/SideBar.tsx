import { Filter, PointObject, RoadType } from '../interfaces'
import { Checkbox, DatePicker, Typography, Button } from "antd"
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import styled from "@emotion/styled"
import { Moment } from 'moment'
import Summary from '../components/Summary/Summary'
import { UpOutlined } from "@ant-design/icons"

const { Title } = Typography

const roadTypesObjects = [
  {
    title: "Landevej",
    type: RoadType.City
  },
  {
    title: "Byvej",
    type: RoadType.Rural
  },
  {
    title: "Villavej",
    type: RoadType.Residential
  },
  {
    title: "Sti og cykelsti",
    type: RoadType.Bikepath
  }
]

const FilterSectionWrapper = styled.div`
  margin-bottom: 16px;
  background-color: #ffffff;
  padding: 16px 24px;
`


type Props = {
  setFilter: (filter: Filter) => void
  filter: Filter
  data: PointObject[]
  isLoading: boolean
}

const SideBar: React.FC<Props> = ({ setFilter, filter, data, isLoading }) => {
  const isChecked = (roadType: RoadType) => {
    return filter.roadTypes.includes(roadType)
  }

  const handleCheckBoxChange = (
    e: CheckboxChangeEvent,
    roadType: RoadType) => {
      let selectedRoadTypes = [...filter.roadTypes]
      if (e.target.checked) {
        selectedRoadTypes.push(roadType)
      } else {
        selectedRoadTypes = selectedRoadTypes.filter(t => t !== roadType)
      }
      setFilter({
        ...filter,
        roadTypes: selectedRoadTypes
      })
  }

  const handleDateChange = (key: string, date: Moment|null) => {
    setFilter({
      ...filter,
      [key]: date
    })
  }

  return (
    <div style={{
      width: 400,
      height: '100%',
      position: 'fixed',
      backgroundColor: '#F6F9FC',
      zIndex: 1,
      borderRight: "1px solid rgba(0,0,0,.125)"
    }}>

      <FilterSectionWrapper key="date-filter">
        <Title level={4}>Optagelsesdato</Title>
        <div style={{ display: 'flex', justifyContent: "space-between" }}>
          <div style={{ flex: 1 }}>
            <DatePicker style={{ width: "100%" }}
              onChange={(value, dateString: string) => {
                handleDateChange("dateStart", value)
              }}
              value={filter.dateStart} />
          </div>
          <div style={{ flex: 1, marginLeft: 16 }}>
            <DatePicker style={{ width: "100%" }}
              onChange={(value, dateString: string) => {
                handleDateChange("dateEnd", value)
              }}
              value={filter.dateEnd} />
          </div>
        </div>
      </FilterSectionWrapper>

      <FilterSectionWrapper key="road-type-filter">
        <Title level={4}>Vejtyper</Title>
        {roadTypesObjects.map(r => {
          return (
            <div>
              <Checkbox
                key={`road-type-${r.type}`}
                checked={isChecked(r.type)}
                onChange={e => handleCheckBoxChange(e, r.type)}>
                  {r.title}
              </Checkbox>
            </div>
          )
        })}
      </FilterSectionWrapper>


      <FilterSectionWrapper key="summary">
        <Summary data={data} isLoading={isLoading} />
      </FilterSectionWrapper>

      <div style={{ textAlign: "center", marginTop: 24 }}>
        <Button shape="round" icon={<UpOutlined />} size="large" style={{ color: "#293A8E" }}>SKJUL FILTRE</Button>
      </div>
    </div>
  )
}

export default SideBar
