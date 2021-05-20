import React from 'react';
import {HoverableContainer,CenteredContainer}  from '@components/containers';
import { RegularText } from "@dnd/components/texts"

export default {
  title: 'Components/Containers/HoverableContainer',
  component: HoverableContainer,
}

export const HoverableContainerStory = () => <HoverableContainer title="Hover over me">
  <CenteredContainer css={{padding:10}}>
    <RegularText css={{color:"white"}}>
      Lorem Ipsum is simply dummy text of the 
      printing and typesetting industry. Lorem 
      Ipsum has been the industry's standard 
      dummy text ever since the 1500s, when an 
      unknown printer took a galley of type and 
      scrambled it to make a type specimen book. 
      It has survived not only five centuries, but 
      also the leap into electronic typesetting, 
      remaining essentially unchanged. It was popularised 
      in the 1960s with the release of Letraset 
      sheets containing Lorem Ipsum passages, and 
      more recently with desktop publishing software 
      like Aldus PageMaker including versions of Lorem Ipsum.
    </RegularText>
  </CenteredContainer>
</HoverableContainer>;
