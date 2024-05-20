export const InputBox = ({label, placeholder, onchange, type}) =>{
    return(
        <div>
            <div className="text-sm font-medium text-left py-2"> {label} </div>
            <input onChange={onchange} placeholder={placeholder} type={type} className="w-full rounded border border-slate-200 px-2 py-1 focus:outline-none"/>
        </div>
    );
};
