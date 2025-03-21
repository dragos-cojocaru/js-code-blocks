# JavaScript Code Blocks

An interactive web application that allows you to write, run, and manage JavaScript code blocks in a notebook-like interface.

⚠️ This is for educational purposes only. Executing JavaScript from a string with `eval()` is an enormous security risk. ⚠️

[Demo video](https://youtu.be/Hd_08Kk7ulM)

## Features

- Create multiple JavaScript code blocks
- Execute code blocks individually
- Reference variables from other code blocks (similar to Jupyter Notebook)
- Support for various JavaScript types:
  - Standard JavaScript expressions
  - DOM manipulation
  - Async code
  - URLs (automatically rendered as links)

## How It Works

Each code block is identified by a unique ID (A1, A2, etc.). When you run a code block, its result is stored and can be referenced in other blocks.

### Example Usage

1. **Block A1**: Define a variable

   ```javascript
   const greeting = "Hello, world!";
   greeting;
   ```

2. **Block A2**: Reference the variable from A1

   ```javascript
   // Access output from Block A1
   const message = A1;
   message + " How are you today?";
   ```

3. **Block A3**: Create DOM elements

   ```javascript
   const button = document.createElement("button");
   button.textContent = "Click me";
   button.addEventListener("click", () => {
     alert("Button clicked!");
   });
   button;
   ```

4. **Block A4**: Work with async code
   ```javascript
   async function fetchData() {
     const response = await fetch(
       "https://jsonplaceholder.typicode.com/todos/1"
     );
     return await response.json();
   }
   fetchData();
   ```

## Getting Started

1. Click "Add new block" to create a new code block
2. Write your JavaScript code in the textarea
3. Click "Run" to execute the code
4. Reference other block outputs using their IDs (A1, A2, etc.)

Enjoy your interactive JavaScript notebook!
