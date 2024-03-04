m1 = [1, 2, 3];


console.log(Math.max(...m1) - Math.min(...m1));


m2 = [6, 6, 7, 8];

console.log(new Set(m2));

m3 = [
    {id: 1, idDone: true}, 
    {id: 2, idDone: false},
    {id: 3, idDone: true}
];

console.log(m3.filter((element) => element.idDone));

const f = (array, num) => {
    return array.filter((element) => element > num);
} 
console.log(f([1, 4, 6, 3, 2], 2));  //[4, 6, 3]


const f2 = (array) => array.flat(Infinity);
console.log(f2([1, 4, [34, 1, 20], [6, [6, 12, 8], 6]]) );  // -> 
 //[1, 4, 34, 1, 20, 6, 6, 12, 8, 6]


 const findPairs = (array) => {
    const pairs = new Set();
    for (let i = 0; i < array.length; i++)
        for (let j = i + 1; j < array.length; j++)
            if (array[i] + array[j] == 0){
                let pair;

                if (!pairs.has(`${array[i]}-${array[j]}`))
                    pairs.add(`${array[i]}-${array[j]}`);
            }
                
    console.log(pairs.size);
 }

findPairs([-7, 12, 4, 6, -4, -12, 0]) // -> 2 
findPairs([-1, 2, 4, 7, -4, 1, -2]) // -> 3
findPairs([-1, 1, 0, 1]) // -> 1
findPairs([-1, 1, -1, 1]) //-> 2
findPairs([1, 1, 1, 0, -1]) //-> 1
findPairs([0, 0]) //-> 1 
findPairs([]) //-> 0 

console.log("------------------")
const findPairs2 = (array) => {
    const pairs = new Set();
    for (let i = 0; i < array.length; i++)
        for (let j = i + 1; j < array.length; j++)
            for (let k = j + 1; k < array.length; k++)
                if (array[i] + array[j] + array[k] == 0){
                    let pair;

                    if (!pairs.has(`${array[i]}-${array[j]}-${array[k]}`))
                        pairs.add(`${array[i]}-${array[j]}-${array[k]}`);
            }
                
    console.log(pairs.size);
 }

findPairs2([-7, 12, 4, 6, -4, -12, 0]) // -> 2 
findPairs2([-1, 2, 4, 7, -4, 1, -2]) // -> 3
findPairs2([-1, 1, 0, 1]) // -> 1
findPairs2([-1, 1, -1, 1]) //-> 2
findPairs2([1, 1, 1, 0, -1]) //-> 1
findPairs2([0, 0]) //-> 1 
findPairs2([]) //-> 0 