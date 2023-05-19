# ChatGPT prompt helper

ChatGPT Prompt helper is a simple, vanilla JavaScript HTML app that allows you to test multiple variations of AI prompts in one go. It uses a grid-like interface where each row represents a different test case, and the columns hold variations of the AI prompts. The app enables real-time editing and processing of these prompts and test cases. This project uses zero external dependencies.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Standalone webapp, no external deps, everything is run in your local browser.
- Real-time editing of AI prompts and test cases.
- Dynamically extendable rows and columns to add more prompts and test cases.
- Simultaneous processing of multiple prompts.
- All API calls are cached on localStorage

## Installation

To get the project running on your local machine, you need to follow these steps:

1. Clone this repository
   ```sh
   git clone https://github.com/oldpa/prompt-helper.git
   ```
2. Navigate to the project directory
   ```sh
   cd prompt-helper
   ```
3. Open `index.html` in your favorite browser.

That's it! No extra installations or dependencies are needed as this is a pure vanilla JavaScript project.

## Usage

The app has a grid with editable text areas. You add prompts in the top row and test cases in the columns. The table cells will then be populated with the results of combining the respective prompts and test cases.

To add new rows or columns, simply type into the last row or column, and a new one will automatically be added. Clicking the "Run" button at the top of the page executes the mixing of prompts and test cases and populates the grid cells.

## Contributing

Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
