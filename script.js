function createEditableCell() {
  const cell = document.createElement("td");
  cell.classList.add("variation");
  const textarea = document.createElement("textarea");
  textarea.setAttribute("placeholder", "Add variation here");
  textarea.addEventListener("input", handleInput);
  cell.appendChild(textarea);
  return cell;
}

function createPromptCell(prompt) {
  const cell = document.createElement("td");
  
  const textarea = document.createElement("textarea");
  textarea.setAttribute("placeholder", "Add prompt here");
  textarea.addEventListener("input", handleInput);
  if (prompt !== undefined) {
    textarea.value = prompt;
  }
  const div = document.createElement("div");
  div.classList.add("prompt");
  cell.appendChild(div);
  div.appendChild(textarea);
  div.appendChild(getModelPicker());
  return cell;
}

function getModelPicker() {
  const select = document.createElement("select");
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");

  option1.value = "gpt-3.5-turbo";
  option1.textContent = "gpt-3.5";

  option2.value = "gpt-4";
  option2.textContent = "gpt-4";

  select.appendChild(option1);
  select.appendChild(option2);
  return select;
}
function autoGrow(element) {
  element.style.height = "auto"; // Reset height so that scrollHeight returns the correct value
  element.style.height = element.scrollHeight + "px";
}
function handleInput(event) {
  const textarea = event.target;
  autoGrow(textarea);
  const cell = textarea.parentElement.parentElement;
  const row = cell.parentElement;
  const table = row.parentElement;
  console.log(table);
  console.log(row.rowIndex, cell.cellIndex, table.rows[0].cells.length - 1, table);
  if (row.rowIndex === 0 && cell.cellIndex === table.rows[0].cells.length - 1) {
    addColumn();
  } else if (cell.cellIndex === 0 && row.rowIndex === table.rows.length - 1) {
    addRow();
  }
}

function addRow() {
  const table = document.getElementById("gridTable");
  const newRow = table.insertRow();
  newRow.appendChild(createEditableCell());

  for (let i = 1; i < table.rows[0].cells.length; i++) {
    newRow.insertCell();
  }
}

function addColumn(prompt) {
  const table = document.getElementById("gridTable");
  for (let i = 0; i < table.rows.length; i++) {
    if (i === 0) {
      table.rows[i].appendChild(createPromptCell(prompt));
    } else {
      table.rows[i].insertCell();
    }
    
  }
}

function runPrompts() {
  const table = document.getElementById("gridTable");
  if(localStorage.getItem('apiKey') === null || localStorage.getItem('apiKey').length < 1) {
      alert('Please enter your OpenAI API key');
      return;
  }
  for (let i = 1; i < table.rows.length; i++) {
    for (let j = 1; j < table.rows[0].cells.length; j++) {
      const prompt = table.rows[0].cells[j].firstChild.firstChild.value;
      const model = table.rows[0].cells[j].firstChild.lastChild.value;
      const variation = table.rows[i].cells[0].firstChild.value;
      if (prompt === "" || variation === "") continue;
      const output = prompt.replace("{{ variation }}", variation);
      table.rows[i].cells[j].setAttribute("data-prompt", output);
      OpenaiFetchAPI(localStorage.getItem('apiKey'), output, table.rows[i].cells[j], model);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const runButton = document.getElementById("runButton");
  runButton.addEventListener("click", runPrompts);
  console.log('hej')
  addRow();
  let startPrompt = "Create a title for a blog post about {{ variation }}";
  addColumn(startPrompt);
  addColumn();

  // Get the apiKey element
  var apiKeyInput = document.getElementById('apiKey');

  // Load saved value from localStorage if present
  if (localStorage.getItem('apiKey')) {
      apiKeyInput.value = localStorage.getItem('apiKey');
  }

  // Save apiKey value to localStorage on change event
  apiKeyInput.addEventListener('input', function() {
      localStorage.setItem('apiKey', apiKeyInput.value);
  });
});
