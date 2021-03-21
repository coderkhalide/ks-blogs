import Navbar from '../components/Navbar'
import "../styles/JoinScreen.css"
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../features/userSlice';
import { useHistory } from 'react-router';

function JoinScreen() {

    const user = useSelector(selectUser)
    const history = useHistory()
    if(user) history.push('/')
    console.log(user)

    const dispatch = useDispatch()

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required(),
        email: Yup.string().email('Invalid email').required(),
        password: Yup.string().required().min(8).max(225)
    })

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required(),
        password: Yup.string().required().min(8).max(225)
    })

    const handleLoginOpen = (e) => {
        const signupBtn = document.getElementById('signup');

        let parent = e.target.parentNode.parentNode;
        Array.from(e.target.parentNode.parentNode.classList).find((element) => {
            if (element !== "slide-up") {
                return parent.classList.add('slide-up')
            } else {
                signupBtn.parentNode.classList.add('slide-up')
                return parent.classList.remove('slide-up')
            }
        });
    }

    const handleSignupOpen = (e) => {
        const loginBtn = document.getElementById('login');
        let parent = e.target.parentNode;
        Array.from(e.target.parentNode.classList).find((element) => {
            if (element !== "slide-up") {
                parent.classList.add('slide-up')
            } else {
                loginBtn.parentNode.parentNode.classList.add('slide-up')
                parent.classList.remove('slide-up')
            }
        });
    }

    const handleLogin = async (values) => {
        try{
            const data = await fetch('https://ks-blogs.herokuapp.com/auth', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values)
            })
            const jsondata = await data.json()
            if(!data.ok) {
                alert(jsondata.message)
            }
            else{
                console.log(jsondata)
                dispatch(login({
                    id: jsondata.id,
                    name: jsondata.name,
                    email: jsondata.email,
                    token: jsondata.token,
                    avatar: jsondata.avatar,
                }))
                console.log(user)
            }
        }catch(e){console.log(e)}
    }

    const handleSignup = async (values) => {
        try{
            const data = await fetch('https://ks-blogs.herokuapp.com/users', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values)
            })
            const jsondata = await data.json()
            if(!data.ok) {
                alert(jsondata.message)
            }
            else{
                console.log(jsondata)
                dispatch(login({
                    id: jsondata.id,
                    name: jsondata.name,
                    email: jsondata.email,
                    token: jsondata.token,
                    avatar: jsondata.avatar,
                }))
            }
        }catch(e){console.log(e)}
    }

    return (
        <>
            <Navbar />
            <div className="joinScreen">
                <div className="wrapper joinScreen__wrapper">
                    <h1 className="joinScreen__heading">Join to Loomly</h1>
                    <p className="joinScreen__sub_heading">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam similique ratione a repudiandae cumque, nisi perspiciatis tempore sed necessitatibus accusantium in. Commodi a provident, nobis fugiat temporibus quaerat. Illo, amet!</p>
                    <div className="joinScreen__form_wrapper">
                        <div className="form-structor">
                            <div className="signup">
                                <h2 className="form-title" onClick={handleSignupOpen} id="signup"><span>or</span>Sign up</h2>
                                <Formik
                                    initialValues={{
                                        name: '',
                                        email: '',
                                        password: '',
                                    }}
                                    validationSchema={SignupSchema}
                                    onSubmit={handleSignup}
                                >
                                    {({ errors, touched }) => (
                                        <Form>
                                            <div className="form-holder" >
                                                <Field className={`input ` + ((errors['name'] && touched['name']) ? `inputError` : '')} name="name" placeholder="Your Name" />
                                                <Field className={`input ` + ((errors['email'] && touched['email']) ? `inputError` : '')} name="email" placeholder="Your Email" />
                                                <Field className={`input ` + ((errors['password'] && touched['password']) ? `inputError` : '')} name="password" placeholder="Password" />
                                            </div>
                                            <button type="submit" className="submit-btn">Sign up</button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                            <div className="login slide-up">
                                <div className="center">
                                    <h2 className="form-title" id="login" onClick={handleLoginOpen}><span>or</span>Log in</h2>
                                    <Formik
                                        initialValues={{
                                            email: '',
                                            password: '',
                                        }}
                                        validationSchema={LoginSchema}
                                        onSubmit={handleLogin}
                                    >
                                        {({ errors, touched }) => (
                                            <Form>
                                                <div className="form-holder" >
                                                    <Field className={`input ` + ((errors['email'] && touched['email']) ? `inputError` : '')} name="email" placeholder="Your Email" />
                                                    <Field className={`input ` + ((errors['password'] && touched['password']) ? `inputError` : '')} name="password" placeholder="Password" />
                                                </div>
                                                <button type="submit" className="submit-btn">Log in</button>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default JoinScreen
