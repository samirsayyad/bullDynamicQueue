module.exports = (job , done)=>{
    try{
        if(job.data.parallerProcessor){
            var parallerProcessor = require(`./${job.data.parallerProcessor}`)
            parallerProcessor(job,done)
        }else{
            done(null, job.data  + " data is wrong")
        }
    
    }catch(err){
        done(null, err  + " error of  is wrong")

    }

}