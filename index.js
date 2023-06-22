const express = require('express');
const mongoose = require("mongoose");
const app = express();
const chalk = require('chalk');
const log = console.log;
app.use(express.json());

//Importiere das todo Model
const todo = require('./todoModel');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Universator:FAzG3CxIVhPFl1hS@cluster0.uxaphon.mongodb.net/todo-list?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
console.log(chalk.bgCyan('MongoDB "todo-list" connected...'));
})
.catch(err => log(err));

app.get('/', (req, res) => {
res.send('<h1> Was an Aufgaben übrig bleibt!');
});
app.use((req, res, next) => { const now = new Date().toISOString();
    log(now);
    next();
});
// GET: Alle Aufgaben abrufen
app.get('/tasks', async (req, res) => {
try {
    const tasks = await todo.find();
    res.json(tasks);
} catch (error) {
    res.status(500).json({ message: error.message });
}
});

// POST: Eine neue Aufgabe erstellen
// app.post('/tasks', async (req, res) => {
//     const Task = new todo({
//         Titel: req.body.title,
//         Beschreibung: req.body.description,
//         Fälligkeitsdatum: req.body.dueDate,
//         Status: req.body.status
//     });

//   try {
//     const newTask = await Task.save();
//     res.status(201).json(newTask);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// module.exports = router;
// POST tasks hinzufügen
app.post('/tasks', (req, res, next) => {
    const task = new todo({
        Titel: req.body.Titel,
        Beschreibung: req.body.Beschreibung,
        Fälligkeitsdatum: req.body.Fälligkeitsdatum,
        Status: req.body.Status
    });
    task.save()
        .then(savedTask => {
        res.json(savedTask);
        log(savedTask);
    })
        .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Irgendwas ist schief gelaufen!' });
    });
});




const PORT = process.env.PORT || 666;
app.listen(PORT, () => log(chalk.blue.bgRed.bold(`Euer Diener erwartet Eure Befehle auf Portal ${PORT} Meister`)));



