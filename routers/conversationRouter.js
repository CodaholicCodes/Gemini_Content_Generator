const express=require('express');
const conversationRouter=express.Router();

const conversationController=require('../controllers/conversationController');

conversationRouter.post("/conversation",conversationController.newConversation);

conversationRouter.get("/conversation",conversationController.getConversations);

conversationRouter.put("/conversation/:id",conversationController.newMessage);

conversationRouter.delete("/conversation/:id",conversationController.deleteMessage);

module.exports=conversationRouter;