const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    Titel: { type: String, required: true, maxLength: 50 },
    Beschreibung: { type: String, maxLength: 200 },
    Erstellungsdatum: { 
        type: Date,
        get: formatDate,
        // required: true,
        default: Date.now
    },
    Fälligkeitsdatum: { type: Date,
        get: formatDate,
        default: null
    },
    Status: {
        type: String,
        // required: true,
        enum: ["offen", "in Bearbeitung", "erledigt", "verschoben"],
        default: "offen",
    },
});

// Funktion zum Formatieren des Datums
function formatDate(date) {
    if (!date) return null;

    // Formatierung des Datums (Beispiel: DD.MM.YYYY)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const time1 = String(date.getHours());
    const time2 = String(date.getMinutes());
    const time3 = String(date.getSeconds());
    return `${day}.${month}.${year}--${time1}:${time2}:${time3}`;
}

const todo = mongoose.model('todo-list', todoSchema, 'todo');

module.exports = {todo:todo, formatDate:formatDate};
