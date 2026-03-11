export default function TestFun(){
 function Handle(){
    return console.log("this function is working")
 }
 function Handle2(){
    return console.log("this function is working")
 } 


    return(
    <div>
        <h1>hello worldd</h1>
        <button onClick={()=>{Handle(),Handle2()}}>click console</button>
    </div>
)
}