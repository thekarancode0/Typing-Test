const keys = document.querySelectorAll(".key");
let isShiftPressed = false; 

// Detect key press
document.addEventListener("keydown", (event) => {
    const keyPressed = event.key;

    // Handle Shift key state
    if (keyPressed === "Shift") {
        isShiftPressed = true;
        return;
    }

    // Handle Backspace
    if (keyPressed === "Backspace") {
        return;
    }

    keys.forEach((key) => {
        key.style.backgroundColor = "";
    });

    keys.forEach((key) => {
        const keyText = key.textContent.trim();
        if (keyText.toLowerCase() === keyPressed.toLowerCase() ||
            (keyPressed === " " && key.classList.contains("space"))) {

            const color = ["#CB9DF0","#FF9C73","#133E87","#FFB38E","#7AB2D3","#FEEC37","#FF9D3D","#024CAA","#006BFF"]
            const randIndex = Math.floor(Math.random() * color.length);
            key.style.backgroundColor = color[randIndex];

            if(keyPressed === " " && key.classList.contains("space")){
                randomWords();
            }

        }
    });
});

// Reset Shift state on key release
document.addEventListener("keyup", (event) => {
    if (event.key === "Shift") {
        isShiftPressed = false;
    }
});

