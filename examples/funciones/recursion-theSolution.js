// clean the console from node
//process.stdout.write('\033c');

var input = ["dist"];

var config = {
  "dist":   ["build", "deploy"],
  "build":  ["js", "css", "version-rev"],
  "js":     ["lint", "uglify"],
  "css":    ["sass", "css-min"]
};

var tasks = [];

getTasks(input);

function getTasks(input){
  input.forEach(function(task){
    if (config[task]) {
      getTasks(config[task]);
    }
    else {
      tasks.push(task);
    }
  })
}

console.log (tasks); // ["lint", "uglify", "sass", "css-min", "version-rev", "deploy"]