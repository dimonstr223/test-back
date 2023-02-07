import express from 'express'
import dotenv from 'dotenv'
import fs from 'fs'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
	try {
		const { type } = req.query
		if (type && type !== 'all') {
			const products = JSON.parse(
				fs.readFileSync('./data/product.json')
			).filter(item => item.TYPE === type)
			return res.json(products)
		}
		const products = JSON.parse(fs.readFileSync('./data/product.json'))
		res.json(products)
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Products getting error' })
	}
})

const port = process.env.PORT
const startApp = () =>
	app.listen(port, () => console.log(`Listeting on port ${port}`))

startApp()
