const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')

const getTokenFrom = request => {  
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {    
    return authorization.substring(7)  
  }  
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  
  if (!token || !decodedToken.id) {    
    return response.status(401).json({ error: 'token missing or invalid' })  
  }  
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)  
  await user.save()
  response.json(savedBlog)
})

/*blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})*/

blogsRouter.delete('/:id', async (request, response, next) => {

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  const user = await User.findById(decodedToken.id)

  const blogToDelete = await Blog.findById(request.params.id)

  if ( blogToDelete.user._id.toString() === user._id.toString() ) {
      try {
          await Blog.findByIdAndRemove(request.params.id)
          response.status(204).end()
        } catch (exception) {
          next(exception)
        }
  } else {
      return response.status(401).json({ error: `Unauthorized` })
  }
})

/*blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})*/

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  const blogToUpdate = await Blog.findById(request.params.id)

  if ( blogToUpdate.user._id.toString() === user._id.toString() ) {
      const blog = {
          title: body.title,
          author: body.author,
          url: body.url,
          likes: body.likes,
      }

      try {
          const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
          logger.info(`blog ${blog.title} successfully updated`)
          response.json(updatedBlog.toJSON())
      } catch (exception) {
          next(exception)
      }
  } else {
      return response.status(401).json({ error: `Unauthorized` })
  }
})

module.exports = blogsRouter