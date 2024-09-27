const allcheck = document.querySelectorAll(".check");
const inputfeilds = document.querySelectorAll(".goalin");
const error = document.querySelector(".error");
const prgl = document.querySelector(".prgl");
const progresbar = document.querySelector(".progressbar");
const progres = document.querySelector(".progress");
const allgoals = JSON.parse(localStorage.getItem("allgoals")) || {
    first:{
        name:'',
        completed:false,
    },
    second:{
        name:'',
        completed:false,
    },
    third:{
        name:'',
        completed:false,
    },
     four:{
        name:'',
        completed:false,
    }
};
let completedco=Object.values(allgoals).filter((goal)=>goal.completed).length
const allqot=[
    'Raise the bar by completing your goals!',
    'Well begun is half done! ',
    'Just a step away,keep going!',
    'Whoa! You just completed all the goals, time to chill :D',
]
progres.style.width = `${completedco/inputfeilds.length*100}%`;
allcheck.forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
        const allgoalsadded = [...inputfeilds].every((input) => {
            return input.value;
        });
        if (allgoalsadded) {
            checkbox.parentElement.classList.toggle("completed");
            const inputt = checkbox.nextElementSibling.id;
            allgoals[inputt].completed = !allgoals[inputt].completed;
            completedco=Object.values(allgoals).filter((goal)=>goal.completed).length
            progres.style.width = `${completedco/inputfeilds.length*100}%`;
            
            progres.firstElementChild.innerText=`${completedco}/${inputfeilds.length} completed`
            prgl.innerText=allqot[completedco]
            localStorage.setItem("allgoals", JSON.stringify(allgoals));
        } else {
            progresbar.classList.add("show");
        }
    });
});
progresbar.classList.remove("show");

inputfeilds.forEach((input) => {
    input.value = allgoals[input.id].name;
    if (allgoals[input.id].completed) {
        input.parentElement.classList.add("completed");
    }
    input.addEventListener("focus", () => {
        progresbar.classList.remove("show");
    });
    input.addEventListener("input", (e) => {
        if (allgoals[input.id].completed) {
            input.value=allgoals[input.id].name
            return
        }
        allgoals[input.id].name = input.value;
        localStorage.setItem("allgoals", JSON.stringify(allgoals));
    });
});
