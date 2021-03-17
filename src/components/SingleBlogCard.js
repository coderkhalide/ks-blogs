import { Link } from "react-router-dom"
import "../styles/SingleBlogCard.css"
function SingleBlogCard({blog}) {

    const textShortaner = (text, lenght) => {
        if(text.length > lenght){
            let short = text.slice(0, lenght) + ' ...'
            return short
        }else return text
    }

    return (
        <div className="singleBlogCard">
            <Link to={'/blog/' + blog.id} className="singleBlogCard__wrapper">
                <img src={blog?.thumbnail} alt=""/>
                <div className="singleBlogCard__categorys">
                    <a href="#">{blog.categorys[0]}</a>
                </div>
                <h2>{blog?.title}</h2>
                <p>{textShortaner(blog?.shortDescription, 125)}</p>
            </Link>
        </div>
    )
}

export default SingleBlogCard
