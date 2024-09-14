import { useState,useCallback,useEffect,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

// function App(){
//   let [counter,setCounter]=useState(15)
//   const addvalue=()=>{
//     console.log("clicked",counter);
//     setCounter(counter+1)
//   }

//   const Removevalue=()=>{
//     setCounter(counter-1)
//   }
//   return(
//     <>
//     <h1> Web React</h1>
//     <h2>Counter value:{counter}</h2>
//     <button onClick={addvalue}>Add value{counter}</button>
//     <button onClick={Removevalue}>Remove{counter}</button>
//     <p>Footer:{counter}</p>
//     </>
//   )
// }
// export default App


// function App(){
//   const [color,setColor]=useState("red")

//   return(
//     <div className="w-full h-screen duration-200"
//     style={{backgroundColor:color}}>

//       <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">

//         <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">

//           <button onClick={()=>setColor("red")}
//           className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
//           style={{backgroundColor:"red"}}>
//             red
//           </button>
//          </div>

         
//       </div>
//     </div>
//   )
// }

// export default App

function App(){
  const [length,setLength]=useState(8)
  const[numberAllowed,setNumberAllowed]=useState(false);

  const[charAllowed,setCharAllowed]=useState(false)
  const[password,setPassword]=useState("")

  const passwordRef=useRef(null)
  const passwordGenerator=useCallback(()=>{

    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed)str +="123456789"
    if(charAllowed)str +="!@#$%^&*()~`?"

    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length + 1)
      pass +=str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange (0,999);

    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return(
   
     <div style={{width:"100%",maxWidth:"28rem",marginLeft:"auto",marginRight:"auto",borderRadius:"0.5rem",backgroundColor:"gray",color:"green",marginTop:"8rem"}}>
      {/* <h1 className='text-white text-center my-3'>password Generator</h1> */}
      <h1 style={{textAlign:"center"}}>Password Generator</h1>
      {/* <div className="flex shadow rounded-lg overflow-hidden mb-4"></div> */}
      <div style={{display:"flex",borderRadius:"0.5rem",overflow:"hidden", marginBottom:"1rem"}}>
        <input type="text" value={password}
       
        style={{width:"50%",height:"50px",marginLeft:"25%",fontSize:"150%"}}
        readOnly ref={passwordRef}/>

        <button onClick={copyPasswordToClipboard}
       
        style={{outline:"none",backgroundColor:"blue",color:"white"}}>
          Copy
        </button>

      </div>
      
      <div 
      style={{fontSize:"1rem",lineHeight:"1.25rem",columnGap:"0.5rem"}}>
     
       <div 
       style={{display:"flex",alignItems:"center",columnGap:"0.25rem"}}>

        <input type="range" min={6} max={100} value={length} style={{cursor:"pointer",width:"155px",marginLeft:"25%"}} 
         onChange={(e)=>{setLength(e.target.value)}}/>

         <label>length:{length}</label>
       </div>
      
       <div style={{display:"flex",alignItems:"center",columnGap:"0.25rem"}}>

        <input type="checkbox"defaultChecked={numberAllowed}id="numberInput" onChange={()=>{
          setNumberAllowed((prev)=>!prev);
        }}/>
        <label htmlFor="numberInput"style={{display:"flex"}}>Number</label>
       </div>
       
       <div style={{display:"flex",alignItems:"center",columnGap:"0.25rem"}}>

        <input type="checkbox"defaultChecked={charAllowed}id="characterInput"
         onClick={()=>
         {
          setCharAllowed((prev)=>!prev);
         }
         }/>
         <label htmlFor="characteInput">charactes</label>
         
       </div>
      </div>
     </div>
  )
}
export default App