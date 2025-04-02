const express = require('express');
const winston = require('winston');

const app = express();
const port = 3000;

// Winston logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'calculator-microservice' },
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ],
});

// Middleware to handle JSON request bodies
app.use(express.json());

// Basic arithmetic operation endpoints
app.get('/add', (req, res) => {
  const { num1, num2 } = req.query;
  if (isNaN(num1) || isNaN(num2)) {
    logger.error('Invalid input for addition');
    return res.status(400).json({ error: 'Invalid numbers provided' });
  }
  const result = parseFloat(num1) + parseFloat(num2);
  logger.info(`New addition operation requested: ${num1} + ${num2}`);
  res.json({ result });
});

app.get('/subtract', (req, res) => {
  const { num1, num2 } = req.query;
  if (isNaN(num1) || isNaN(num2)) {
    logger.error('Invalid input for subtraction');
    return res.status(400).json({ error: 'Invalid numbers provided' });
  }
  const result = parseFloat(num1) - parseFloat(num2);
  logger.info(`New subtraction operation requested: ${num1} - ${num2}`);
  res.json({ result });
});

app.get('/multiply', (req, res) => {
  const { num1, num2 } = req.query;
  if (isNaN(num1) || isNaN(num2)) {
    logger.error('Invalid input for multiplication');
    return res.status(400).json({ error: 'Invalid numbers provided' });
  }
  const result = parseFloat(num1) * parseFloat(num2);
  logger.info(`New multiplication operation requested: ${num1} * ${num2}`);
  res.json({ result });
});

app.get('/divide', (req, res) => {
  const { num1, num2 } = req.query;
  if (isNaN(num1) || isNaN(num2)) {
    logger.error('Invalid input for division');
    return res.status(400).json({ error: 'Invalid numbers provided' });
  }
  if (parseFloat(num2) === 0) {
    logger.error('Division by zero attempted');
    return res.status(400).json({ error: 'Cannot divide by zero' });
  }
  const result = parseFloat(num1) / parseFloat(num2);
  logger.info(`New division operation requested: ${num1} / ${num2}`);
  res.json({ result });
});

// Start the server
app.listen(port, () => {
  console.log(`Calculator microservice is running at http://localhost:${port}`);
});
