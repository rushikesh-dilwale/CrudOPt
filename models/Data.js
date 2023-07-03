const mongoose= require("mongoose")

const dataSchema = new mongoose.Schema({
    emailId:{
        type:String,
    },
    name: {
        type: String,
    } ,
    description:{
        type: String,
    },
    image:{ 
        type: String,
    },
  });

  const Data = mongoose.model("data", dataSchema);

  module.exports = Data;