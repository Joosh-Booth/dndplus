import { useState, useEffect } from "react";
import {Header} from "@components/sections";


const Sections =({options})=>{
  //let divById = document.getElementById("notes");
  //let divRect = divById.getBoundingClientRect();
  const [active, setActive] = useState(null)
  
  const scrollFunction = () => {
    let offset=60
    for (let i = 0; i < options.length; i++) {
      if(i<options.length-1){
        var section = document.getElementById(options[i].id),
        nextSection = document.getElementById(options[i+1].id),
        sectionTop = section.offsetTop-offset,
        nextSectionTop = nextSection.offsetTop-offset,
        currentWindowScrollPosition = window.pageYOffset;
        if(i==0&&currentWindowScrollPosition<sectionTop){
          setActive(null)
          break;
        }
        if(currentWindowScrollPosition>=sectionTop&&currentWindowScrollPosition<nextSectionTop){
          setActive(options[i]);
          break;
        }
      }
      if(i==options.length-1){
        setActive(options[i]);
        break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);
    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  return(
    <>
      <Header options={options} setActive={setActive} active={active} />
      {options.map(option=>(
        <div
          id={option.id}
          key={option.id}
        >
          {option.children}
        </div>
      ))}
    </>
  )
}

export default Sections