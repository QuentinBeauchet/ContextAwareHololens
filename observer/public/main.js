import { generateFieldSet } from "./utils.js";

function generateTasks(tasks) {
  return generateFieldSet(
    tasks,
    (i) => `Tasks_${i}`,
    "Tasks",
    "task",
    (el) => el.name
  );
}

function generateSteps(task) {
  return generateFieldSet(
    task.steps,
    (i) => `${task.name}_${i}`,
    task.name,
    "step",
    (el, i) => `<b>Step ${i}</b><span class="json">${el.prettyPrint()}</span>`
  );
}

function generateContext(context) {
  return `
  <fieldset>
    <legend>Context</legend>
    ${context
      .map((obs) =>
        generateFieldSet(
          obs.states,
          (i) => `${obs.name}_${i}`,
          obs.name,
          "context",
          (el) => `${el.name} => <b><i>${el.value}</i></b>`
        )
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
      let task = window.tasks.find(({ name }) => name == t);
      simulation.task = { name: task.name, ...task.steps[s] };
    } else if (el.getAttribute("data-type") == "context") {
      let [c, s] = el.id.split("_");
      let context = window.context.find(({ name }) => name == c);
      let { name, value } = context.states[s];
      simulation.context.push({ name: context.name, description: name, value });
    }
  }

  document.getElementById("current").innerHTML = `
  <fieldset id="current">
    <legend>Current</legend>
    <div class="json">${simulation.prettyPrint()}</div>
  </fieldset>`;

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
  const btn_update = document.getElementById("update");

  el_tasks.innerHTML = generateTasks(tasks);
  el_steps.innerHTML = generateSteps(tasks[0]);
  el_context.innerHTML = generateContext(context);

  el_tasks.addEventListener("change", (el) => {
    el_steps.innerHTML = generateSteps(tasks[el.target.id.split("_").pop()]);
  });

  btn_update.addEventListener("click", updateStatus);
};
