export const Button = ({label, onclick}) =>{
    return(
        <button className="w-full bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 text-white rounded-lg py-2.5 text-sm mb-2 me-2 font-medium" type="button" onClick={onclick}>{label}</button>
    );
};