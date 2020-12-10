
const init = async()=>{
    const queueNames = [
        "processNumberOne",
        "processNumberTwo",
        "processNumberThree"
    ]
    const parallelQueue = require("./parallelQueue")
    queueNames.forEach(async queueName=>{
        await parallelQueue.createInstance(queueName)
    })
    
    const processNumberOne = await parallelQueue.getInstance("processNumberOne")
    await processNumberOne.add({parallerProcessor:"processNumberOne"})

    //
    const processNumberTwo = await parallelQueue.getInstance("processNumberTwo")
    await processNumberTwo.add({parallerProcessor:"processNumberTwo"})

    //

    const processNumberThree = await parallelQueue.getInstance("processNumberThree")
    await processNumberThree.add({parallerProcessor:"processNumberThree"})

}

init()
