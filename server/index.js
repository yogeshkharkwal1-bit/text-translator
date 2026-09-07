// server/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
const summarizeRoutes = require('./routes/summarize');
const translateRoutes = require('./routes/translate');
const emailRoutes = require('./routes/email');

app.use('/api/summarize', summarizeRoutes);
app.use('/api/translate', translateRoutes);
app.use('/api/email', emailRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'SummarizeAI API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
