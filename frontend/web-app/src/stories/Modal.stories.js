import React from 'react';
import {Modal}  from '@components/Modals';
import SignupForm from '@components/forms/SignupForm';


export default {
  title: 'Components/Modals/BaseModal',
  component: Modal,
}

export const EmptyModalStoryOpen = () => <Modal open={true}>Button</Modal>;
export const EmptyModalStoryNotOpen = () => <Modal open={false}>Button</Modal>;
export const FormModalStory = () => <Modal open body={<SignupForm></SignupForm>}/>;