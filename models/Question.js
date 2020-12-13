"use strict";


const FILE_PATH = __dirname + "/../data/questions.json";

class Question {
  constructor(data) {
    this.id = Question.nextquestionId();
    this.title=data.duration;
    this.categorie = data.duration;
    this.reponse1 = data.duration;
    this.reponse2 = data.duration;
    this.reponse3 = data.duration;
    this.reponse4 = data.duration;
    this.reponseCorrecte = data.budget;
    // add protocole if needed to the link
    if (data.link && !data.link.match(/^(http|https)/))
      data.link = "http://" + data.link;
    this.link = escape(data.link);
  }

  static nextquestionId() {
    let questionList = getquestionsListFromFile(FILE_PATH);
    if (questionList.length === 0) return 1;
    return questionList[questionList.length - 1].id + 1;
  }

  save() {
    let questionList = getquestionsListFromFile(FILE_PATH);
    questionList.push(this);
    savequestionsListToFile(FILE_PATH, questionList);
  }

  static update(id, newData) {
    let questionsList = getquestionsListFromFile(FILE_PATH);
    let index = questionsList.findIndex((question) => question.id == id);
    if (index < 0 || !newData) return;
    //escape the title & link in order to protect agains XSS attacks
    if (newData.title) newData.title = escape(newData.title);
    if (newData.link) newData.link = escape(newData.link);
    //Use the spread operator to shallow copy all existing attributes of a question
    //Then replace some of the existing attributes by the keys/values of newData
    questionsList[index] = { ...questionsList[index], ...newData };
    const questionUpdated = { ...questionsList[index] };
    savequestionsListToFile(FILE_PATH, questionsList);
    return questionUpdated;
  }

  static get(id) {
    let questionsList = getquestionsListFromFile(FILE_PATH);
    return questionsList.find((question) => question.id == id);
  }

  static get list() {
    return getquestionsListFromFile(FILE_PATH);
  }


  static getListFromCat(categorie){
    let list = [];
    list = getquestionsListFromFile(FILE_PATH);
    
    let catList = [];
    for (var i = 0; i < list.length; i++) { 
      
      if(list[i].categorie == categorie){
        catList.push(list[i]);
      }
     
    }
    
    
    return catList;
  }

  static delete(id) {
    let questionsList = getquestionsListFromFile(FILE_PATH);
    const index = questionsList.findIndex((question) => question.id == id);
    if (index < 0) return;
    const itemRemoved = { ...questionsList[index] };
    // remove the question found at index
    questionsList.splice(index, 1);
    savequestionsListToFile(FILE_PATH, questionsList);
    return itemRemoved;
  }
}

function getquestionsListFromFile(filePath) {
  const fs = require("fs");
  if (!fs.existsSync(filePath)) return [];
  let questionListRawData = fs.readFileSync(filePath);
  let questionList;
  if (questionListRawData) questionList = JSON.parse(questionListRawData);
  else questionList = [];
  return questionList;
}

function savequestionsListToFile(filePath, questionList) {
  const fs = require("fs");
  let data = JSON.stringify(questionList);
  fs.writeFileSync(filePath, data);
}

module.exports = Question;
