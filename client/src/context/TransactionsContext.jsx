import React, {useEffect, useState} from "react";
import {ethers} from "ethers";
import Web3 from "web3";
import { contractABI,contractAddress } from "../utils/constants";

export const TransactionsContext = React.createContext();

const web3 = new Web3(window.ethereum);

const {ethereum} = window;

const getEthereumContract = ()=>{
    console.log('调用合约');
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress,contractABI,signer);

    // console.log({
    //     provider,
    //     signer,
    //     transactionContract
    // });

    return transactionContract;
}

export const TransactionProvider = ({children})=>{
    const [currentAccount, setCurrentAccoount] = useState('');
    const [currentBalance, setCurrentBalance] = useState('');
    const [blogData, setBlogData] = useState({topic:'', content:''});
    const [formData, setFormData] = useState({amount:'',keyword:'',message:''});
    const [blogisloading, setBlogIsloading] = useState(false);
    const [isloading, setIsloading] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [transactionCount, setTransactionCount] = useState([]);
    const [blogCount, setBlogCount] = useState([]);

    const handleChange = (e,name) => {
        console.log('调用句柄');
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const bloghandleChange = (e,name) => {
        console.log('调用博客句柄');
        setBlogData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const getAllTransactions = async() => {
        try {
            if(!ethereum) return alert('请安装钱包!');
            const transactionContract = getEthereumContract();
            const availableTransactions =  await transactionContract.getallTransactioms();
            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.reciver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestrap.toNumber() * 1000).toLocaleString(),
                keyword: transaction.keyword,
                message: transaction.message,
                amount: parseInt(transaction.amount._hex)/(10**18)
            }))
            // console.log(structuredTransactions)
            setTransactions(structuredTransactions)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllBlogs = async() => {
        try {
            if(!ethereum) return alert('请安装钱包!');
            const transactionContract = getEthereumContract();
            const availableBlogs =  await transactionContract.getallBlogs();
            const structuredBlogs = availableBlogs.map((blog) => ({                
                addressFrom: blog.sender,
                timestamp: new Date(blog.timestrap.toNumber() * 1000).toLocaleString(),
                topic: blog.topic,
                content: blog.content,
                
            }))
            // console.log(structuredTransactions)
            setBlogs(structuredBlogs)
        } catch (error) {
            console.log(error)
        }
    }

    const checkifwalletisconnected =async()=>{
        try {
            if(!ethereum) return alert('请安装钱包!');
            const accounts = await ethereum.request({method:'eth_accounts'});
            console.log(accounts[0]);
            if(accounts.length){
                setCurrentAccoount( accounts[0]); 
                console.log(currentAccount)
                setCurrentBalance (web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), 'ether'));
                              
                getAllTransactions();

                getAllBlogs();

            }else{
                console.log('no accounts found')
            }
        } catch (error) {
            console.log(error);            
        }
        
    }
    const connectWallet =async()=>{
        try {
            if(!ethereum) return alert('请安装钱包!');
            const accounts = await ethereum.request({method:'eth_requestAccounts'});
            
            setCurrentAccoount( accounts[0]);
            setCurrentBalance (await web3.eth.getBalance(currentAccount));
            location.reload()
        } catch (error) {
            console.log(error);
            throw new Error('no ethereum object!')
        }
    }
    const checkIfTransactionsExist = async() => {
        try {
            console.log('checkexist准备调用合约');
            const transactionContract = getEthereumContract();
            const currentTransactionCount = await transactionContract.getTransactionCount()

            window.localStorage.setItem('transactionCount',currentTransactionCount)
        } catch (error) {
            console.log(error);
            throw new Error('no ethereum object!')
        }        

    }

    const checkIfBlogsExist = async() => {
        try {
            console.log('checkexist准备调用合约');
            const transactionContract = getEthereumContract();
            const currentBlogCount = await transactionContract.getBlogCount()

            window.localStorage.setItem('blogCount',currentBlogCount)
        } catch (error) {
            console.log(error);
            throw new Error('no ethereum object!')
        }        

    }


    const sendTransaction = async(addressTo) => {
        try {
            if(!ethereum) return alert('请安装钱包');
            const {amount,keyword,message} = formData;
            const parsedAmount = ethers.utils.parseEther(amount)
            await ethereum.request({
                method:'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', //21000Gwei
                    value: parsedAmount._hex, //0.0001
                }]
            })
            
            const transactionContract = getEthereumContract();
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword)
            setIsloading(true)
            console.log('loading -' + transactionHash)
            await transactionHash.wait();
            setIsloading(false)
            console.log('succese -' + transactionHash)
            const transactionCount = await transactionContract.getTransactionCount()
            setTransactionCount(transactionCount.toNumber())
            location.reload()
        } catch (error) {
            console.log(error);
            throw new Error('no ethereum object!')
        }
    }

    const sendBlog = async() => {
        try {
            if(!ethereum) return alert('请安装钱包');
            const {topic,content} = blogData;           

            
            const transactionContract = getEthereumContract();
            const blogHash = await transactionContract.addBlogToBlockchain(content,topic)
            setBlogIsloading(true)
            console.log('loading -' + blogHash)
            await blogHash.wait();
            setBlogIsloading(false)
            console.log('succese -' + blogHash)
            const blogCount = await transactionContract.getBlogCount()
            setBlogCount(blogCount.toNumber())
            location.reload()
        } catch (error) {
            console.log(error);
            throw new Error('no ethereum object!')
        }
    }

    useEffect(()=>{
        checkifwalletisconnected();
        checkIfBlogsExist();
        checkIfTransactionsExist();
    },[]);

    return(
        <TransactionsContext.Provider value={{connectWallet,currentAccount,formData,isloading,setFormData,handleChange,sendTransaction,transactions,currentBalance,blogData,sendBlog,bloghandleChange,blogisloading,blogs}}>
            {children}
        </TransactionsContext.Provider>
    );
}