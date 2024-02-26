let name = "Джон";
let admin = name;

alert(admin);

const a = Number(prompt("Первое число", 1));
const b = Number(prompt("Второе число", 2));

alert(a + b);

for (let i = 2; i <= 10; i++) {
  if (i % 2 == 0) {
    alert( i );
  }
}
let m = 0;
while (m < 3) {
alert( `number ${m}!` );
m++;
}

let pr = 100;

while (pr <= 100) {
    alert("Введи число больше 100");
    pr = Number(prompt("Введи число", 101));
    if (pr <= 100) {
        alert("Ты фрик что-ли");
    }
    else {
        alert("готово");
        break;
    }
}

let n = 100;

nextPrime:
for (let i = 2; i <= n; i++) { 

  for (let j = 2; j < i; j++) { 
    if (i % j == 0) continue nextPrime; 
  }

  alert( i ); 
}