const displaySteps = (task) => {
  document.getElementById("steps").innerHTML = generateSteps(task);
};

function generateTasks(tasks) {
  return `
    <fieldset>
        <legend>Tasks</legend>
    
        ${tasks
          .map(
            (task, i) => `
            <div onclick="displaySteps(window.tasks[${i}])">
                <input type="radio" id="${task.name}" name="Tasks" data-type="task" ${i == 0 ? "checked" : ""}>
                <label for="${task.name}">${task.name}</label>
            </div>
        `
          )
          .join("")}
    </fieldset>
    `;
}

function generateSteps(task) {
  let { steps, name } = task;
  return `
<fieldset>
    <legend>Steps</legend>

    ${steps
      .map(
        (step, i) => `
        <div>
            <input type="radio" id="${name}_${i}" name="${name}" data-type="step" ${i == 0 ? "checked" : ""}>
            <label for="${name}_${i}"><b>Step ${i}</b>\n${JSON.stringify(step, null, 2)}</label>
        </div>
    `
      )
      .join("")}
</fieldset>
`;
}

function generateContext(context) {
  return `<fieldset>
  <legend>Context</legend>
  ${context
    .map(
      (obs, i) =>
        `
  <fieldset>
      <legend>${obs.name}</legend>
  
      ${obs.states
        .map(
          (state, i) => `
          <div>
              <input type="radio" id="${obs.name}_${i}" name="${obs.name}" data-type="context" ${
            i == 0 ? "checked" : ""
          }>
              <label for="${obs.name}_${i}">${state.name} => <b><i>${state.value}</b></i></label>
          </div>
      `
        )
        .join("")}
  </fieldset>
  `
    )
    .join("")}
  </fieldset>`;
}

function updateStatus() {
  let simulation = { context: [] };
  for (let el of document.querySelectorAll("input")) {
    if (!el.checked) continue;

    if (el.getAttribute("data-type") == "step") {
      let [t, s] = el.id.split("_");
      simulation.task = window.tasks.find(({ name }) => name == t).steps[s];
    }
    if (el.getAttribute("data-type") == "context") {
      let [c, s] = el.id.split("_");
      simulation.context.push(window.context.find(({ name }) => name == c).states[s]);
    }
  }

  console.log(simulation);
}

window.onload = async () => {
  let res = await fetch("http://localhost:3000/obs");
  let { tasks, context } = await res.json();

  window.tasks = tasks;
  window.context = context;

  const el_tasks = document.getElementById("tasks");
  const el_steps = document.getElementById("steps");
  const el_context = document.getElementById("context");

  el_tasks.innerHTML = generateTasks(tasks);
  el_steps.innerHTML = generateSteps(tasks[0]);
  el_context.innerHTML = generateContext(context);
};
