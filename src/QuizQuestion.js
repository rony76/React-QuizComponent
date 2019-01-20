import React, { Component } from 'react'
import PropTypes from 'prop-types';
import QuizQuestionButton from './QuizQuestionButton';

class QuizQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      incorrectAnswer: false
    }
  }

  handleClick(buttonText) {
    if (buttonText === this.props.quiz_question.answer) {
      this.props.showNextQuestionHandler();
    }
    this.setState({ incorrectAnswer: buttonText !== this.props.quiz_question.answer})
  }

  render() {
    return (
      <main>
        <section>
          <p>{this.props.quiz_question.instruction_text}</p>
        </section>
        <section className="buttons">
          <ul>
            {this.props.quiz_question.answer_options.map((answer_option, index) => 
              (<QuizQuestionButton 
                key={index} 
                button_text={answer_option} 
                clickHandler={this.handleClick.bind(this)}/>))}
          </ul>
        </section> 
        {this.state.incorrectAnswer ? <p className='error'>Sorry that's not right</p> : null}
      </main>
    )
  }
}

QuizQuestion.propTypes = {
  quiz_question: PropTypes.shape({
    instruction_text: PropTypes.string.isRequired,
    answer_options: PropTypes.array.isRequired,
  }).isRequired,
  showNextQuestionHandler: PropTypes.func,
}

export default QuizQuestion;