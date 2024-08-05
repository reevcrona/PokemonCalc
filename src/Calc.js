import React,{useState,useEffect} from 'react';
import mario from "./images/super-mario-bros-video-game-jump-11021621a10df8d28e0ceeeb5f07b793.png";
import pika from "./images/pngaaa.com-1709203.png"

function Calc(props) {
    
    
    
    const [input, setInput] = useState(""); // State to hold input value

    const [prevInput,setPrevInput] = useState("");


    const myButtons = ['00', '0', '.', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', 'x', '/', '+', '-', '%', '='];

    const allowedKeys = new Set(myButtons.concat(['Backspace', 'Enter']));

    


    const regex = /^\d+(\.\d+)?(\s*[\x\/\+\-\%]\s*\d+(\.\d+)?)*$/;

    

    
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
    
    
    
    
    
    
    
    function handleChange(event){
        const {value} = event.target
        
        setInput(value)

    }


    const handleClick = (value) => {
        
        if (value === 'C') {
            setInput("");
            setPrevInput("")

        } else if (value === "="){  
            if(regex.test(input)){
                fetch(`https://app-code-x-calculator-be-01.azurewebsites.net/api/Calculation/calculate?expression=${encodeURIComponent(input)}`)
                .then(res => res.json())
                .then(data => {
                    setInput(data.result.result)
                     setPrevInput(`${input} =`)
                })
               
               } 
           
            
            }
            
         else {
           
            setInput((prevInput) => prevInput + value); // Append value to input
           
         }
            
        
    };
    
    
    
    const calcButtons = myButtons.map( (btnValue) => (
            <button key={btnValue} onClick={() => handleClick(btnValue)}>
                {btnValue}
            </button>
        )
    );
    


    
    
    
    
    
    
    return (
        <div>
            <div id="miniräknare-three" className="hover calc">
                
                
                
                
                <div className="top">
                    <div className="display display-bg display-bg-yellow">
                        <div className='input-container'>
                        <p className='prevInput'>{prevInput}</p> 
                        <input className="input-three" type="text" placeholder="0" onChange={handleChange} value={input} />
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
