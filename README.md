# 📝 Smart Todo App
A feature-rich todo list web app with multiple lists, due dates, local storage, and task management. Built with vanilla HTML, CSS, and JavaScript.
*🔗 Live Demo:* https://salmanraju-07.github.io/SCT_WD_2/
### *✨ Features*
- *Multiple Lists* - Create, switch, and delete custom lists like Personal, Work, etc.
- *Task Management* - Add, edit, delete, and mark tasks as complete
- *Due Dates & Time* - Set deadlines with date + time picker
- *Overdue Detection* - Tasks past deadline are auto-highlighted in red
- *Smart Sorting* - Incomplete tasks first, then sorted by due date
- *Live Stats* - Shows total, completed, and active task count per list
- *Local Storage* - All data persists in browser. No data loss on refresh
- *Inline Editing* - Click edit icon to modify tasks without popups
- *Empty States* - Clean UI when no tasks/lists exist
- *Responsive Design* - Mobile-first layout with CSS Grid
### *🛠️ Built With*
- *HTML5* - Semantic structure
- *CSS3* - Flexbox, Grid, CSS variables, Media queries
- *JavaScript* - LocalStorage API, Date handling, Array methods, DOM manipulation
### *📚 Key Learnings*
1. *Data Persistence* - Using `localStorage` + `JSON.parse/stringify` to save complex nested data
2. *State Management* - Managing `currentListId` and `editingTaskId` without frameworks
3. *Date Comparison* - Detecting overdue tasks with `new Date()` and timestamps
4. *Dynamic Rendering* - Rebuilding lists/tasks UI on every data change
5. *Event Delegation* - Using `onclick` and `event.stopPropagation()` for nested clicks
6. *UX Details* - Auto-focus edit inputs, Enter key shortcuts, confirm before delete
### *🚀 Getting Started*
1. Clone the repository:
git clone https://github.com/salmanraju-07/SCT_WD_2.git
2. Open `index.html` in your browser
3. Start adding lists and tasks. Data saves automatically
### *📂 File Structure*
SCT_WD_2/
├── index.html    # App structure + layout
├── style.css     # Styling + responsive design
├── script.js     # All app logic + localStorage
└── README.md     # Documentation
### *🎯 How It Works*
1. *Lists are stored as array* - Each list has `id`, `name`, and `tasks[]`
2. *Tasks sort dynamically* - Incomplete first, then by `dateTime` ascending
3. *Stats update live* - `updateStats()` runs after every data change
4. *Overdue check* - Compares `task.dateTime` with `new Date()` on render
### *🎯 Future Enhancements*
- [ ] Drag & drop to reorder tasks
- [ ] Priority levels: High/Medium/Low
- [ ] Search/filter tasks
- [ ] Dark mode toggle
- [ ] Export lists to JSON/CSV
- [ ] Task reminders/notifications
### *👨‍💻 Author*
*Salman Raju*  
GitHub: [@salmanraju-07](https://github.com/salmanraju-07)

---

*⭐ If this helped you, star the repo!*  
This is Task 4 of my Web Development series. Built to practice CRUD operations and localStorage.

---
