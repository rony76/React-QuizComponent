import React, { Component } from 'react'
import PropTypes from 'prop-types';
import QuizQuestionButton from './QuizQuestionButton';

class QuizQuestion extends Component {
  render() {
    return (
      <main>
        <section>
          <p>{this.props.quiz_question.instruction_text}</p>
        </section>
        <section className="buttons">
          <ul>
            {this.props.quiz_question.answer_options.map((answer_option, index) => 
              (<QuizQuestionButton key={index} button_text={answer_option}/>))}
          </ul>
        </section> 
      </main>
    )
  }
}

QuizQuestion.propTypes = {
  quiz_question: PropTypes.shape({
    instruction_text: PropTypes.string.isRequired,
    answer_options: PropTypes.array.isRequired,
  }).isRequired,
}

export default QuizQuestion;