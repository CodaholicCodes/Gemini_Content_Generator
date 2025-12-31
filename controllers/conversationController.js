const Conversation = require('../models/Conversation');
const geminiService=require('../service/geminiService')

exports.newConversation=async (req,res,next)=>{
    const {prompt,model}=req.body;
    const response=await geminiService.generateContent(prompt,model);
    const messagesList=[{role : 'user' ,content : prompt }, {role : 'assistant' , content  : response}];
    const conversation=new Conversation({
        title : await geminiService.generateTitle(messagesList) ,
        model,
        messages : messagesList
        })
  await conversation.save();
   res.status(201).json(conversation); 

}


exports.getConversations=async (req,res,next)=>{
    
const conversations=await Conversation.find();
   res.status(200).json(conversations); 

}

exports.newMessage=async (req,res,next)=>{
    const {id}=req.params;
    const {prompt}=req.body;
    const oldConversation=await Conversation.findById(id);

    if(!oldConversation)
   return res.status(404).json({message : 'Conversation not found'});

    const response=await geminiService.generateContent(prompt,oldConversation.model,oldConversation.messages);
   oldConversation.messages.push({role : 'user' , content : prompt });
   oldConversation.messages.push({role : 'assistant' , content : response });
  await oldConversation.save();
   res.status(200).json(oldConversation); 

}


exports.deleteMessage=async (req,res,next)=>{
    const {id}=req.params;
 
await Conversation.findByIdAndDelete(id);
   res.status(204).json({message : "Conversation Deleted"}); 
}