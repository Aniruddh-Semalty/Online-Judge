import {Router} from "express";
import Problem from "../Models/problem.model.js";
import testcases from "../Models/testcase.model.js";
import Submission from "../Models/submission.model.js";


const problemRouter=Router();


problemRouter.get("/",async(req,res)=>{
    

    
    try{
        const allProblems=await Problem.find({});
        res.send(allProblems);
    }
    catch(error)
    {
        console.log(error);
        res.send("Something wrong with the database");
    }
    
    
})
problemRouter.get("/:id",async(req,res)=>{
    const probId=req.params.id;
    
    try{
    const problem=await Problem.findOne({_id:probId});
    const  probTestcases=await testcases.findOne({ problemId:probId});
   
    // const submission=await Submission.findOne({})
    res.status(200).json({
        msg:"success",problemDetails:problem,probTestcases
    })
    }
    catch(error)
    {
        console.log(error);
        res.status(200).json({
            msg:"Failed",error:error
        })
    }

  
  })

  problemRouter.put("/:id",async(req,res)=>{
    
    const probId=req.params.id;
    const  {problemName,problemStatement,difficultyLevel,expectedInput,expectedOutput}=req.body;
    const updatedProblem=await Problem.findOneAndUpdate({_id:probId},{
        Name:problemName,
        Statement:problemStatement,
        Difficulty:difficultyLevel,
    },{new:true});
    let updatedTestcase;
    if((typeof(expectedInput)==="string" && typeof(expectedOutput)==="string"))
    {
    const expectedInputArr=expectedInput.split(/[,\n]/);
    const expectedOutputArr=expectedOutput.split(/[,\n]/);
  
     updatedTestcase=await testcases.findOneAndUpdate({problemId:probId},{
            input:expectedInputArr,
            output:expectedOutputArr,
    },{new:true});
}
else{
updatedTestcase=await testcases.findOne({problemId:probId});
}

    res.status(200).json({  msg:"success",problem:updatedProblem,testcase:updatedTestcase});
}

);

problemRouter.post("/",async(req,res)=>{
    const  {problemName,problemStatement,difficultyLevel,expectedInput,expectedOutput}=req.body;
    const problemToAdd=new Problem({
        Name:problemName,
        Statement:problemStatement,
        Difficulty:difficultyLevel,
      
       
    })
    
    const response=await problemToAdd.save();
   
    const problemId=await response._id;
    
    const expectedInputArr=expectedInput.split(/[,\n]/);
    const expectedOutputArr=expectedOutput.split(/[,\n]/);
   
    const testcaseToAdd=new testcases({
        problemId:problemId,
        input:expectedInputArr,
        output:expectedOutputArr,
    })
    const testcaseResponse=await testcaseToAdd.save();
   
    if(response.length!=0 && testcaseResponse.length!=0)
        res.status(200).json({"msg":"problem added successfully"})
    else{
        res.status(400).json({"msg":"Failde to add the problem"})
    }
    
})
problemRouter.delete("/:id",async(req,res)=>{
    const probId=req.params.id;
  
    await Problem.deleteOne({_id:probId});
    await Submission.deleteOne({problemId:probId});
    await testcases.deleteOne({problemId:probId});
     res.status(200).json({msg:"success"});

})


export default problemRouter;