import styled from "@emotion/styled";
import { baseText } from "@dnd/theme";


const TextInput = styled("input")(
    {
      fontFamily:baseText,
      fontSize:14,
      margin: 0, 
      padding: '12px 17px',
      borderRadius:5,
      borderColor:'#555555' ,
      boxSizing: "border-box",
      width:'100%'
    },
    (props)=>{
      
    }
  );

export default TextInput;
