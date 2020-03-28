// const log = () => {
//     console.log(arguments);
// };

// log('one', 'two', 'three');


const months = ['Jan', 'March', 'April', 'June'];
// months.splice(1, 0);
months.splice(4, 0, 'May');
// replaces 1 element at index 4
console.log(months);