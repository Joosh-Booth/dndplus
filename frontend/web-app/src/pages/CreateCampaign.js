import Helmet from 'react-helmet'
import { VerticalFlexContainer, HorizontalFlexContainer, CenteredContainer } from '@components/containers'
import { TextInput } from '@components/inputs'
import Text from '@components/Text'

const CreateCampaign = () =>{
  return (
    <>
      <Helmet title="DNDPlus | Create game"/>
      <VerticalFlexContainer>
        <HorizontalFlexContainer css={{margin:40, textAlign:'center'}}>
         <div css={{ margin:'auto 0 auto 0' }}><Text >Choose a title for your campaign: </Text></div>
         <TextInput css={{borderStyle:'none', height:60, fontSize:45, width:'30%'}}/>
        </HorizontalFlexContainer>
      </VerticalFlexContainer>
    </>
  )
};

export default CreateCampaign