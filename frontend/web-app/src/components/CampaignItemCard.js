import { HorizontalFlexContainer } from "@components/containers"
import { CampaginItem } from "@components/Campaignitem"

export const CampaignItemCard = ({ items }) => {
  return (
    <HorizontalFlexContainer style={{
      backgroundColor:'aliceblue',
      borderRadius: 10
    }}>
      {items.map(item => (
        <div style={{ margin: `15px 15px 15px 15px` }} key={item.roomCode}>
          <CampaginItem data={item}></CampaginItem>
        </div>
      ))}
    </HorizontalFlexContainer>
  )
}