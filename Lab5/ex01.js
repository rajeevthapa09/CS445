
const isPrime = num => new Promise(function(resolve, reject){
   {
        for (let i = 2, s = Math.sqrt(num); i <= s; i++)
        if (num % i === 0) reject({prime: false});
    resolve({prime: true});
};
});

console.log("start");
isPrime(10)
.then(res => console.log(res))
.catch(err => console.error(err));
console.log("end");


// const isPrime = num => new Promise(function(resolve, reject){
//     setTimeout(function() {
//         for (let i = 2, s = Math.sqrt(num); i <= s; i++)
//         if (num % i === 0) reject({prime: false});
//     resolve({prime: true});
// }, 500);
// });

// console.log("start");
// isPrime(10)
// .then(res => console.log(res))
// .catch(err => console.error(err));
// console.log("end");

