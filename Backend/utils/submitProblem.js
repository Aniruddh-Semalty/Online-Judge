import User from "../Models/user.model.js";
import Submission from "../Models/submission.model.js"
const submitProblem=async(problemId,username,code)=>{
    try{
const user=await User.findOne({
    userName:username,
})

if(user)
{
const problemsSolvedArr=user.problemsSolved;
const ifAlreadySolved=problemsSolvedArr.filter((probId)=>{
    return probId==problemId;
})
const isProblemAlreadySubmitted=await Submission.findOne({
    userId:user._id,problemId:problemId
});
if(isProblemAlreadySubmitted)
{
    await Submission.updateOne({
        userId:user._id,
        problemId:problemId,
    },{
        submittedCode:code,
    }
    )
   
}
else{
   await Submission.create({
    userId:user._id,
    problemId:problemId,
    submittedCode:code,
   })
  
}

if(ifAlreadySolved.length!=0)
{
    
    return ;
}
else
{
user.problemsSolved.push(problemId);
user.save().then(()=>{
   return;
})


}
}

}catch(e){
    console.log(e)}
}
export default submitProblem;