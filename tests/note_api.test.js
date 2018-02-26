const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Note = require('../models/note')

const initialNotes = [
  {
    content: 'HTML on helppoa',
    important: false
  },
  {
    content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
    important: true
  }
]

beforeAll(async () => {
  await Note.remove({})

  let noteObject = new Note(initialNotes[0])
  await noteObject.save()

  noteObject = new Note(initialNotes[1])
  await noteObject.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('there are five notes', async () => {
  const response = await api
    .get('/api/notes')

  expect(response.body.length).toBe(5)
})

test('all notes are returned', async () => {
  const response = await api
    .get('/api/notes')

  expect(response.body.length).toBe(initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api
    .get('/api/notes')

  const contents = response.body.map(r => r.content)

  expect(contents).toContain('HTTP-protokollan tärkeimmät metodit ovat GET ja POST')
})


test('the first note is about HTTP methods', async () => {
  const response = await api
    .get('/api/notes')

  expect(response.body[0].content).toBe('HTML on helppoa')
})

afterAll(() => {
  server.close()
})
