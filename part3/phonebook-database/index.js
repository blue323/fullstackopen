require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

// eslint-disable-next-line no-unused-vars
morgan.token('content', (req, res) => {
  if(req.method === 'POST' || req.method === 'PUT') {
    return JSON.stringify(req.body)
  }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

/*let persons = [
  {
    'name': 'Arto Hellas',
    'number': '040-123456',
    'id': 1
  },
  {
    'name': 'Ada Lovelace',
    'number': '39-44-5323523',
    'id': 2
  },
  {
    'name': 'Dan Abramov',
    'number': '12-43-234345',
    'id': 3
  },
  {
    'name': 'Mary Poppendieck',
    'number': '39-23-6423122',
    'id': 4
  }
]*/


app.get('/api/persons', (_request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

/*const countPersonNumber = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0
  return maxId
}*/

app.get('/info', (_request, response, next) => {
  /*response.send(`
        <p>Phonebook has info about ${countPersonNumber()} people</p>
        <p>${new Date()}</p>
    `)*/
  Person.find({})
    .then(people => {
      console.log(people.length)
      response.send(`
                <p>Phonebook has info about ${people.length} people</p>
                <p>${new Date()}</p>
        `)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  /*const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }*/
  Person.findById(request.params.id)
    .then(person => {
      if(person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  /*const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()*/
  Person.findByIdAndRemove(request.params.id)
    // eslint-disable-next-line no-unused-vars
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

/*const generateRandomId = () => {
  return Math.floor(Math.random() * 1000000)
}*/

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  /*if (!body.name) {
      return response.status(400).json({
        error: 'name is missing'
      })
    } else if (!body.number) {
        return response.status(400).json({
            error: 'number is missing'
        })
    }*/

  /*const existingPerson = persons.find(person => person.name === body.name)

    if (existingPerson) {
        response.status(400).json({
            error: 'name already exists'
        })
    } else {
        const person = {
            name: body.name,
            number: body.number,
            id: generateRandomId(),
        }

        persons = persons.concat(person)

        response.json(person)
    }*/


  /*const person = new Person({
        name: body.name,
        number: body.number,
    })

    person
        .save()
        .then(personSaved => personSaved.toJSON())
        .then(savedAndFormattedPerson => {
            response.json(savedAndFormattedPerson)
        })
        .catch(error => next(error))*/

  Person.findOne({ name: body.name })
    .then(person => {
      if(person) {
        response.status(400).send({ error: 'this name already exists in the database' })
      } else {
        const person = new Person({
          name: body.name,
          number: body.number,
        })

        person
          .save()
          .then(personSaved => personSaved.toJSON())
          .then(savedAndFormattedPerson => {
            response.json(savedAndFormattedPerson)
          })
          .catch(error => next(error))
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, _request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})