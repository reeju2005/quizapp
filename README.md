# Science Trivia Quiz App

A simple web-based science trivia quiz application.

## Features

- Multiple-choice science questions
- 10-second timer per question
- Scoring system:
  - 3 points for answering within 7 seconds
  - 2 points for answering within 4 seconds
  - 1 point otherwise
  - Bonus points for consecutive correct answers (5, 10, 15+ streaks)
  - -1 point for each wrong answer
- Responsive and modern UI
- Start, restart, and end quiz functionality

## Project Structure

```
.
├── intro.html         # Welcome/start page
├── page.html          # Main quiz page
├── end.html           # Quiz completion page
├── css/
│   ├── style1.css     # Styles for quiz page
│   └── style2.css     # Styles for intro page
└── js/
    └── src.js         # Quiz logic
```

## How to Run

1. Clone or download this repository.
2. Open `intro.html` in your web browser to start the quiz.

## File Descriptions

- **intro.html**: Welcome page with quiz instructions and start button.
- **page.html**: Main quiz interface with timer, questions, options, and score.
- **end.html**: Displays a completion message after the quiz ends.
- **css/style1.css**: Styles for the quiz interface.
- **css/style2.css**: Styles for the intro page.
- **js/src.js**: Contains all quiz logic, question data, and scoring.

## Customization

- To add or edit questions, modify the `triviaQuestions` array in [`js/src.js`](js/src.js).
- To change styles, edit the CSS files in the `css/` directory.

## License

This project is for educational purposes.
