import { useContext,useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./PostArticle.css";
import { UserAuthorContextObj } from "../../contexts/UserAuthorContext";
import { useNavigate } from 'react-router-dom'

function PostArticle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { currentUser } = useContext(UserAuthorContextObj);
  const navigate=useNavigate();
  const [error, setError] = useState("");

  async function postArticle(articleObj) {
    console.log(articleObj);

    // create article object as per article schema
    const authorData = {
      nameOfAuthor: currentUser.firstName,
      email: currentUser.email,
      profileImageUrl: currentUser.profileImageUrl,
    };
    articleObj.authorData = authorData;

    // article id(time stamp)
    articleObj.articleId = Date.now();
    // add date of creation & date of modification
    let currentDate = new Date();
    articleObj.dateOfCreation =
      currentDate.getDate() +
      "-" +
      currentDate.getMonth() +
      "-" +
      currentDate.getFullYear() +
      " " +
      currentDate.toLocaleTimeString("en-US", { hour12: true });
    articleObj.dateOfModification =
      currentDate.getDate() +
      "-" +
      currentDate.getMonth() +
      "-" +
      currentDate.getFullYear() +
      " " +
      currentDate.toLocaleTimeString("en-US", { hour12: true });

      // add comments array
      articleObj.comments=[];
      // add article active state
      articleObj.isArticleActive=true;
      console.log(articleObj)
    // make HTTP POST req to create new article in backend
    try{
      let res=await axios.post('http://localhost:3000/author-api/article',articleObj);
      if(res.status===201){
        // navigate to articles component
        navigate(`/author-profile/${currentUser.email}/articles`)
      } 
    }catch(err){
      setError("Something went wrong:",error+err)
    }

    // await axios.post('', articleObj)
  }

  return (
    <div className="post-article-wrapper">
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-lg-8 col-md-8 col-sm-10">
            <div className="card shadow post-article-card">
              <div className="card-title text-center border-bottom post-article-title-area">
                <h2 className="p-3 post-article-title">Write an Article</h2>
              </div>
              <div className="card-body bg-light">
                {/* {err.length!===0&&<p className='text-danger' fs-5>{err}</p>} */}
                <form onSubmit={handleSubmit(postArticle)}>
                  <div className="mb-4">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      className="form-control"
                      {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && (
                      <p className="text-danger small mt-1">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="category" className="form-label">
                      Select a category
                    </label>
                    <select
                      id="category"
                      className="form-select"
                      {...register("category", {
                        required: "Category is required",
                      })}
                    >
                      <option value="">Choose category</option>
                      <option value="Programming">Programming</option>
                      <option value="Editing">Editing</option>
                      <option value="Development">Development</option>
                    </select>
                    {errors.category && (
                      <p className="text-danger small mt-1">
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="content" className="form-label">
                      Content
                    </label>
                    <textarea
                      id="content"
                      className="form-control"
                      rows={8}
                      {...register("content", {
                        required: "Content is required",
                      })}
                    ></textarea>
                    {errors.content && (
                      <p className="text-danger small mt-1">
                        {errors.content.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success w-100 post-article-submit"
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostArticle;
