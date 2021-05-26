import Helmet from 'react-helmet'
import { useMutation } from "@apollo/client"
import { Formik } from "formik"
import { VerticalFlexContainer, HorizontalFlexContainer } from '@components/containers'
import { TextInput } from '@components/inputs'
import { CREATE_CAMPAGIN } from '@components/mutations'
import { RegularText } from '@components/texts'
import Button from '@components/Button'

//run is authenticated on page load - Hook ?
const CreateCampaign = () => {

  const [createCampaign] = useMutation(CREATE_CAMPAGIN)

  return (
    <Formik
      initialValues={{ title:"" }}
      onSubmit={async (values) => {
        let response = await createCampaign({
          variables: {
            input: { ...values }
          }
        })
        if (response.data.createCampaign.__typename === "CreateCampaignSuccess") {
          console.log(response.data)
        }
      }}>

      {({
        handleSubmit,
        handleChange
      }) => (
        <>
          <Helmet title="DNDPlus | Create game" />
          <VerticalFlexContainer css={{
            paddingTop: 250
          }}>
            <div css={{ margin: 'auto ' }}>
              <RegularText css={{
                fontWeight: 'bold',
                fontSize: 20,
              }}>
                CAMPAIGN TITLE: 
              </RegularText>
            </div>
            <form onSubmit={handleSubmit}>
              <HorizontalFlexContainer
                css={{
                  margin: 'auto',
                  paddingBottom: 30,
                  paddingTop: 30,
                  width:'45%'
                  
                }}
              >

                <TextInput
                  css={{
                    borderStyle: 'none',
                    borderRadius: 0,
                    borderBottom: 'solid 2px',
                    borderColor: '#000000',
                    height: 60,
                    color: '#555555',
                    fontSize: 35,
                    padding: 0,
                    backgroundColor: 'rgba(0,0,0,0.0)',
                    textAlign: 'center'
                  }}
                  onChange={handleChange}
                  name="title"
                />

              </HorizontalFlexContainer>
              <div css={{ margin:'auto', width:'7.5%' }}>
                <Button type="submit">Continue</Button>
              </div>
            </form>
          </VerticalFlexContainer>
        </>
      )}
    </Formik>
  )
};

export default CreateCampaign