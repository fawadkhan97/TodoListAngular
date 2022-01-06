let array = [
  {
    text: "qwerty",
    category: "office",
    priority: "low",
    dateAdded: "2022-01-06",
    isCompleted: true,
    id: 3,
  },
  {
    text: "fawad",
    category: "office",
    priority: "medium",
    dateAdded: "2022-01-05",
    isCompleted: true,
    id: 4,
  },
  {
    text: "mnb",
    category: "other",
    priority: "medium",
    dateAdded: "2022-01-05",
    isCompleted: false,
    id: 5,
  },
  {
    text: "asdsad",
    category: "personal",
    priority: "medium",
    dateAdded: "2022-01-05",
    isCompleted: false,
    id: 6,
  },
];
let newArray1 =[... new Set(array.map((task)=> task.category))];
let newArray = array.filter(
  (task, index, arr) =>
    arr.findIndex((arrtask) => arrtask.category === task.category) === index
);

console.log(newArray);
console.log(newArray1);

// console.log(array)
