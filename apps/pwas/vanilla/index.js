const container = document.querySelector(".container")

const showCards = () => {
    let output = ""
    for (i = 0; i < 30; i++) {
        output += `
                <div class="card">
                    <span><strong>${i}</strong></span>
                </div>
                `
    }
    container.innerHTML = output
}

document.addEventListener("DOMContentLoaded", showCards);

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}
