"use strict";
let express = require("express");
let router = express.Router();
let Question = require("../models/Question.js");


// Create a new question: POST /api/questions/
router.post("/", function (req, res) {  
  let newquestion = new Question(req.body);
  newquestion.save();
  return res.json(newquestion);
});

// Read all the existing questions : GET /api/questions/
router.get("/",  function (req, res) { 
  return res.json(question.list);
});

// Read an identified question : GET /api/questions/:id
router.get("/:id", function (req, res) {
  
  const questionFound = Question.getListFromCat(req.params.id);
  
  if(!questionFound) {
    return res.status(401).end();
  }
   
  return res.json(questionFound);
});

// Delete a question : DELETE /api/questions/:id
router.delete("/:id", function (req, res) {
  const questionDeleted = question.delete(req.params.id);
  if (!questionDeleted) return res.status(404).end();
  return res.json(questionDeleted);
});


//Get question with the right categorie
router.get("/:categorie", function(req,res){
  console.log("GET question/:categorie", req.params.categorie);
  const questionFound = Question.getListFromCat(req.params.categorie);
  if(!questionFound) return res.status(404).end();
  return res.json(questionFound);
});

// Update a question : PUT /api/questions/:id
router.put("/:id", function (req, res) {
  const questionUpdated = question.update(req.params.id, req.body);
  if (!questionUpdated) return res.status(404).end();
  return res.json(questionUpdated);
});

module.exports = router;
