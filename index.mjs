import express, { request, response } from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
const fakeUsers = [
  { id: 1, name: 'John', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com' },
  { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
  { id: 5, name: 'Charlie Davis', email: 'charlie.davis@example.com' },
  { id: 6, name: 'Eve Evans', email: 'eve.evans@example.com' },
];

app.get('/', (request, response) => {
  response.json('jsondata ' + 'Hello World');
});
// Query Parameters are used to filter the data.
app.get('/api/users', (request, response) => {
  console.log(request.query);
  const { filter, val } = request.query;

  if (!filter || !val) return response.send(fakeUsers);

  if (filter && val) {
    fakeUsers.filter((user) => user[filter].includes(val));
  }
});

// This method is called when the request is made with the query parameter.
// Route Parameters are used to determine the specific resource.

app.get('/api/users/:id', (request, response) => {
  const parsedId = parseInt(request.params.id);
  if (isNaN(parsedId)) return response.status(400).send('Invalid ID');

  const findUser = fakeUsers.find((user) => user.id === parsedId);
  if (!findUser) return response.sendStatus(404);
  response.send(findUser);
});

app.listen(PORT, () => {
  console.log(`Port is running on ${PORT} address`);
});
