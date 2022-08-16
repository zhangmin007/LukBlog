import logo from "../../images/logo.png";
const Footer = () => {
    return(
        <div className='w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer'>
            <div className='w-full flex sm:flex-row flex-col justify-between items-center my-4'>
                <div className="flex flex-[0.5] justify-center items-center ">
                    <img src={logo} alt="logo" className='w-32' onClick = {()=>location.reload()} />
                </div>
                <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
                    <p className="text-white text-base text-cecnter mx-2 cursor-pointer" onClick={() => window.open("https://lukso.network/")}>LUKSO NET</p>
                    <p className="text-white text-base text-cecnter mx-2 cursor-pointer" onClick={() => window.open("https://universalprofile.cloud/")}>UP</p>
                    <p className="text-white text-base text-cecnter mx-2 cursor-pointer" onClick={() => window.open("https://faucet.l16.lukso.network/")}>LYXT</p>
                    <p className="text-white text-base text-cecnter mx-2 cursor-pointer" onClick={() => window.open("https://docs.lukso.tech/")}>Docs</p>
                </div>                
            </div>
            <div className="flex justify-center items-center flex-col mt-5">
                <p className="text-white text-sm text-center">Contact us</p>
                <p className="text-white text-sm text-center">zhmin805@gmail.com</p>
            </div>
            <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5">
                
            </div>
            <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
                <p className="text-white text-sm text-center">@zhangmin007 2022</p>
                <p className="text-white text-sm text-center">https://github.com/zhangmin007</p>
            </div>
        </div>
    );
}
export default Footer;