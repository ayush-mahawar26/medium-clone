
export function QuoteComponent({quote} : {quote : string}) {
    return <div className="w-[50%] font-bold text-2xl">
        <div>
            "{quote}"
        </div>
        <div className="pt-2">
            <div className="text-lg text-slate-400 font-semibold">
                Julieus Winfeild
            </div>
            <div className="text-sm text-slate-400 font-semibold">
                CEO | Acme Corp.
            </div>
        </div>
    </div>
}