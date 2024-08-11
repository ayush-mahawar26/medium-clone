
import { useEffect } from "react";
import { SignInComponent, SignUpConponent } from "../components/Auth";
import { QuoteComponent } from "../components/quote_component";
import { useNavigate } from "react-router-dom";

export function AuthPage({ type }: { type: 'signup' | 'signin' }) {

    const navigator = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            navigator('/blogs')
        }
    })
    return <div className="flex w-screen h-screen">
        <div className="flex justify-center items-center w-screen md:w-[50%]">
            {type === 'signup' ? <SignUpConponent /> : <SignInComponent />}
        </div>
        <div className="justify-center items-center bg-slate-200 flex w-[0%] md:w-[50%] invisible md:visible">
            <QuoteComponent quote="The customer support I reciveved was exceptional. The support team went above and beyond to address my concerns" />
        </div>
    </div>
}