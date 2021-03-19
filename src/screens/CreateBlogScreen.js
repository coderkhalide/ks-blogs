import Navbar from '../components/Navbar'
import "../styles/CreateBlogScreen.css"
import EditorJs from 'react-editor-js'
import { useEffect, useState } from 'react'
import { EDITOR_JS_TOOLS } from '../config/editorConstants'
import { Button } from '@material-ui/core'
import TagsInput from '../components/TagsInput'

function CreateBlogScreen() {
    const [blogData, setBlogData] = useState(null)
    const [editor, setEditor] = useState()
    const [title, setTitle] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [categorys, setCategorys] = useState([])
    const [disabled, setDisabled] = useState(true)

    const saveData = async () => {
        const outputData = await editor.save()
        setBlogData(outputData)
    }

    const handleSelecetedTags = (items) => {
        setCategorys(items);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        saveData()
        console.log(title, thumbnail, categorys)
    }

    useEffect(() => {
        if(title && thumbnail && categorys.length > 0 && editor) setDisabled(false)
        else setDisabled(true)
    })

    console.log(blogData)

    return (
        <>
            <Navbar />
            <div className="createBlogScreen">
                <div className="createBlogScreen__wrapper">
                    <form onSubmit={e => e.preventDefault()}>
                        <div className="createBlogScreen__headers">
                            <h1 className="createBlogScreen__header_title">Write A Blog</h1>
                            <div className="createBlogScreen__header_form">
                                <input className="textInput" type="text" placeholder="Blog Title"
                                    onChange={e => setTitle(e.target.value)}
                                    value={title}
                                    required
                                />
                                <input className="textInput" type="url" placeholder="Blog Thumbnail URL"
                                    onChange={e => setThumbnail(e.target.value)}
                                    value={thumbnail}
                                    required
                                />
                                {thumbnail && (<img className="createBlogScreen__thumbnail_preview" src={thumbnail} alt=""/>)}
                                <TagsInput
                                    selectedTags={handleSelecetedTags}
                                    fullWidth
                                    variant="outlined"
                                    id="categorys"
                                    name="categorys"
                                    placeholder="Add Categorys"
                                    label="Categorys"
                                />
                            </div>
                        </div>
                        <div className="createBlogScreen__content_write">
                            <EditorJs 
                                data={blogData}
                                tools={EDITOR_JS_TOOLS}
                                instanceRef={instance => setEditor(instance)}
                                placeholder="Write The Content"
                            />
                        </div>
                        <div className="createBlogScreen__buttons">
                            <Button type="button" onClick={handleSubmit} variant="outlined" color="primary" disabled={disabled}>
                                Publish Blog
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateBlogScreen
