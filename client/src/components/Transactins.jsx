import React, {useContext} from "react";
import {TransactionsContext} from '../context/TransactionsContext';
import { shortenAddress} from '../utils/shortenAddress';
import dummyData from '../utils/dummyData';
import useFetch from "../hooks/useFetch";

const Input =({placeholder, name, type, value, handleChange}) => (
    <input 
        type={type} 
        placeholder={placeholder}
        step="0.0001" 
        value={value} 
        onChange={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism "
    />
);

const TransactionCard = ({addressFrom, addressTo, amount, timestamp, message, keyword, url}) => {
    const gifUrl = useFetch(keyword)

    return (
        <div className="bg-[#181918] m-4 flex flex-1
            2xl:min-w-[450px]
            2xl:max-w-[500px]
            sm:min-w-[270px]
            sm:max-w-[300px]
            flex-col p-3 rounded-md hover:shadow-2xl
        ">
            <div className="flex flex-col items-center w-full mt-3">
                <div className="display-flex justify-start w-full mb-6 p-2">
                    <p className="text-[#37c7da] font-bold">{timestamp}</p>
                    <a href={"https://explorer.execution.l16.lukso.network/address/"+addressFrom} target='_blank' rel="noopener noreferrer">
                        <p className="text-white text-base">From: {shortenAddress(addressFrom)}</p>
                    </a>
                    <a href={"https://explorer.execution.l16.lukso.network/address/"+addressTo} target='_blank' rel="noopener noreferrer">
                        <p className="text-white text-base">To: {shortenAddress(addressTo)}</p>
                    </a>
                    <p className="text-white text-base">Amount: {amount} ETH</p>
                    { message && (
                        <>
                            <br />
                            <p className="text-white text-base">message: {message} </p>
                        </>                        
                    )}
                    
                </div>
                <img src={gifUrl || url} alt="gif" className="w-full h-64 2x:h-96 rounded-md shadow-lg object-cover"/>

                {/* <div className="bg-black p-3 px-5 w-max rounded-3xl mt-5 shadow-2xl">
                    
                </div> */}

                

            </div>
        </div>
    )
}

const BlogCard = ({addressFrom, timestamp, topic, content, url}) => {
    const gifUrl = useFetch(topic) 
    
    const {formData,sendTransaction,handleChange,isloading} = useContext(TransactionsContext);

    const handleSubmit = (e) => {
        const addressTo = addressFrom;
        const {amount,keyword,message} = formData;
        
        e.preventDefault();
        if(!addressTo || !amount || !keyword || !message) return;
        console.log('提交2222');
        sendTransaction(addressTo);
    };

    return (
        <div className="bg-[#181918] m-4 flex flex-1
            2xl:min-w-[450px]
            2xl:max-w-[500px]
            sm:min-w-[270px]
            sm:max-w-[300px]
            flex-col p-3 rounded-md hover:shadow-2xl
        ">
            <div className="flex flex-col items-center w-full mt-3">
                <div className="display-flex justify-start w-full mb-6 p-2">
                    <p className="text-[#37c7da] font-bold">{timestamp}</p>

                    <a href={"https://explorer.execution.l16.lukso.network/address/"+addressFrom} target='_blank' rel="noopener noreferrer">
                        <p className="text-white text-base">From: {shortenAddress(addressFrom)}</p>
                    </a>
                    <p className="text-white text-base">Topic: {topic}</p>
                    { content && (
                        <>
                            <br />
                            <p className="text-white text-base">blog content: {content} </p>
                        </>                        
                    )}                    
                    
                </div>
                
                
                <img src={gifUrl || url} alt="gif" className="w-full h-64 2x:h-96 rounded-md shadow-lg object-cover"/>          

                <Input placeholder="Amount (LYXT)" name="amount" type="number" handleChange={handleChange} />
                <Input placeholder="Keyword" name="keyword" type="text" handleChange={handleChange} />
                <Input placeholder="Comment" name="message" type="text" handleChange={handleChange} />

                <div className="h-[1px] w-full bg-gray-400 my-2" />
                    {isloading
                        ? <Loader />
                        : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                                >
                                Send tip  and comment
                            </button>
                        )}
                </div>
                                

        </div>
    )
}


const Transactions = () => {
    const {currentAccount, transactions, blogs} =useContext(TransactionsContext)
    return(
        <div className="flex w-full justify-center items-center 2xl-px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {currentAccount?(
                    <h3 className="text-white text-3xl text-center my-2">Latest blogs and tips</h3>
                ):(
                    <h3 className="text-white text-3xl text-center my-2">Please connect wallet</h3>
                )}
                <div className="flex flex-wrap justify-center iyems-center mt-10">

                    {transactions.reverse().map((transaction,i) => (
                        <TransactionCard key={i} {...transaction}></TransactionCard>
                    ))}

                    {blogs.reverse().map((blog,i) => (
                        <BlogCard key={i} {...blog}></BlogCard>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Transactions;