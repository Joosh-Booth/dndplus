import { RegularText } from "@components/texts"
import MailIcon from '@material-ui/icons/Mail';
import ExpandingButton from './ExpandingButton'


const InvitePlayerButton = () => {

  return(
    <ExpandingButton style={{
      background:'#373777', 
      color:"#E4E6F0",
    }} 
      icon={<MailIcon style={{height:'100%', width:'100%'}} />} 
      child={<RegularText>Invite Player</RegularText>}
    />
  )
}

export default InvitePlayerButton

