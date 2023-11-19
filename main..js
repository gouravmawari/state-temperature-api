const express = require("express");
const app = express();
const https = require("https");

app.use(express.json());

app.post("/", (req, res) => {
    const { state } = req.body;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=8fe7d938df437fea44d6093f46488387&units=metric`;
    
    const request = https.get(url, (apiResponse) => {
        let data = '';
        
        apiResponse.on('data', (chunk) => {
            data += chunk;
        });

        apiResponse.on('end', () => {
            const parsedData = JSON.parse(data);
            res.json(parsedData.main); // Send response back to client
        });
    });

    request.on('error', (error) => {
        res.status(500).json({ error: 'Error fetching data' });
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
