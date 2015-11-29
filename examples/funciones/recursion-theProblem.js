var input = ["dist"];

var config = {
  "dist":   ["build", "deploy"],
  "build":  ["js", "css", "version-rev"],
  "js":     ["lint", "uglify"],
  "css":    ["sass", "css-min"]
};

var tasks = [];

input.forEach(function(task) {
  if (config[task]) {
    config[task].forEach(function(task){
      if (config[task]) {
        config[task].forEach(function(task){
          if (config[task]) {
            config[task].forEach(function(task){
              tasks.push(task);
            });
          }
          else {
            tasks.push(task);
          }
        });
      }
      else {
        tasks.push(task);
      }
    })
  }
  else {
    tasks.push(task);
  }
})

console.log (tasks); // ["lint", "uglify", "sass", "css-min", "version-rev", "deploy"]