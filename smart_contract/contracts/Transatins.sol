//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
contract Transactions {
    uint256 transactionCount;
    uint256 blogCount;

    event Transfer(address from,address reciver,uint amount,string message,uint256 timestrap,string keyword);
    event SendBlog(address from, string content, uint256 timestrap, string topic);

    struct TransferStruct {
        address sender;
        address reciver;
        uint amount;
        string message;
        uint256 timestrap;
        string keyword;
    }

    struct SendBlogStruct {
        address sender;
        string content;
        uint256 timestrap;
        string topic;
    }

    TransferStruct[] transactions;
    SendBlogStruct[] blogs;

    function addToBlockchain(address payable reciver,uint amount,string memory message,string memory keyword) public{
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender,reciver,amount,message,block.timestamp,keyword));
        emit Transfer(msg.sender, reciver, amount, message, block.timestamp, keyword);
    }

    function addBlogToBlockchain(string memory content,string memory topic) public{
        blogCount += 1;
        blogs.push(SendBlogStruct(msg.sender, content, block.timestamp, topic));
        emit SendBlog(msg.sender, content, block.timestamp, topic);
    }

    function getallTransactioms() public view returns(TransferStruct[] memory) {
        return transactions;
    }

    function getallBlogs() public view returns(SendBlogStruct[] memory) {
        return blogs;
    }

    function getTransactionCount() public view returns(uint256) {
        return transactionCount;
    }

    function getBlogCount() public view returns(uint256) {
        return blogCount;
    }
}