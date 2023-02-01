import cors from "cors"
import express from "express"
import morgan from "morgan"
import routes from './routes'

const allowedOrigins = ['http://localhost:5173'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

const app = express()
app.use(cors(options))
app.use(express.static('public'))
app.use(express.json())
app.use(morgan('dev'))

// Use routes
app.use(routes)

export default app
