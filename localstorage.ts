// Define the shape of our User object
interface User {
    id: number;
    name: string;
}

// Select DOM elements with specific types
const nameInput = document.getElementById('userName') as HTMLInputElement;
const idInput = document.getElementById('userId') as HTMLInputElement;
const actionBtn = document.getElementById('actionBtn') as HTMLButtonElement;
const displayArea = document.getElementById('displayArea') as HTMLDivElement;

const STORAGE_KEY = 'my_ts_data';

// --- 1. READ ---
function getStoredData(): User[] {
    const rawData = localStorage.getItem(STORAGE_KEY);
    return rawData ? JSON.parse(rawData) : [];
}

// --- 2. CREATE & UPDATE ---
function handleSave(): void {
    const name = nameInput.value.trim();
    const id = idInput.value;
    let users: User[] = getStoredData();

    if (!name) {
        alert("Please enter a name");
        return;
    }

    if (id) {
        // Update existing user
        users = users.map(u => u.id === Number(id) ? { ...u, name } : u);
        idInput.value = "";
        actionBtn.innerText = "Add User";
    } else {
        // Create new user
        const newUser: User = {
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
function deleteItem(id: number): void {
    const users: User[] = getStoredData().filter(user => user.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    renderList();
}

// --- 4. EDIT ---
function editItem(id: number, name: string): void {
    nameInput.value = name;
    idInput.value = id.toString();
    actionBtn.innerText = "Update Now";
}

// --- 5. RENDER ---
function renderList(): void {
    const users: User[] = getStoredData();
    displayArea.innerHTML = ""; 

    users.forEach(user => {
        const item = document.createElement('div');
        item.style.marginBottom = "10px";
        item.innerHTML = `
            <strong>${user.name}</strong> 
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;

        // Attach events to buttons (Cleaner than inline onclick in TS)
        item.querySelector('.edit-btn')?.addEventListener('click', () => editItem(user.id, user.name));
        item.querySelector('.delete-btn')?.addEventListener('click', () => deleteItem(user.id));
        
        displayArea.appendChild(item);
    });
}

// Initialize
actionBtn.addEventListener('click', handleSave);
renderList();