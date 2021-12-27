const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('Checking Responses', () => {
  test('Single Result', async () => {

    const newQuery = {
      startDate: "2016-01-01",
      endDate: "2020-01-01",
      minCount: 7,
      maxCount: 10
    }
    await api
      .post('/filterdata')
      .send(newQuery)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then(response=> {
        expect(response.body.code).toBe(0)
        expect(response.body.msg).toBe('success')
        expect(response.body.records.length).toBe(2)
      })

  },10000)

  test('Two Results', async () => {

    const newQuery = {
      startDate: "2016-01-01",
      endDate: "2020-01-01",
      minCount: 1,
      maxCount: 5
    }
    await api
      .post('/filterdata')
      .send(newQuery)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then(response=> {
        expect(response.body.code).toBe(0)
        expect(response.body.msg).toBe('success')
        expect(response.body.records.length).toBe(1)
        expect(response.body.records[0].key).toBe('HFrLrkmu')
      })

  },10000)

  test('No Results', async () => {

    const newQuery = {
      startDate: "2009-01-01",
      endDate: "2010-01-01",
      minCount: 1,
      maxCount: 500
    }
    await api
      .post('/filterdata')
      .send(newQuery)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then(response=> {
        expect(response.body.code).toBe(0)
        expect(response.body.msg).toBe('no match')
        expect(response.body.records.length).toBe(0)
      })

  },10000)

  test('Return Everything', async () => {

    const newQuery = {
      startDate: "2000-01-01",
      endDate: "2022-01-01",
      minCount: 0,
      maxCount: 1000000
    }
    await api
      .post('/filterdata')
      .send(newQuery)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then(response=> {
        expect(response.body.code).toBe(0)
        expect(response.body.msg).toBe('success')
        expect(response.body.records.length).toBe(4004)
      })

  },10000)

  test('Single Doc check', async () => {

    const newQuery = {
      startDate: "2016-01-01",
      endDate: "2018-01-01",
      minCount: 100,
      maxCount: 400
    }
    await api
      .post('/filterdata')
      .send(newQuery)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then(response=> {
        expect(response.body.code).toBe(0)
        expect(response.body.msg).toBe('success')
        const keys = response.body.records.map(record => record.key)
        expect(keys).toContain('TAKwGc6Jr4i8Z487')
        expect(keys).not.toContain('BqOIkrTF')
      })

  },10000)
})

describe('Interface Requirements', () => {
  test('invalid date at start', async () => {

    const newQuery = {
      startDate: "2016-01/01",
      endDate: "2020-01-01",
      minCount: 10,
      maxCount: 35
    }
    await api
      .post('/filterdata')
      .send(newQuery)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('invalid month at end', async () => {

    const newQuery = {
      startDate: "2016-01-01",
      endDate: "2020-13-01",
      minCount: 10,
      maxCount: 35
    }
    await api
      .post('/filterdata')
      .send(newQuery)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('invalid day at end', async () => {

    const newQuery = {
      startDate: "2016-01-01",
      endDate: "2020-01-56",
      minCount: 10,
      maxCount: 35
    }
    await api
      .post('/filterdata')
      .send(newQuery)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('minCount < 0', async () => {

    const newQuery = {
      startDate: "2016-01-01",
      endDate: "2020-01-01",
      minCount: -1,
      maxCount: 35
    }
    await api
      .post('/filterdata')
      .send(newQuery)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('minCount > maxCount', async () => {

    const newQuery = {
      startDate: "2016-01-01",
      endDate: "2020-01-01",
      minCount: 40,
      maxCount: 35
    }
    await api
      .post('/filterdata')
      .send(newQuery)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('End date < start date', async () => {

    const newQuery = {
      startDate: "2015-01-16",
      endDate: "2015-01-01",
      minCount: 30,
      maxCount: 100
    }
    await api
      .post('/filterdata')
      .send(newQuery)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('maxCount < 0', async () => {

    const newQuery = {
      startDate: "2016-01-01",
      endDate: "2020-01-01",
      minCount: 40,
      maxCount: -2
    }
    await api
      .post('/filterdata')
      .send(newQuery)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('missing minCount field', async () => {

    const newQuery = {
      startDate: "2016-01-01",
      endDate: "2020-01-01",
      maxCount: 200
    }
    await api
      .post('/filterdata')
      .send(newQuery)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('missing endDate field', async () => {

    const newQuery = {
      startDate: "2016-01-01",
      minCount: 40,
      maxCount: 500
    }
    await api
      .post('/filterdata')
      .send(newQuery)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('missing payload', async () => {
    await api
      .post('/filterdata')
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .then(response=> {
        expect(response.body.code).toBe(400)
        expect(response.body.msg).toBe('missing payload')
        expect(response.body.records.length).toBe(0)
      })
  })

  test('incorrect request method', async () => {

    const newQuery = {
      startDate: "2016-01-01",
      endDate: "2020-01-01",
      minCount: 40,
      maxCount: 500
    }
    await api
      .get('/filterdata')
      .expect(404)
      .expect('Content-Type', /application\/json/)
      .then(response=> {
        expect(response.body.code).toBe(404)
        expect(response.body.msg).toBe('invalid url')
        expect(response.body.records.length).toBe(0)
      })
  })

  test('non-number at count field', async () => {

    const newQuery = {
      startDate: "2016-01-01",
      endDate: "2020-01-01",
      minCount: "Foo",
      maxCount: 35
    }
    await api
      .post('/filterdata')
      .send(newQuery)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('non-string at date field', async () => {

    const newQuery = {
      startDate: true,
      endDate: "2020-01-01",
      minCount: 10,
      maxCount: 35
    }
    await api
      .post('/filterdata')
      .send(newQuery)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})