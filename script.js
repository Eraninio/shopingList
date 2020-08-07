const textInput = document.getElementById("textInput");
const addButton = document.getElementById("addButton");
const sectionUnchecked = document.getElementById("unchecked");
const sectionChecked = document.getElementById("checked");
var counter;
function lastId(data) {
    counter = parseInt(data[data.length - 1].id) + 1;
}

//פעולה שמוסיפה מוצר ל HTML
function addItem(obj) {
    const itemContainer = document.createElement("div"); //מסגרת לכל מוצר
    const itemText = document.createElement("div"); //הטקסט של המוצר
    const deleteButton = document.createElement("button");
    const checkBox = document.createElement("input");
    const editButton = document.createElement("button");

    itemContainer.className = "itemContainer";
    itemText.className = "itemText";
    deleteButton.className = "deleteButton";
    checkBox.className = "checkBox";
    editButton.className = "editButton";

    itemText.innerHTML = obj.productName;

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa fa-trash";
    deleteIcon.setAttribute("aria-hidden", "true");
    deleteButton.appendChild(deleteIcon);
    const editIcon = document.createElement("i");
    editIcon.className = "fa fa-pencil-square-o";
    editIcon.setAttribute("aria-hidden", "true");
    editButton.appendChild(editIcon);
    checkBox.setAttribute("type", "checkbox");

    if (obj.check === "yes") {
        checkBox.checked = true;
    } else {
        checkBox.checked = false;
    }

    itemContainer.append(checkBox, itemText, editButton, deleteButton);
    if (obj.check === "yes") {
        sectionChecked.appendChild(itemContainer);
    } else {
        sectionUnchecked.appendChild(itemContainer);
    }
    //פעולה שמוחקת מוצר
    deleteButton.onclick = function () {
        axios.delete(`http://localhost:3000/products/${obj.id}`, obj);
        if (obj.check === "yes") {
            sectionChecked.removeChild(itemContainer);
        } else {
            sectionUnchecked.removeChild(itemContainer);
        }
    };
    //פעולה שעורכת שם מוצר על ידי לחיצה על אדיט
    editButton.onclick = function () {
        swal({
            title: `Change product "${obj.productName}" to:`,
            content: "input",
            buttons: {
                cancel: true,
                confirm: "Submit",
            },
        }).then((val) => {
            if (val) {
                let newObj = obj;
                newObj.productName = val;
                axios.put(`http://localhost:3000/products/${obj.id}`, newObj);
                swal({
                    title: "Thanks!",
                    text: "You typed: " + val,
                    icon: "success",
                }).then((val) => {
                    location.reload();
                });
            }
        });
    };
    //פעולה שעורכת שם מוצר על ידי לחיצה על השם
    itemText.onclick = function () {
        swal({
            title: `Change product "${obj.productName}" to:`,
            content: "input",
            buttons: {
                cancel: true,
                confirm: "Submit",
            },
        }).then((val) => {
            if (val) {
                let newObj = obj;
                newObj.productName = val;
                axios.put(`http://localhost:3000/products/${obj.id}`, newObj);
                swal({
                    title: "Thanks!",
                    text: "You typed: " + val,
                    icon: "success",
                }).then((val) => {
                    location.reload();
                });
            }
        });
    };

    checkBox.onclick = async function () {
        await axios.delete(`http://localhost:3000/products/${obj.id}`, obj);
        let newObj = obj;
        if (checkBox.checked) {
            newObj.check = "yes";
            sectionUnchecked.removeChild(itemContainer);
        } else {
            newObj.check = "no";
            sectionChecked.removeChild(itemContainer);
        }
        newObj.id = counter.toString();
        await axios.post("http://localhost:3000/products", newObj);
        counter++;
        addItem(newObj);
    };
}

//פעולה שטוענת מידע בפעם הראשונה
//מגדירה גם את הקאונטר בשביל האיידי
async function loadData() {
    const { data } = await axios.get("http://localhost:3000/products");
    lastId(data);
    data.forEach((item) => {
        addItem(item);
    });
}
loadData();

//events
addButton.addEventListener("click", addItemEvent);
textInput.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        addItemEvent();
    }
});

//פעולה שמוסיפה את המוצר גם בדטהבייס וגם בטופס
function addItemEvent() {
    let inputValue = textInput.value;
    if (inputValue != "") {
        textInput.value = "";
        const obj = {
            id: counter.toString(),
            productName: inputValue,
            check: "no",
        };
        axios.post("http://localhost:3000/products", obj);
        addItem(obj);
        counter++;
    } else {
        Swal.fire({
            icon: "warning",
            text: "The text box is empty",
        });
    }
    textInput.focus();
}
