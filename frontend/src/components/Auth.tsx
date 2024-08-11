
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom"
import { BACKEND_URL, config } from "../config"
import { useNavigate } from "react-router-dom"

export function SignUpConponent() {

    const navigator = useNavigate()

    type User = {
        username: string,
        useremail: string,
        userpassword: string
    }

    const [user, setUser] = useState<User>({
        useremail: '',
        username: "",
        userpassword: ""
    })

    async function onTap() {
        const url = `${BACKEND_URL}/api/v1/user/signup`
        axios.post(url, user).then(async (res) => {
            const data = await res.data
            const token = data.data.token
            console.log(token)
            localStorage.setItem('token', token)
            navigator('/blogs')
        })

    }

    return <div>
        <div className="flex font-bold justify-center text-4xl pb-2 px-10">
            Create an account
        </div>
        <div className="flex justify-center">
            <div className="text-slate-400 font-semibold">
                Already have account ?
            </div >
            <div className="text-slate-400 font-semibold underline hover:cursor-pointer pl-1">
                <Link to={'/signin'}>Login</Link>
            </div>
        </div>
        <div className="flex flex-col justify-center">
            <LabelInput label="Username" placeholder="eg : ayushm26" onChange={(e) => {
                setUser({
                    ...user,
                    username: e.target.value
                })
            }} />
            <LabelInput label="Email Address" placeholder="eg : abc@gmail.com" onChange={(e) => {
                setUser({
                    ...user,
                    useremail: e.target.value
                })
            }} />
            <LabelInput label="Password" placeholder="eg : 12345" isPassword={true} onChange={(e) => {
                setUser({
                    ...user,
                    userpassword: e.target.value
                })
            }} />
            <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-3 me-2 mt-2" onClick={onTap}>Create Account</button>
        </div>
    </div>

}

export function SignInComponent() {

    type User = {
        useremail: string,
        userpassword: string
    }

    const [user, setUser] = useState<User>({
        useremail: '',
        userpassword: ""
    })
    const navigator = useNavigate()


    async function onTap() {
        const url = `${BACKEND_URL}/api/v1/user/signin`
        axios.post(url, user).then(async (res) => {
            const data = await res.data

            const token = data.data.token

            if (token) {
                localStorage.setItem('token', token)
                navigator('/blogs')
            } else {
                console.log(data.mssg);
            }
        })

    }

    return <div>
        <div className="flex font-bold justify-center text-4xl pb-2 px-10">
            Welcome back !!
        </div>
        <div className="flex justify-center">
            <div className="text-slate-400 font-semibold">
                Don't have account ?
            </div >
            <div className="text-slate-400 font-semibold underline hover:cursor-pointer pl-1">
                <Link to={'/signup'}>Signup</Link>
            </div>
        </div>
        <div className="flex flex-col justify-center">
            <LabelInput label="Email Address" placeholder="eg : abc@gmail.com" onChange={(e) => {
                setUser({
                    ...user,
                    useremail: e.target.value
                })
            }} />
            <LabelInput label="Password" placeholder="eg : 12345" isPassword={true} onChange={(e) => {
                setUser({
                    ...user,
                    userpassword: e.target.value
                })
            }} />
            <button type="button" onClick={onTap} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-3 me-2 mt-2">Login</button>
        </div>
    </div>
}


type LabelInput = {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    isPassword?: boolean
}

export function LabelInput({ label, placeholder, onChange, isPassword }: LabelInput) {
    return <div className="p-2">
        <div className="text-md font-semibold pb-1">{label}</div>
        <input type={isPassword ? 'password' : 'text'} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-black block w-full p-2.5" placeholder={placeholder} onChange={onChange} required />
    </div>
}