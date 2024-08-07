import React,{useState,useEffect,useRef} from 'react';
import mario from "./images/super-mario-bros-video-game-jump-11021621a10df8d28e0ceeeb5f07b793.png";
import pika from "./images/pngaaa.com-1709203.png"
import History from './History';
import { FaHistory } from "react-icons/fa";

function Calc(props) {
    
    
   
    const [input, setInput] = useState(""); // State to hold input value

    const [prevInput,setPrevInput] = useState("");

    const [history,setHistory] = useState(JSON.parse(localStorage.getItem("history")) || [])

   


    const myButtons = ['00', '0', '.', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', 'x', '/', '+', '-', '%', '='];

    const allowedKeys = new Set(myButtons.concat(['Backspace', 'Enter']));

    const inputRef = useRef(null);
    const hiddenSpanRef = useRef(null)


    const regex = /^\d+(\.\d+)?(\s*[\+\-\*/%]\s*\d+(\.\d+)?)+$/;
   
   
    const animationLetters = ["C","A","L","C","C","R","E","W"]

   
  
    
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!allowedKeys.has(event.key)) {
                event.preventDefault();
            } else if (event.key === 'Enter') {
                handleClick('=');
                event.preventDefault();
            }else{
                
            }
        };

        const inputElement = document.querySelector('.input-three');
        inputElement.addEventListener('keydown', handleKeyDown);

        return () => {
            inputElement.removeEventListener('keydown', handleKeyDown);
        };
    }, [input]);
    
    
    useEffect(() => {
        const lastLetter = document.querySelector(".animation-8");
        const animationContainer = document.querySelector(".animation-container");
        const inputPlaceholder = document.querySelector(".input-three");
        document.querySelector('input').disabled = true;
        const enableButtons = document.querySelectorAll(".calc-button")
        
        enableButtons.forEach(button => {
            button.disabled = "true"
        })
        
        const handleAnimationEnd = () => {
            setTimeout(() => {
                animationContainer.style.display = "none";
                inputPlaceholder.classList.add("show-placeholder")
                document.querySelector('input').disabled = false;

                enableButtons.forEach(button => {
                    button.disabled = !button.disabled
                })
                

               },1400)
        }


        lastLetter.addEventListener("animationend",handleAnimationEnd)

        return () => {
            lastLetter.removeEventListener("animationend",handleAnimationEnd)
        }
    },[])
    
    
    useEffect(() => {
        checkOverflow()
    },[input])
    
    function handleChange(event){
        const {value} = event.target
        
        setInput(value)

        checkOverflow()

    }


    function checkOverflow(){

        hiddenSpanRef.current.textContent = inputRef.current.value;

        const displayStyle = window.getComputedStyle(inputRef.current);

        hiddenSpanRef.current.style.font = displayStyle.font
        hiddenSpanRef.current.style.fontSize = displayStyle.fontSize;
        hiddenSpanRef.current.style.fontFamily = displayStyle.fontFamily;
        hiddenSpanRef.current.style.fontWeight = displayStyle.fontWeight;
        hiddenSpanRef.current.style.fontStyle = displayStyle.fontStyle;
        hiddenSpanRef.current.style.letterSpacing = displayStyle.letterSpacing;
        hiddenSpanRef.current.style.textTransform = displayStyle.textTransform;


        const spanWidth = hiddenSpanRef.current.offsetWidth;
        const inputWidth = inputRef.current.clientWidth;


            const normalFontSize = "1.8rem";
            const currentFontSize = parseFloat(displayStyle.fontSize);
            const newFontSize = currentFontSize * 0.9;
            

        if (spanWidth > inputWidth) {
        
            inputRef.current.style.fontSize = `${newFontSize}px`
          }
          
          else {
            

            hiddenSpanRef.current.style.fontSize = normalFontSize;
            hiddenSpanRef.current.textContent = inputRef.current.value;

            const spanWithNormalFont = hiddenSpanRef.current.offsetWidth;

            if(spanWithNormalFont <= inputWidth){
                
                inputRef.current.style.fontSize = normalFontSize;
            }
                

          }
    }  
    function removeLastHistory(){
        if(history.length > 5){
            setHistory(prevState => prevState.slice(0,-1))
        }
    }


    useEffect(() => {
        
        removeLastHistory();
        localStorage.setItem("history", JSON.stringify(history));
        
    }, [history]);


    function addHistory(apiResult){
        
        setHistory(prevState => {
            const newHistory = {
                expression:input,
                result:apiResult
            }
        
        
        
            return  [newHistory,...prevState]
        })

        
    

        
    }

    const handleClick = (value) => {
        
        if (value === 'C') {
            setInput("");
            setPrevInput("")

            inputRef.current.style.fontSize = "1.8rem"

        } else if (value === "="){  
            if(regex.test(input)){
                fetch(`https://app-code-x-calculator-be-01.azurewebsites.net/api/Calculation/calculate?expression=${encodeURIComponent(input)}`)
                .then(res => res.json())
                .then(data => {
                    
                   
                    addHistory(String(data.result.result))
                   
                    
                    setInput(data.result.result)
                     setPrevInput(`${input} =`)
                })
               
               } 
           
            
            }
            
         else {
           
            setInput((prevInput) => prevInput + value); 
           
         }
            
        
    };
    
    
    

    const calcButtons = myButtons.map( (btnValue) => (
            <button className='calc-button' key={btnValue}  onClick={() => handleClick(btnValue)}>
                {btnValue}
            </button>
        )
    );
    

const animation = animationLetters.map((letter,index) => {
  return <span  key = {index} className= {`animation-${index + 1}`}>{letter}</span>
})
    
    
const myHistory = history.map((hist,index) => {
    return <History expression = {hist.expression} result = {hist.result} />
})

console.log(myHistory)
    
    return (
        <div id='calc-main'>
            
            



            <div id="miniräknare-three" className="hover calc">
                
            <div className="history-container">
                
                <div className='history-top'>
                <h2>History <FaHistory className="history-icon" /></h2>

                <div className='history-bottom'>
                    {myHistory}
                </div>
                </div>
                

                
                
                
            </div>
                
                <div className="top">
                    
                    <div className="display  display-bg-yellow">
                        <div className='input-container'>
                        <p className='prevInput'>{prevInput}</p> 
                        <input className="input-three" ref={inputRef} type="text" placeholder="0" onChange={handleChange} value={input} />
                        </div>
                        
                        <span ref={hiddenSpanRef} className="hidden-span"></span>

                        <div className="animation-container">
                            <p className='animation-p'>{animation}</p>
                            <p className="code-x">Code_x</p>
                            
                        </div>
                    
                        <div className="yellow-images">
                        <img className="pika-img" src={pika} alt="Pika" />
                        <img className="mario-img" src={mario} alt="Mario" />
                     <p className="color-text">Calculator <span>C</span><span>O</span><span>L</span><span>O</span><span>R</span></p>
                </div>
                    </div>
                </div>
                
                <div className="bottom-three">
                    <div className="buttons three">
                        {calcButtons}
                    </div>
                </div>
               
            </div>
        </div>
    );
}

export default Calc;
