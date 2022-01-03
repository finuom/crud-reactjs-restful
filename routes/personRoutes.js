const router = require('express').Router()

const Person = require('../models/Person')

// Create data
router.post('/', async (req, res) => {
    const {name, salary, approved} = req.body

    if(!name) {
        res.status(422).json({error: 'Name required!'})
        return
    }
    //TODO add other fields errors

    const person = {
        name,
        salary,
        approved
    }

    try {
        await Person.create(person)

        res.status(201).json({message: 'Person inserted'})

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Read data
router.get('/', async (req, res) => {
    try {
        const people = await Person.find()

        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/:id', async (req, res) => {
    // Extract data from requisition
    const id = req.params.id
    try {
        const person = await Person.findOne({_id: id})
        
        if(!person) {
            res.status(422).json({
                message: 'User not found'
            })
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Data update
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { name, salary, approved } = req.body

    const person = {
        name,
        salary,
        approved,
    }

    try {

        const updatedPerson = await Person.updateOne({ _id: id }, person)

        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({error: 'User not found!'})
            return
        }

        res.status(200).json(person)
        
    } catch(error) {
        res.status(500).json({ error: error })
    }
})

// Delete data
router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const person = await Person.findOne( { _id: id } )

    if (!person){
        res.status(422).json({ message: 'O usuário não foi encontrado!' })
        return
    }

    try {
        await Person.deleteOne({ _id: id})

        res.status(200).json({message: 'User successfully removed'})
    } catch (error) {

    }

})

module.exports = router