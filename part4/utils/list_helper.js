const dummy = (blogs) => {
    return 1
}

const totalLikes = (array) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return array.length === 0 
    ? 0
    : array.reduce(reducer, 0)
}
    /*let sum = 0;

    for(let i = 0; i < list.length; i++) {
        sum += list[i].likes
    }
    return sum;*/

let favoriteBlog = (blogs) => {
    let mostLikes = 0;
    let partialBlog;
    for(let i = 0; i < blogs.length; i++) {
        if(blogs[i].likes > mostLikes) {
            mostLikes = blogs[i].likes
            partialBlog = {
                title: blogs[i].title,
                author: blogs[i].author,
                likes: blogs[i].likes
            }
        }
    }
    return partialBlog
}

/*let favoriteBlogv2 = (blog) => {
    let mostLikes = Math.max(...blog.map(b => b.likes))
    return blog.filter(b => b.likes === mostLikes)
}*/

let mostBlogs = (blogs) => {
    let authorM = 0;
    let authorE = 0;
    let authorR = 0;
    for(let i = 0; i < blogs.length; i++) {
        if(blogs[i].author === "Michael Chan") {
            authorM += 1;
        } else if(blogs[i].author === "Edsger W. Dijkstra") {
            authorE += 1;
        } else if(blogs[i].author === "Robert C. Martin") {
            authorR += 1;
        }
    }

    if(authorM < authorE && authorM < authorR && authorE < authorR) {
        return {
            author: "Robert C. Martin",
            blogs: authorR
        };
    } else if(authorM < authorE && authorM < authorR && authorE > authorR) {
        return {
            author: "Edsger W. Dijkstra",
            blogs: authorE
        };
    } else {
        return {
            author: "Michael Chan",
            blogs: authorM
        };
    }
}

let mostLikes = (blogs) => {
    let authorM = 0;
    let authorE = 0;
    let authorR = 0;
    for(let i = 0; i < blogs.length; i++) {
        if(blogs[i].author === "Michael Chan") {
            authorM += blogs[i].likes;
        } else if(blogs[i].author === "Edsger W. Dijkstra") {
            authorE += blogs[i].likes;
        } else if(blogs[i].author === "Robert C. Martin") {
            authorR += blogs[i].likes;
        }
    }

    if(authorM < authorE && authorM < authorR && authorE < authorR) {
        return {
            author: "Robert C. Martin",
            likes: authorR
        };
    } else if(authorM < authorE && authorM < authorR && authorE > authorR) {
        return {
            author: "Edsger W. Dijkstra",
            likes: authorE
        };
    } else {
        return {
            author: "Michael Chan",
            likes: authorM
        };
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}