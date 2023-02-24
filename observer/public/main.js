import { generateFieldSet } from "./utils.js";

function generateTasks(tasks) {
  return generateFieldSet(
    tasks,
    (i) => `Tasks_${i}`,
    "Taches",
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
    (el, i) => `<b>Etape #${i}</b><span class="json">${el.prettyPrint()}</span>`
  );
}

function generateContext(context) {
  return `
  <fieldset>
    <legend>Contexte</legend>
    <div id="steps"></div>
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
  let simulation = [];
  for (let el of document.querySelectorAll("input")) {
    if (!el.checked) continue;

    if (el.getAttribute("data-type") == "step") {
      let [t, s] = el.id.split("_");
      let task = window.tasks.find(({ name }) => name == t);
      simulation.push({ name: task.name, ...task.steps[s], type: "task" });
    } else if (el.getAttribute("data-type") == "context") {
      let [c, s] = el.id.split("_");
      let context = window.context.find(({ name }) => name == c);
      let { name, value } = context.states[s];
      simulation.push({ name: context.name, description: name, value, type: "environment" });
    }
  }

  document.getElementById("current").innerHTML = `
  <fieldset id="current">
    <legend>Contexte actuel</legend>
    <div class="json">${simulation.prettyPrint()}</div>
  </fieldset>`;

  fetch("http://localhost:3000/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(simulation),
  });
}

window.onload = async () => {
  let res = await Promise.all([fetch("http://localhost:3000/tasks"), fetch("http://localhost:5000/context.json")]);
  let [tasks, context] = await Promise.all(res.map((r) => r.json()));

  window.tasks = tasks;
  window.context = context;

  const el_tasks = document.getElementById("tasks");
  const el_context = document.getElementById("context");
  const btn_update = document.getElementById("update");

  el_tasks.innerHTML = generateTasks(tasks);
  el_context.innerHTML = generateContext(context);
  document.getElementById("steps").innerHTML = generateSteps(tasks[0]);

  el_tasks.addEventListener("change", (el) => {
    document.getElementById("steps").innerHTML = generateSteps(tasks[el.target.id.split("_").pop()]);
  });

  btn_update.addEventListener("click", updateStatus);
};
