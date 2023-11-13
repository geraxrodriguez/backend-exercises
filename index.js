const express = require('express')
const app = express()
app.use(express.json())


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res)=>{
    const formattedJSON = JSON.stringify(persons, null, 2);
    res.header('Content-Type', 'application/json');
    res.send(formattedJSON);
    // res.json(persons)
})

app.get('/api/info', (req, res)=>{
    const currentdate = new Date(); 
    const datetime = currentdate.getDate() + "/"
    + (currentdate.getMonth()+1)  + "/" 
    + currentdate.getFullYear() + " @ "  
    + currentdate.getHours() + ":"  
    + currentdate.getMinutes() + ":" 
    + currentdate.getSeconds();
    
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${datetime}</p>`)
})

app.get('/api/persons/:id',(req, res)=>{
    const id = Number(req.params.id) // gets id from URL
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    person = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})


const generateId = () => { return persons.length + 1 }

app.post('/api/persons', (req, res)=>{
    const body = req.body

    if (!body.name) { // if body is empty, then return error message
        return res.status(400).json({
            error: 'name missing'
        })
    } 
    else if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }

    for (let i = 0; i < persons.length; i++){
        if (persons[i].name === body.name){
            return res.status(400).json({
                error: 'name must be unique'
            })
        }
    }
    const newPerson = {
        id: generateId(), // Using generateId to get a unique id
        name: body.name,
        number: body.number
    };

    persons = persons.concat(newPerson) // add new person
    res.json(persons)
})

const PORT = 3001   // declare port #
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})    // binding server to post #