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


app.use(express.json());


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
    logger.error('Invalid input for subtraction is ');
    return res.status(400).json({ error: 'Invalid numbers are provided' });
  }
  const result = parseFloat(num1) - parseFloat(num2);
  logger.info(`New subtraction operation is requested: ${num1} - ${num2}`);
  res.json({ result });
});

app.get('/multiply', (req, res) => {
  const { num1, num2 } = req.query;
  if (isNaN(num1) || isNaN(num2)) {
    logger.error('Invalid input for multiplication is provided');
    return res.status(400).json({ error: 'Invalid numbers are provided' });
  }
  const result = parseFloat(num1) * parseFloat(num2);
  logger.info(`New multiplication operation is requested: ${num1} * ${num2}`);
  res.json({ result });
});

app.get('/divide', (req, res) => {
  const { num1, num2 } = req.query;
  if (isNaN(num1) || isNaN(num2)) {
    logger.error('Invalid input given division');
    return res.status(400).json({ error: 'Invalid numbers are provided' });
  }
  if (parseFloat(num2) === 0) {
    logger.error('Division by zero is attempted');
    return res.status(400).json({ error: 'Cannot divide by zero' });
  }
  const result = parseFloat(num1) / parseFloat(num2);
  logger.info(`New division operation is requested: ${num1} / ${num2}`);
  res.json({ result });
});


app.get('/exponentiate', (req, res) => {
    const { num1, num2 } = req.query;
    if (isNaN(num1) || isNaN(num2)) {
      logger.error('Invalid input for exponentiation method');
      return res.status(400).json({ error: 'Invalid numbers are provided' });
    }
    const result = Math.pow(parseFloat(num1), parseFloat(num2));
    logger.info(`New exponentiation operation is requested: ${num1} ^ ${num2}`);
    res.json({ result });
  });
  
  app.get('/sqrt', (req, res) => {
    const { num1 } = req.query;
    if (isNaN(num1)) {
      logger.error('Invalid input for square root method');
      return res.status(400).json({ error: 'Invalid numbers are provided' });
    }
    if (parseFloat(num1) < 0) {
      logger.error('Square root of negative number attempted');
      return res.status(400).json({ error: 'Cannot take the square root of a negative number' });
    }
    const result = Math.sqrt(parseFloat(num1));
    logger.info(`New square root operation is requested: √${num1}`);
    res.json({ result });
  });
  
  app.get('/modulo', (req, res) => {
    const { num1, num2 } = req.query;
    if (isNaN(num1) || isNaN(num2)) {
      logger.error('Invalid input for modulo method');
      return res.status(400).json({ error: 'Invalid numbers are provided' });
    }
    const result = parseFloat(num1) % parseFloat(num2);
    logger.info(`New modulo operation requested: ${num1} % ${num2}`);
    res.json({ result });
  });


app.listen(port, () => {
  console.log(`Calculator microservice is running at http://localhost:${port}`);
});
