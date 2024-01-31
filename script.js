const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

let dropdowns = document.querySelectorAll(".dropdown select")
let btn = document.querySelector(".btn")
let fromCur = document.querySelector(".from select")
let toCur = document.querySelector(".to select")


for (const select of dropdowns) {
    for (const curCode in countryList) {
        let newOption = document.createElement("option")
        newOption.innerText = curCode
        newOption.value = curCode
        if (select.name === "from" && curCode === "USD") {
            newOption.selected = "selected"
        } else if (select.name === "to" && curCode === "INR") {
            newOption.selected = "selected"
        }
        select.append(newOption)
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
        // console.log(evt.target.value)
    })
}

const updateFlag = (element) => {
    let curCode = element.value
    let countryCode = countryList[curCode]
    // console.log(countryCode)
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newsrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault()
    let amount = document.querySelector("input")
    let amtVal = amount.value
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1
        amount.value = "1"
    }

    const URL = `${BASE_URL}/${fromCur.value.toLowerCase()}/${toCur.value.toLowerCase()}.json`
    let respones = await fetch(URL)
    let data = await respones.json()
    let rate = data[toCur.value.toLowerCase()]
    let finalVal = rate * amtVal

    let msg = document.querySelector(".msg")
    msg.innerText = `${amtVal} ${fromCur.value} = ${finalVal} ${toCur.value}`
})
