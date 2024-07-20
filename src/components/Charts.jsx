import { Line, Pie } from '@ant-design/charts';
import React from 'react'
import './style.css'

function Charts({sortedTransactions}) {
    const data = sortedTransactions.map((item) => {
        return {date: item.date, amount: item.amount};
    });

    const spendingData = sortedTransactions.filter(
      (transaction) => {if (transaction.type == "expense"){
        return {tag: transaction.tag, amount: transaction.amount};
    }});

    let newSpendingData = [
      {tag: "food", amount: 0},
      {tag: "education", amount: 0},
      {tag: "shopping", amount: 0},
      {tag: "entertainment", amount: 0},
      {tag: "insurance", amount: 0},
    ];

    spendingData.forEach((item) => {
      if (item.tag == "food"){
        newSpendingData[0].amount += item.amount;
      }   
      else if (item.tag == "education"){
        newSpendingData[1].amount += item.amount;
      } 
      else if (item.tag == "shopping"){
        newSpendingData[2].amount += item.amount;
      } 
      else if (item.tag == "entertainment"){
        newSpendingData[3].amount += item.amount;
      } 
      else{
        newSpendingData[4].amount += item.amount;
      }    
    });
    
      const config = {
        data: data,
        width: 700,
        height: 400,
        autoFit: false,
        xField: 'date',
        yField: 'amount',
      };

      const spendingConfig = {
        data: newSpendingData,
        width: 700,
        height: 400,
        autoFit: false,
        angleField: "amount",
        colorField: "tag",
      };

  return (
    <div className='charts-wrapper'>
        <div>
            <h2 className='text-lg font-bold mb-5'>Your Analytics</h2>
            <Line {...config} />;
        </div>
        <div>
            <h2 className='text-lg font-bold mb-5'>Your Spendings</h2>
            <Pie {...spendingConfig} />
        </div>
    </div>
  )
}

export default Charts;