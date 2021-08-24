import {ban} from 'react-icons-kit/fa/ban'
import {Icon} from 'react-icons-kit'
import { RegularText } from "@components/texts"
import { HorizontalFlexContainer } from '@components/containers'
import { getBackgroundColour } from '@dnd/theme'
import BlockIcon from '@material-ui/icons/Block';

const ExpandingButton = ({icon, child, style, onClick=()=>null}) => {
  return(
    <div style={{position:'relative', minWidth:'2vw',}}>
      <HorizontalFlexContainer css={{
          borderRadius:10, 
          overflow:'hidden',
          position:'absolute',
          whiteSpace:'nowrap',
          maxWidth:'2vw',
          height:'2vw',
          cursor:'pointer',
          ':hover':{
            maxWidth:'10vw'
          },
          transition:'max-width 250ms ease-in',
          ...style
        }}
        onClick={onClick}
      >
        <div style={{minWidth:'2vw', maxWidth:'2vw', padding:5, display:'flex' }}>
          {icon}
        </div>

        <div style={{ display:'flex', alignItems:'center', padding:10}}>
          {child}
        </div>
      </HorizontalFlexContainer>
    </div>
  )
}

export default ExpandingButton