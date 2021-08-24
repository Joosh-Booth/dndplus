import { RegularText } from "@components/texts"
import BlockIcon from '@material-ui/icons/Block';
import ExpandingButton from './ExpandingButton'


const LeaveCampaignButton = ({onClick=()=>null}) => {

  return(
    <ExpandingButton style={{
      background:'#a42222', 
      color:"#E4E6F0",
    }} 
      onClick={onClick}
      icon={<BlockIcon style={{height:'100%', width:'100%'}} />} 
      child={<RegularText>Leave Campaign</RegularText>}
    />
  )
}

export default LeaveCampaignButton

