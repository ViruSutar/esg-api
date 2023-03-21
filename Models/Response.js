const mongoose=require('mongoose');

const ResponseSchema  = new mongoose.Schema({
 questionId:{type:mongoose.Types.ObjectId ,ref:'questions',require:true},
 answers:[],
 userId:{type:mongoose.Types.ObjectId ,ref:'users',require:true},
 attachment:{type:String},
 createdAt: { type: Date, immutable: true, default: () => new Date() },
 updatedAt: { type: Date, default: new Date() }
})

ResponseSchema.index({questionId:1,userId:1},{unique:true})
module.exports=mongoose.model('response', ResponseSchema);
