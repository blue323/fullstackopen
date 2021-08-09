const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {  
    await Blog.deleteMany({})  

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('all notes are returned as json', async () => {
    const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        
        expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('test that verifies that the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    
    const responseId = response.body.map(r => r.id)
    expect(responseId).toBeDefined()
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "React patterns 2",
        author: "Michael Chan",
        url: "https://reactpatterns2.com/",
        likes: 2,
    }
  
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
        const blogsAtEnd = await helper.blogsInDb()  
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
        const contents = blogsAtEnd.map(b => b.title)
        expect(contents).toContain(
            'React patterns 2'
        )
})

test('blog without the property like will have a default value of 0', async () => {
    const newBlog = {
        title: "React patterns 5",
        author: "Michael Chan",
        url: "https://reactpatterns5.com/",
    }
  
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
        const blogsAtEnd = await helper.blogsInDb()  
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
        const likes = blogsAtEnd.map(b => b.likes)
        expect(likes).toContain(0)
})

test('blog with missing content is not added', async () => {
    const newBlog = {
        author: "Michael Chan",
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
      const blogsAtEnd = await helper.blogsInDb()
      
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('deletion of a note succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
})

test('update of a note succeeds with status code 200 if id is valid', async () => {
    const blogToUpdate = {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 12,
        __v: 0

    }

    await api
      .put(`/api/blogs/${blogToUpdate._id}`)
      .send(blogToUpdate)
      .expect(200)

      const blogsAtEnd = await helper.blogsInDb()  

      const likes = blogsAtEnd.map(b => b.likes)
      expect(likes).toContain(12)
})



afterAll(() => {
    mongoose.connection.close()
})