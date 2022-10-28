const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// All authors route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if(req.query.Name != null && req.query.name !== '') {
        searchOptions.name = new RegExp((req.query.Name).trim(), 'i')
    }

    try{
        const authors = await Author.find(searchOptions)
        res.render("authors/index", { authors: authors, searchOptions: req.query })
    } catch{
        res.redirect('/')
    }
})

// Create new authors route. Get request is to display form. Post will create it.
router.get('/new', (req, res) => {
    res.render("authors/new", { author: new Author() })
})

router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.Name
    });

    try{
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        
        res.redirect(`authors`)

    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating author.'
        })
    }

})

module.exports = router