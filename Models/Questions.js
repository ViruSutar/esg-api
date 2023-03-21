const mongoose=require('mongoose');

const QuestionsSchema  = new mongoose.Schema({
 question:{type:String},
 createdAt: { type: Date, immutable: true, default: () => new Date() },
 updatedAt: { type: Date, default: new Date() }
})

module.exports=mongoose.model('questions', QuestionsSchema);
