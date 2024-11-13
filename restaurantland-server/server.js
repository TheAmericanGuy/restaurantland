const express = require('express');
const moment = require('moment-timezone');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/datetime', (req, res) => {
    const timezone = req.query.timezone || 'America/New_York'; 
    const now = moment().tz(timezone);
    const date = now.format('LL');  
    const time = now.format('LTS');  
    res.json({ date, time });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server online at http://localhost:${PORT}`);
});
