let today = new Date();
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2, '0');
let date = String(today.getDate()).padStart(2,"0");
let day = `${year}-${month}-${date}`

// console.log(today);console.log(year);console.log(month);console.log(date);console.log(day);console.log(typeof(day));

// const currentDate = new Date().toISOString().split("T")[0];
// console.log(currentDate, typeof(currentDate))
