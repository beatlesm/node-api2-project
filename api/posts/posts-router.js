// implement your posts router here
const router = require("express").Router()

const Post = require('./posts-model')

router.get('/', (req, res) => {    
    Post.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(() => {
            res.json({ message: "The posts information could not be retrieved" })
        })
})

router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then(post => {
			if (post) {
				res.status(200).json(post);
			} else {
				res.status(404).json({ message: "The post with the specified ID does not exist" });
			}
		})
		.catch( () => {			
			res.json({message: "The post information could not be retrieved",});
		});
});

router.post('/', (req, res) => {
    const { title, contents } = req.body
    if( !title || !title.trim() || !contents || !contents.trim() ) {
        res.status(400).json({ message: "Please provide title and contents for the post"  });
    } else {
  
        Post.insert(req.body)
            .then(postObj => {         
                return Post.findById(postObj.id)           
            })
            .then (newPost => {
                res.status(201).json(newPost);
            })
            .catch( () => {        
                res.json({message: "There was an error while saving the post to the database"});
            });
  
        }   
});
  
router.put('/:id', (req, res) => {
    const changes = req.body;
    const { title, contents } = req.body
    if( !title || !title.trim() || !contents || !contents.trim() ) {
        res.status(400).json({ message: "Please provide title and contents for the post"  });
    } else {
  
        Post.update(req.params.id, changes)
            .then(postObj => {
                if (postObj) {
                    return Post.findById(req.params.id)
                } else {
                    res.status(404).json({ message: "The post with the specified ID does not exist" });
                }
            })
            .then (updatedPost => {
                res.status(200).json(updatedPost);
            })
            .catch(() => {         
                res.json({ message: "The post information could not be modified" });
            });
  
    }
});
 
router.delete('/:id', (req, res) => {
    let deletedPost = {}
    Post.findById(req.params.id)
		.then(post => {
			deletedPost = post							
		})        

    Post.remove(req.params.id)
      .then(count => {
        if (count > 0) {
            res.status(200).json(deletedPost); 
        } else {
          res.status(404).json({ message: "The post with the specified ID does not exist" });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "The post could not be removed"
        })
      })

}); 

router.get('/:id/comments', (req, res) => {
	Post.findById(req.params.id)
		.then(post => {
			if (post) {
				return Post.findPostComments(req.params.id)
			} else {
				res.status(404).json({ message: "The post with the specified ID does not exist" });
			}
		})
        .then (comments =>  {
            res.status(200).json(comments);
        })
		.catch( () => {			
			res.json({message: "The comments information could not be retrieved"});
		});
	
})

module.exports = router
