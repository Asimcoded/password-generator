const range = document.getElementById('range');
range.addEventListener("input",(e)=>{
    range.style.backgorund = `linear-gradient(to right, var(--accent) 0%,var(--accent) ${e.target.value}%,var(--skeleton))`
    console.log(e.target.value);
})