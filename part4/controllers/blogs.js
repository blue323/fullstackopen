const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, config.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const decodedToken = jwt.verify(request.token, config.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  //const user = await User.findById(decodedToken.id)

  const blogToDelete = await Blog.findById(request.params.id)

  if ( blogToDelete.user.toString() === user.id.toString() ) {
    await Blog.deleteOne({ _id: request.params.id })
    response.sendStatus(204).end()
  } else {
    response.status(401).json({ error: 'unauthorized operation' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body
  const id = request.params.id


  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true, useFindAndModify : false
  }).populate('user', { username: 1, name: 1 })

  updatedBlog
    ? response.status(200).json(updatedBlog.toJSON())
    : response.status(404).end()
})

module.exports = blogsRouter