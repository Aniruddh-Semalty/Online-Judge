import axios from "axios";
import { useEffect,useState } from "react";
const Problems=()=>{
    const [problems,setProblems]=useState([]);
    useEffect(()=>{
        fetchProblems();
    },[])

     const fetchProblems=async()=>{
        const response=await axios.get("http://localhost:3000/problem");
        const fetchedProblems= response.data;
        
         setProblems(()=>{
        return fetchedProblems;
        });
        console.log(problems);
        
    }

    return problems.length==0?(<div>Fetching problems please wait</div>):(
        
        <div>
        
            {problems.map((prob)=>{
               return <DisplayProblem details={prob} key={prob._id}/>
                
            })}

        </div>
    )
}

const DisplayProblem=({details})=>{
    return (
        <div>
            <div>
                <h2>{details.Name}</h2>
                <div>
                <p>{details.Statement}</p>
                <button >{details.Difficulty}</button>
                </div>
            </div>
        </div>
    )
}
export default Problems;