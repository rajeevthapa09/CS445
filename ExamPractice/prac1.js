console.log('start');

async function foo() {

    return 'done!';

}

 

async function bar() {

    console.log('inside bar - start');

    console.log(await foo()); 

    console.log('inside bar - end');

}

bar();

console.log('end');