import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "../styles/SingleBlogCard.css"

function SingleBlogCard({blog}) {
    const [shortDescription, setShortDescription] = useState('')
    const textShortaner = (text, lenght) => {
        if(text.length > lenght){
            let short = text.slice(0, lenght) + ' ...'
            return short
        }else return text
    }

    useEffect(() => {
        let text = ''
        blog?.blocks.forEach(block => {
            if(block.type === 'paragraph'){
                if(text.length < 100){
                    if(!text){
                        text = block.data.text
                    }else{
                        text += ' ' + block.data.text
                    }
                }
            }
        })
        setShortDescription(text)
    }, [blog?.blocks])

    return (
        <div className="singleBlogCard">
            <Link to={{
                pathname: '/blog/' + blog._id,
                state: { blog: blog }
            }} className="singleBlogCard__wrapper">
                <img src={blog?.thumbnail} alt=""/>
                <div className="singleBlogCard__categorys">
                    <Link to={{
                        pathname: '/blog/' + blog._id,
                        state: { blog: blog }
                    }}>{blog.categorys[0]}</Link>
                </div>
                <h2>{blog?.title}</h2>
                <p>{textShortaner(shortDescription, 90)}</p>
            </Link>
        </div>
    )
}

export default SingleBlogCard
