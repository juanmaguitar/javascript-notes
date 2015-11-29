process.stdout.write("\u001b[2J\u001b[0;0H");

let countDownFrom = (num)  => {
  if (num === 0) return;
  console.log(num);
  countDownFrom(num - 1)
}

countDownFrom(10)