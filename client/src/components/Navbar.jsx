import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import logo from '../../images/logo.png';
import React, { useContext }  from 'react';
import  {TransactionsContext}  from "../context/TransactionsContext";

const NarbarItem = ({title, index, classProps}) => {
    const url = ["https://lukso.network/", "https://universalprofile.cloud/", "https://faucet.l16.lukso.network/","https://docs.lukso.tech/"];
    return(
        <li className={"mx-4 cursor-pointer" + classProps} onClick = {() => window.open(url[index])}>
            {title}
        </li>
    );
}

const Narbar = () => {
    const [TonggleManu, setTonggleManu] = React.useState(false);
    const {connectWallet,currentAccount} = useContext(TransactionsContext);
    return(
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            <div className="md:flex-[0.5] flex-initial justify-center items-center">
                <img src={logo} alt="logo" className="w-32 cursor-pointer" onClick = {()=>location.reload()} />
            </div>
            <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
                {["LUKSO NET", "UP", "LYXT", "Docs"].map((item,index) => (
                    <NarbarItem key={item+index} title={item} index={index} classProps=''/>
                ))}
                {!currentAccount && <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]' onClick={connectWallet}>
                    login with UP
                </li>}
            </ul>
            <div className='flex-relative'>
                {TonggleManu
                    ?<AiOutlineClose fontSize={28} className='text-white md:hidden cursor-pointer' onClick={()=>setTonggleManu(false)} />
                    :<HiMenuAlt4  fontSize={28} className='text-white md:hidden cursor-pointer' onClick={()=>setTonggleManu(true)} />}
                {TonggleManu && (
                    <ul
                        className='z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                        flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'
                    >
                        <li className='text-xl w-full my-2'>
                            <AiOutlineClose onClick={()=>setTonggleManu(false)} />
                        </li>
                        {["LUKSO NET", "UP", "LYXT", "Docs"].map((item,index) => (
                        <NarbarItem key={item+index} title={item} index={index} classProps = 'my-2 text-lg' />
                        ))}
                    </ul>
                )}
            </div>
        </nav>
    );
}
export default Narbar;