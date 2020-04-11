import React from 'react'
import axios from '../../config/axios'

import { Table } from 'reactstrap';
import { Toast, ToastHeader } from 'reactstrap';

const styleHead = {
    fontStyle:"italic"
}
export default class AccountsList extends React.Component{
    constructor(){
        super()
        this.state = {
            allAccounts : [],
            acctNo:0,
            totCount:0,
            currentIndex:0,
            currentAccounts:[]
        }
    }
    componentDidMount(){
        axios.get('/bankAccount')
        .then(response=>{
            const allAccounts = response.data
            this.setState({allAccounts},()=>{
                const account=this.state.allAccounts[0]
                const acctNo = account['Account No']
                this.setState({acctNo})
                const totCount = this.state.allAccounts.length
                this.setState({totCount})
                const currentAccounts = this.state.allAccounts.slice(this.state.currentIndex,10)
                this.setState({currentAccounts})
            })
            
        })
    }
    handleNextClick = () => {

        if((this.state.currentIndex+10)<=(this.state.allAccounts.length)){
            this.setState((prevState)=>({
                currentIndex : prevState.currentIndex + 10
            }),()=>{
                const currentAccounts = this.state.allAccounts.slice(this.state.currentIndex,this.state.currentIndex+10)
                    this.setState({currentAccounts})
            })
        } 
    }
    
    handleBackClick = () => {
        // console.log("clicked back",this.state.currentIndex)
        if(this.state.currentIndex){
            this.setState((prevState)=>({
                currentIndex : prevState.currentIndex - 10
            }),()=>{
                // console.log(this.state.currentIndex)
                const currentAccounts = this.state.allAccounts.slice(this.state.currentIndex,this.state.currentIndex+10)
                    this.setState({currentAccounts})
            })
    }
}

    render(){
        return (
            <div>
                {this.state.acctNo?<h1 style={{textAlign:"center"}}> Account No : {this.state.acctNo} </h1>:<h1></h1>}
                <Toast>
                {this.state.currentAccounts.length?<ToastHeader style={styleHead}>({this.state.currentAccounts.length}) entries out of ({this.state.allAccounts.length})</ToastHeader>:<h1></h1>}
                </Toast>
                
                        <Table bordered>
                            <thead>
                                <tr>
                                <th style={{color:"darkred"}}>Transaction Date</th>
                                <th style={{color:"darkred"}}>Transaction Details</th>
                                <th style={{color:"darkred"}}>Value Date</th>
                                <th style={{color:"darkred"}}>Debits</th>
                                <th style={{color:"darkred"}}>Credits</th>
                                <th style={{color:"darkred"}}>Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.currentAccounts.map((account,index)=>{
                                 return (
                                <tr key={index}>
                                <td>{account['Date']}</td>
                                <td>{account['Transaction Details']}</td>
                                <td>{account['Value Date']}</td>
                                <td>{account['Withdrawal AMT']}</td>
                                <td>{account['Deposit AMT']}</td>
                                <td>{account['Balance AMT']}</td>
                                </tr>
                            )})}
                            </tbody>
                            </Table>  
                            <button onClick={this.handleNextClick}>Next</button>   
                            <button onClick={this.handleBackClick}>Back</button> 
            </div>
        )
    }
}