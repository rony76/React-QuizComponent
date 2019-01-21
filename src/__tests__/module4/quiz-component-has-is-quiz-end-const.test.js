import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../App';
import { shallow } from 'enzyme';
import { assert } from 'chai';

let fs = require('fs');
let babylon = require("babylon");

describe('Quiz Component', () => {
  it('has a const named isQuizEnd that uses state to determine value @quiz-component-has-is-quiz-end-const', () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../../Quiz.js').toString();
    } catch (e) {
      assert(false, "The Quiz.js file hasn't been created yet.")
    }

    let ast = babylon.parse(file, { sourceType: "module", plugins: ["jsx"] })

    let is_quiz_end_declaration = null;

    ast['program']['body'].forEach(element => {
      if (element.type == 'ClassDeclaration') {
        if (element.id.name == 'Quiz') {
          element.body.body.forEach(el => {
            if (el.kind == 'method') {
              if (el.key.name == 'render') {
                el.body.body.forEach(el2 => {
                  if (el2.kind == 'const') {
                    el2.declarations.forEach(el3 => {
                      if (el3.id && el3.id.name == 'isQuizEnd') {
                        is_quiz_end_declaration = el3;
                      }
                    })
                  }
                })
              }
            }
          })
        }
      }
    })

    assert(is_quiz_end_declaration, "We can't find the isQuizEnd const declaration");

    assert(is_quiz_end_declaration.init.type === 'BinaryExpression', "We can't find a binary expression for the initialization of isQuizEnd");
    let statement = file.substring(is_quiz_end_declaration.init.start-20, is_quiz_end_declaration.init.end)
    let re = /isQuizEnd\s*=\s*\(?\s*\(?\s*this\.state\.quiz_position\s*-\s*1\s*\)?\s*===?\s*quizData\.quiz_questions\.length\)?/g
    let match = statement.match(re)
    assert(match != null, "We can't find where you're writing an expression that checks if `this.state.quiz_position - 1` is equivalent to `quizData.quiz_questions.length`.")
    assert(match.length == 1, "We can't find where you're writing an expression that checks if `this.state.quiz_position - 1` is equivalent to `quizData.quiz_questions.length`.")
  })
})