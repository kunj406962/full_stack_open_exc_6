const express= require('express')
const morgan=require('morgan')
const app=express()
app.use(express.json())

morgan.token('content',(request)=>{
    return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

let phoneBook=[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/',(request, response )=>{
    response.send('<h1>This is a backend demo for the phonebook app</h1>')
})

app.get('/info',(request, response )=>{
    const now= new Date()
    response.send(
        `<p>Phonebook has info for ${phoneBook.length} people</p>
        <p> ${now} </p>`)
    
})

app.get('/api/persons',(request, response )=>{
    response.json(phoneBook)
})

app.get('/api/persons/:id',(request, response )=>{
    const id= request.params.id
    const phone=phoneBook.find(phone=>phone.id==id)
    if (phone){
        response.json(phone)
    }
    else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id',(request, response )=>{
    const id= request.params.id
    const phone=phoneBook.filter(phone=>phone.id!==id)
    response.status(204).end()
})

app.post('/api/persons',(request, response )=>{
    const newPhone= request.body
    if(!newPhone.name||!newPhone.number){
        return response.status(404).json({error: 'name or phone number missing'})
    }
    else if(phoneBook.find(phone=>phone.name===newPhone.name)){
        return response.status(409).json({error: 'name already exists'})
    }
    else if(phoneBook.find(phone=>phone.number===newPhone.number)){
        return response.status(409).json({error: 'number already exists'})
    }
    else{
        const id= Math.round(Math.random()*(999999999+1)+1)
        const phone={
            id: id,
            name: newPhone.name,
            number:newPhone.number
        }
        phoneBook=phoneBook.concat(phone)
        response.status(201).json(phone)
    }
})


const PORT=process.env.PORT||3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})