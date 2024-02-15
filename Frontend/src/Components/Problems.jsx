import axios from "axios";
import { useEffect,useState } from "react";
import {Link} from  "react-router-dom"
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
      
        
    }
    

    return (
        
        <div>
        
            {problems.map((prob)=>{
               return <DisplayProblem details={prob} key={prob._id}/>
                
            })}

        </div>
    )
}

const DisplayProblem=({details})=>{
    
    return (
        <Link to={`/problem/${details._id}`}>
        <div>
            <div>
                <h2>{details.Name}</h2>
                <div>
                <p>{details.Statement}</p>
                <button >{details.Difficulty}</button>
                </div>
            </div>
        </div>
        </Link>
    )
}
export default Problems;