const { response } = require('express')
const mongoose=require('mongoose')
if (process.argv.length<3){
    console.log('You are missing either email or password')
    process.exit(1)
}

const password=process.argv[2]
const newName=process.argv[3]
const number=process.argv[4]
const url=`mongodb+srv://kunj:${password}@cluster0.hxb9ezn.mongodb.net/PhoneBookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phoneBookSchema=new mongoose.Schema({
    name: String,
    phone: String
})

const PhoneBook= mongoose.model('PhoneBook', phoneBookSchema)

const phonebook= new PhoneBook({ 
    name:newName,
    phone: number}
)

phonebook.save().then(response=>{
    console.log(`added ${newName} number ${number} to phonebook`)
    mongoose.connection.close()
})