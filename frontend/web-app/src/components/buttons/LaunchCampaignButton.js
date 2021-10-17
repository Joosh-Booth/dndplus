import { RegularText } from "@components/texts"
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ExpandingButton from './ExpandingButton'


const LaunchCampaignButton = ({maxWidth}) => {

  return(
    <ExpandingButton style={{
      background:'#475737', 
      color:"#E4E6F0",
    }} 
      icon={<PlayArrowIcon style={{height:'100%', width:'100%'}} />} 
      child={<RegularText>Launch Campaign</RegularText>}
      maxWidth={maxWidth}
    />
  )
}

export default LaunchCampaignButton

