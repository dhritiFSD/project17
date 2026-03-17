var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Select DOM elements with specific types
var nameInput = document.getElementById('userName');
var idInput = document.getElementById('userId');
var actionBtn = document.getElementById('actionBtn');
var displayArea = document.getElementById('displayArea');
var STORAGE_KEY = 'my_ts_data';
// --- 1. READ ---
function getStoredData() {
    var rawData = localStorage.getItem(STORAGE_KEY);
    return rawData ? JSON.parse(rawData) : [];
}
// --- 2. CREATE & UPDATE ---
function handleSave() {
    var name = nameInput.value.trim();
    var id = idInput.value;
    var users = getStoredData();
    if (!name) {
        alert("Please enter a name");
        return;
    }
    if (id) {
        // Update existing user
        users = users.map(function (u) { return u.id === Number(id) ? __assign(__assign({}, u), { name: name }) : u; });
        idInput.value = "";
        actionBtn.innerText = "Add User";
    }
    else {
        // Create new user
        var newUser = {
            id: Date.now(),
            name: name
        };
        users.push(newUser);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    nameInput.value = "";
    renderList();
}
// --- 3. DELETE ---
function deleteItem(id) {
    var users = getStoredData().filter(function (user) { return user.id !== id; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    renderList();
}
// --- 4. EDIT ---
function editItem(id, name) {
    nameInput.value = name;
    idInput.value = id.toString();
    actionBtn.innerText = "Update Now";
}
// --- 5. RENDER ---
function renderList() {
    var users = getStoredData();
    displayArea.innerHTML = "";
    users.forEach(function (user) {
        var _a, _b;
        var item = document.createElement('div');
        item.style.marginBottom = "10px";
        item.innerHTML = "\n            <strong>".concat(user.name, "</strong> \n            <button class=\"edit-btn\">Edit</button>\n            <button class=\"delete-btn\">Delete</button>\n        ");
        // Attach events to buttons (Cleaner than inline onclick in TS)
        (_a = item.querySelector('.edit-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return editItem(user.id, user.name); });
        (_b = item.querySelector('.delete-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return deleteItem(user.id); });
        displayArea.appendChild(item);
    });
}
// Initialize
actionBtn.addEventListener('click', handleSave);
renderList();
