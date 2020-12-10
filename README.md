# bullDynamicQueue
It's used dynamic queue and store in static class for using in runtime

`DEBUG=* node index.js`

You can have multiple queue and define it here in array ( it will store in ram as static variable )  :

```
const queueNames = [
        "processNumberOne",
        "processNumberTwo",
        "processNumberThree"
    ]
    const parallelQueue = require("./parallelQueue")
    queueNames.forEach(async queueName=>{
        await parallelQueue.createInstance(queueName)
    })
```

Just need to get an instances and add job to your dynamic queue, after creating instances with each queue ( that could happen in runtime ).
for example:
Passing a dynamic processor to dynamic created instance :
`parallerProcessor` : you can raise job to queue with different process. ( will load it from process folder ) 

```
    const processNumberOne = await parallelQueue.getInstance("processNumberOne")
    await processNumberOne.add({parallerProcessor:"processNumberOne"})
```

**Processor will require dynamic process and run it(have look in `./process/parallelQueueProcessor.js`)**

`parallelQueue.js` is responsible to return an instance of your queue, if not there will create it
