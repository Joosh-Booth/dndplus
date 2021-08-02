import { HeaderButton } from "@components/buttons"
import { HorizontalFlexContainer, VerticalFlexContainer } from "@components/containers"


const Header = ({options, active, setActive=()=>null,}) => {
  
  const jumpTo = (ref) => {
    let el = document.getElementById(ref)
    el.scrollIntoView({behavior:'smooth'})
  }

  return(
    <>
      <HorizontalFlexContainer style={{
        marginTop:'13vh',
        justifyContent:'center',
        alignItems:'center',
        position:'sticky',
        top:60,
      }}>

        {options.map(option=>(
          <HeaderButton title={option.name} key={option.name} id={option.name} active={active==option} onClick={()=>{jumpTo(option.id); setActive(option)}}/>
        ))}

      </HorizontalFlexContainer>
      <VerticalFlexContainer  style={{height:'15vh'}}/>
    </>
  )
}

export default Header