const express = require('express');
const cors = require('cors');
const { connectToDB } = require('./db/connect');
const assignmentRoutes = require('./routes/assignments');
const swagger = require('./swagger/swagger');

const app = express();

app.use(cors());
app.use(express.json());
swagger(app);

app.use('/assignments', assignmentRoutes);

connectToDB().then(() => {
    app.listen(8080, () => {
        console.log('Server is running on port 8080');
    });
});