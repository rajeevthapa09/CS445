Array.prototype.removeDuplicateAsync = function() {
    let arr = this;
    new Promise(function(resolve, reject){
        let res = [...new Set(arr)];
        resolve(res);
    }).then(console.log);
}

console.log("start");
[4,1,5,7,2,3,1,4,6,5,2].removeDuplicateAsync();
console.log("end");

