import { useState, useEffect } from 'react'
import axios from 'axios'
import "./Articles.css"

function Articles() {

  const [articles, setArticles] = useState([])
  const [error, setError] = useState('')


  // read all articles
  async function getArticles() {
    let res = await axios.get('http://localhost:3000/author-api/articles')
    if (res.data.message === 'articles') {
      setArticles(res.data.payload)
    } else {
      setError(res.data.message)
    }
  }

  useEffect(() => {
    getArticles()
  }, [])

  console.log(articles)

  return (
    <div className='container'>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3'>
        {articles.map((articleObj) => (
          <div className='col' key={articleObj.articleId}>
            <div className="card h-100">
              <div className="card-body">
                <div className="author-details text-end">
                  <img src={articleObj.authorData.profileImageUrl} width='40px' className='rounded-circle' alt="" />
                  <p>
                    <small className='text-secondary'>
                      {articleObj.authorData.nameOfAuthor}
                    </small>
                  </p>
                </div>
                <h5 className='card-title'>{articleObj.title}</h5>
                <p className="card-text">
                  {articleObj.content.substring(0, 80) + '.....'}
                </p>
                <button className='custom-btn btn-4'>
                  Read more
                </button>
              </div>
              <div className='card-footer'>
                <small className="text-body-secondary"> Last updated on {articleObj.dateOfModification} </small>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Articles