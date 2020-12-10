var Queue = require('bull');
var concurrent = parseInt(process.env.QUEUE_CONCURRENT_PARALLEL) || 1
var processor = require("./process/parallelQueueProcessor")

module.exports = class parallelQueue {
  static instances = []

  static async getInstance(queueName){
    const result = this.instances.find( ({ queueInstanceName }) => queueInstanceName === queueName );
    if(result){
      return result.queueInstance
    }
    return await this.createInstance(queueName)
  }

  static async createInstance(queueName){
    const result = this.instances.find( ({ queueInstanceName }) => queueInstanceName === queueName );
    if(result){
      return result.queueInstance
    }else{
      var queueInstance =  await this.initializeQueue(queueName);
      this.instances.push({queueInstanceName:queueName , queueInstance : queueInstance})
      return queueInstance;
    }
  }

  static async initializeQueue(queueName,){
      const debug = require('debug')(queueName)
      const redisConfig = require("./redis")
      const queueInstance = Queue(queueName, redisConfig);
      queueInstance.process(concurrent, processor) ;
      queueInstance.on('completed', (job, result) => {
        debug(`\n ${queueName} Job completed with result   +++ \n`,result);
      })
      queueInstance.on('error', (err) => {
        debug(`\n ${queueName} Job error with result   +++ \n`,err );
      })
      queueInstance.on('failed', (job, err) => {
        debug(`\n ${queueName} Job failed with result   +++ \n` ,err );
        var data = job.data;
        queueInstance.add(data, {  delay : 60000});
        
      })
      return queueInstance;
    }


}

