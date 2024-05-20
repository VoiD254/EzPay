export const AppBar = () =>{
    return(
        <div className="shadow h-14 flex justify-between border-t-4 border-t-neutral-800">
            <div className="flex flex-col h-full justify-center ml-4 font-medium">EzPay</div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4 font-medium">Hello</div>
                <div className="flex rounded-full border-r-4 bg-slate-200 h-11 w-11 justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl ml-1" > U </div>
                </div>
            </div>
        </div>
    );
};
