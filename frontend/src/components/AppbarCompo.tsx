import { Avtar } from "./Avtar";

export function AppBar() {
    return <div>
        <div className="flex justify-between items-center p-4">
            <div className="text-xl">Medium</div>
            <Avtar name="Ayush" />
        </div>
        <div className="w-screen h-[0.5px] bg-slate-100"></div>
    </div>
}