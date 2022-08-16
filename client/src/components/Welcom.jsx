import React, { useContext } from "react";
import {Loader} from "./";



import  {TransactionsContext}  from "../context/TransactionsContext";
import { shortenAddress } from "../utils/shortenAddress";
import luksologo from "../../images/luksologo.png";
import { shortenBalance } from "../utils/shortenBalance";


const commonstyles = 'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white';
const Input =({placeholder, name, type, value, bloghandleChange}) => (
    <input 
        type={type} 
        placeholder={placeholder}
        step="0.0001" 
        value={value} 
        onChange={(e) => bloghandleChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism "
    />
);
const Welcome = () => {
    const {connectWallet,currentAccount,blogData,sendBlog,bloghandleChange,blogisloading,currentBalance} = useContext(TransactionsContext);
    
    const handleSubmit = (e) => {
        const {topic,content} = blogData;
        console.log('提交blog');        
        // console.log({keyword});
        // console.log({message});
        e.preventDefault();
        if(!topic || !content) return;
        console.log('完成提交blog');
        sendBlog();
    };
    return(
        
        <div className="flex w-full justify-center items-center">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start flex-col mf:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Speak loudly <br /> on block chain
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Own your content on block chain with LUKSO. Comment and Tip each other with cryptocurrencies.  
                    </p>
                    {!currentAccount && <button
                        type="button"
                        onClick={connectWallet}
                        className='flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]'>
                        <p className="text-white text-base font-semibold">connect Wallet</p>
                    </button>}
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={"rounded-tl-2xl" +commonstyles}>
                            Send Blog
                        </div>
                        <div className={commonstyles}>
                            Control selfly
                        </div>
                        <div className={"rounded-tr-2xl" +commonstyles}>
                            Lukso network
                        </div>
                        <div className={"rounded-bl-2xl" +commonstyles}>
                            Web 3.0
                        </div>
                        <div className={commonstyles}>
                            tip each other
                        </div>
                        <div className={"rounded-br-2xl" +commonstyles}>
                            Block Chain
                        </div>
                    </div>                    
                </div>
                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                        <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmophism"> 
                            <div className="flex justify-between flex-col w-full h-full ">
                                <div className="flex justify-between items-start">
                                    {/* <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                        <SiEthereum fontSize={21} color="#fff"></SiEthereum>
                                    </div> */}
                                    <div className="md:flex-[0.5] flex-initial justify-center items-center">
                                        <img src={luksologo} alt="luksologo" className="w-8 cursor-pointer"/>
                                    </div>
                                    <div className="text-gradient text-lg font-semibold mt-12 mr-10">L - U - K - S - O</div>
                                    
                                </div>
                                <div>
                                    <p className="text-white font-light text-sm">
                                        Address: {shortenAddress(currentAccount)}
                                    </p>
                                    <p className="text-white font-semibold text-sm mt-1">
                                        LYXT:  {shortenBalance(currentBalance)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                            {/* <Input placeholder="Addrees To" name="addressTo" type="text" handleChange={handleChange} />
                            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} /> */}
                            <Input placeholder="Topic" name="topic" type="text" bloghandleChange={bloghandleChange} />
                            <Input placeholder="Blog content" name="content" type="text" bloghandleChange={bloghandleChange} />

                            <div className="h-[1px] w-full bg-gray-400 my-2" />
                            {blogisloading
                                ? <Loader />
                                : (
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                                        >
                                        Send blog
                                    </button>
                                )}
                        </div>
                    </div>
            </div>
        </div>
    );
}
export default Welcome;