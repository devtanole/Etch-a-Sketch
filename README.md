# Etch-a-Sketch

My take on an Etch-a-Sketch app, a dom-manipulation project courtesy of The Odin Project (https://www.theodinproject.com/). Initial features were color mode (user selected color), rainbow mode (randomized on every mousedown event on the grid), eraser mode and a button that clears the entire grid. Users may also choose any grid size from 4x4 to 64x64. To make this project my own and worth being seen, I decided to utilize local storage to allow users to save their creations. Using a select, users may also load previous creations to either add to it and make changes or use the delete button to get rid of their work. 

---

## 🧩 Core Features

- **🎨 Color Mode** – Users can choose any color to draw.
- **🌈 Rainbow Mode** – Random colors are applied on every mousedown.
- **🧽 Eraser** – Draw with white to "erase" grid cells.
- **🗑️ Clear Grid** – Resets the entire grid instantly.
- **🔲 Custom Grid Size** – Choose from 4×4 up to 64×64 grids.

---

## 💾 Extended Functionality

To take this project beyond the original scope, I added local storage support so users can save and return to their creations:

- **💾 Save Drawings** – Save sketches by name using `localStorage`.
- **📂 Load Drawings** – Select from previously saved drawings and continue editing.
- **❌ Delete Drawings** – Remove unwanted creations.
- **📝 Overwrite Prompts** – Prevent accidental data loss by asking before overwriting a saved name.

---

## 🛠️ Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- `localStorage` (for persistent browser-side storage)

---

## 🧠 What I Learned

- DOM manipulation and event handling
- State management using JavaScript
- Planning logic using pseudocode
- Improving UX with visual feedback and save prompts
- Persisting user data with `localStorage`

## Screenshots

<img width="1792" height="1120" alt="Screenshot 2025-07-18 at 11 01 45 PM" src="https://github.com/user-attachments/assets/d1e1ebce-c7e6-4da4-8c85-2d22341c06e2" />


---
