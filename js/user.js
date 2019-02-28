const nameForm = document.querySelector('#nameForm')

const pwForm = document.querySelector('#pwForm')
const locaForm = document.querySelector('#locaForm')
let nameString = ""
let pwString = "user"
let locaString = "gugu street"


function nameEdit() {
    log("start edit")
    nameString = nameForm.querySelector("#nameValue").textContent
    log(nameString)
    const s =
        `<input class="form-control mr-sm-2" id="nameBar" type="text" placeholder="${nameString}">
            <button class="btn btn-secondary my-2 my-sm-0" onclick="nameCheck()" type="submit">
                <i class="fa fa-check"></i>
            </button>
            <button class="btn btn-secondary my-2 my-sm-0" onclick="nameCancel()" type="submit">
                <i class="fa fa-times"></i>
            </button>`
    nameForm.innerHTML = s
}


function nameCheck() {
    log("start check")
    const holdname = nameForm.querySelector("#nameBar").value
    log("namecheck: " + holdname)

    if (holdname !== "") {
        nameString = holdname
        log("namecheck: " + holdname)
        const s =
            `<span class="text-white" id="nameValue">${nameString}</span>
        <button class="btn btn-secondary my-2 my-sm-0" onclick="nameEdit()" type="submit">
          <i class="fa fa-wrench"></i>
        </button>`

        nameForm.innerHTML = s
    } else {
        log("empty")
        const s =
            `<input class="form-control mr-sm-2" id="nameBar" type="text" placeholder="${nameString}">
            <button class="btn btn-secondary my-2 my-sm-0" onclick="nameCheck()" type="submit">
                <i class="fa fa-check"></i>
            </button>
            <button class="btn btn-secondary my-2 my-sm-0" onclick="nameCancel()" type="submit">
                <i class="fa fa-times"></i>
            </button>`
        nameForm.innerHTML = s

    }



}


function nameCancel() {
    log("start cancel")
    log(nameString)
    const s =
        `<span class="text-white" id="nameValue">${nameString}</span>
        <button class="btn btn-secondary my-2 my-sm-0" onclick="nameEdit()" type="submit">
          <i class="fa fa-wrench"></i>
        </button>`

    nameForm.innerHTML = s
}


function pwEdit() {
    log("start pw edit")

    log(pwString)

    const showString = "*".repeat(pwString.length)
    const s =
        `<input class="form-control mr-sm-2" id="pwBar" type="password" placeholder="${showString}">
            <button class="btn btn-secondary my-2 my-sm-0" onclick="pwCheck()" type="submit">
                <i class="fa fa-check"></i>
            </button>
            <button class="btn btn-secondary my-2 my-sm-0" onclick="pwCancel()" type="submit">
                <i class="fa fa-times"></i>
            </button>`
    pwForm.innerHTML = s

}


function pwCheck() {
    log("start pw check")
    const holdpw = pwForm.querySelector("#pwBar").value

    log("pw check "+holdpw)
    if (holdpw.length >= 2) {
        pwString = holdpw

        log("namecheck: " + pwString)
        const showString = "*".repeat(pwString.length)
        const s =
            `<span class="text-white" id="pwValue">${showString}</span>
        <button class="btn btn-secondary my-2 my-sm-0" onclick="pwEdit()" type="submit">
          <i class="fa fa-wrench"></i>
        </button>`

        pwForm.innerHTML = s

    } else {
        log("less than 8 chars")
        const s =
            `<input class="form-control mr-sm-2" id="pwBar" type="password" placeholder="${showString}">
            <button class="btn btn-secondary my-2 my-sm-0" onclick="pwCheck()" type="submit">
                <i class="fa fa-check"></i>
            </button>
            <button class="btn btn-secondary my-2 my-sm-0" onclick="pwCancel()" type="submit">
                <i class="fa fa-times"></i>
            </button>`
        pwForm.innerHTML = s
    }

}

function pwCancel() {
    log("start cancel")
    log(pwString)

    const showString = "*".repeat(pwString.length)
    const s =
        `<span class="text-white" id="pwValue">${showString}</span>
        <button class="btn btn-secondary my-2 my-sm-0" onclick="pwEdit()" type="submit">
          <i class="fa fa-wrench"></i>
        </button>`

    pwForm.innerHTML = s



}




function locaEdit() {
    log("start loca edit")

    log(locaString)
    const s =
        `<input class="form-control mr-sm-2" id="locaBar" type="text" placeholder="${locaString}">
            <button class="btn btn-secondary my-2 my-sm-0" onclick="locaCheck()" type="submit">
                <i class="fa fa-check"></i>
            </button>
            <button class="btn btn-secondary my-2 my-sm-0" onclick="locaCancel()" type="submit">
                <i class="fa fa-times"></i>
            </button>`
    locaForm.innerHTML = s

}


function locaCheck() {
    log("start loca check")
    const holdloca = locaForm.querySelector("#locaBar").value

    log("loca check "+holdloca)
    if (holdloca.length >= 2) {
        locaString = holdloca

        log("namecheck: " + locaString)
        const s =
            `<span class="text-white" id="locaValue">${locaString}</span>
        <button class="btn btn-secondary my-2 my-sm-0" onclick="locaEdit()" type="submit">
          <i class="fa fa-wrench"></i>
        </button>`

        locaForm.innerHTML = s

    } else {
        log("less than 8 chars")
        const s =
            `<input class="form-control mr-sm-2" id="locaBar" type="text" placeholder="${locaString}">
            <button class="btn btn-secondary my-2 my-sm-0" onclick="locaCheck()" type="submit">
                <i class="fa fa-check"></i>
            </button>
            <button class="btn btn-secondary my-2 my-sm-0" onclick="locaCancel()" type="submit">
                <i class="fa fa-times"></i>
            </button>`
        locaForm.innerHTML = s
    }

}

function locaCancel() {
    log("start cancel")
    log(locaString)

    const s =
        `<span class="text-white" id="locaValue">${locaString}</span>
        <button class="btn btn-secondary my-2 my-sm-0" onclick="locaEdit()" type="submit">
          <i class="fa fa-wrench"></i>
        </button>`

    locaForm.innerHTML = s



}
