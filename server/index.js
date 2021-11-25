const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userData = require('./models/user-model')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/login-system')

app.post('/register', async(req, res) => {
    console.log(req.body)
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await userData.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        res.json({status: 'Create Successfully'})
    }catch (err){
        res.json({status: 'Not Successfully'})
    }
})

app.post('/api/login', async (req, res) => {
    const userFound = await userData.findOne({
        email: req.body.email,
        password: req.body.password,
    })

    if (!userFound) {
		return { status: 'error', error: 'Invalid login' }
	}

    const isValidPassword = await bcrypt.compare(
		req.body.password,
		userFound.password
	)

    if (isValidPassword) {
		return res.json({ status: 'ok', userFound: true })
	} else {
		return res.json({ status: 'error', userFound: false })
	}

    
})

app.listen(8080, () =>{
    console.log('Server started on 8080')
})