var tape = "{[0]a}"
var rules = []
var rulesArray = [
    {state: "a", onTape: [
        {currentValue: 0, replace: "1", newState: "a", goTo: "l"},
        {currentValue: 1, replace: "1", newState: "a", goTo: "l"}]}
]
var checkHalt = /H/

function newTape() {
    document.getElementById("tape").innerHTML = tape
    document.getElementById("tapeLenght").innerHTML = tape.replace(/[A-z2-9{}\[\]]/g, "").length
}

function stepForward(stepCount) {
    for (let i = 0; i < stepCount; i++) {
        makeAStep()
    }
    newTape()
}

function singleStep() {
    if (document.getElementById('eternalGoing').checked == true) {
        stepForward(document.getElementById('stepCount').value)
        newTape()
    }
}

function makeAStep() {
    let prevTape = tape
    let i = 0
    if (checkHalt.test(tape)) {
        alert("Tape halted.")
        return
    } else {
        while (prevTape == tape) {
            const element = rules[i];
                tape = tape.replace(element[0], element[1])
                i++
        }
        document.getElementById("stepsSoFar").innerHTML++
    }
}

function changeRules() {
    rulesArray = JSON.parse(document.getElementById("newRules").value)
    writeRules()
    compileRules()
    resetTape()
}

function resetRules() {
    rulesArray = [{state: "a", onTape: [{currentValue: 0, replace: "1", newState: "a", goTo: "l"},{currentValue: 1, replace: "1", newState: "a", goTo: "l"}]}]
    writeRules()
    compileRules()
    resetTape()
}

function compileRules() {
    rulesArray.forEach(element => {
        let currentState = element.state
        element.onTape.forEach(element => {
            if (element.goTo == "r") {
                rules.push(["0[" + element.currentValue + "]" + currentState, "[0]" + element.newState + element.replace])
                rules.push(["1[" + element.currentValue + "]" + currentState, "[1]" + element.newState + element.replace])
                rules.push(["{[" + element.currentValue + "]" + currentState, "{[0]" + element.newState + element.replace])
            } else if (element.goTo == "l") {
                rules.push(["[" + element.currentValue + "]" + currentState + "0", element.replace + "[0]" + element.newState])
                rules.push(["[" + element.currentValue + "]" + currentState + "1", element.replace + "[1]" + element.newState])
                rules.push(["[" + element.currentValue + "]" + currentState + "}", element.replace + "[0]" + element.newState + "}"])
            } else if (element.goTo == "H") {
                rules.push(["[" + element.currentValue + "]" + currentState + "0", "[0]H"])
                rules.push(["[" + element.currentValue + "]" + currentState + "1", "[1]H"])
                rules.push(["[" + element.currentValue + "]" + currentState + "}", "[0]H}"])
            } else {
                alert("goTo value is not set correctly. Accepted values are: l, r, H.")
                throw new Error("goTo value is not set correctly. Accepted values are: l, r, H.")
            }
        })
    })
}

function writeRules() {
    let tableText = ""
    rulesArray.forEach(element => {
        tableText += "<tr><td rowspan='2'>" + element.state + "</td><td>0</td><td>" + element.onTape[0].replace + "</td><td>"
        + element.onTape[0].newState + "</td><td>" + element.onTape[0].goTo + "</td></tr><tr><td>1</td><td>" 
        + element.onTape[1].replace + "</td><td>" + element.onTape[1].newState + "</td><td>" + element.onTape[1].goTo + "</td></tr>"
    })
    document.getElementById("currentRules").innerHTML = tableText

}

function resetTape() {
    let reg = /[0-1H{}!@#$%^&*()\[\]]/g
    if (reg.test(document.getElementById("startingState").value)) {
        document.getElementById("startingState").value = "a"
        alert("Unable to reset. State value not set correctly. Unaccepted values are: 0, 1, H, !, @, #, $, %, ^, &, *,  {, }, (, ), [, ].")
    } else {
        tape = "{[0]" + document.getElementById("startingState").value + "}"
        newTape()
        document.getElementById("stepsSoFar").innerHTML = 0
    }
}

function cropTape() {
    tape = tape.replace(/{0*/g, "{")
    tape = tape.replace(/0*}/g, "}")
    newTape()
}

function addTape() {
    tape = tape.replace(/{/g, "{0")
    tape = tape.replace(/}/g, "0}")
    newTape()
}