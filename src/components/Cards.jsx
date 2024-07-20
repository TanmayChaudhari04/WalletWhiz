import { Row, Card } from 'antd'
import React from 'react'
import './style.css'
import Buttons from './Buttons'

function Cards({income, expense, totalBalance, showExpenseModal, showIncomeModal}) {
  return (
    <div className='mt-14'>
        <Row className='flex justify-between items-center w-11/12 m-auto'>
            <Card className='my-card min-w-96 h-48' title="Current Balance">
              <p className='text-2xl'>${totalBalance}</p>
              
            </Card>
            <Card className='my-card min-w-96' title="Total Income">
              <p>${income}</p>
              <Buttons text="Add Income" blue={true} onClick={showIncomeModal}></Buttons>
            </Card>
            <Card className='my-card min-w-96' title="Total Expenses">
              <p>${expense}</p>
              <Buttons text="Add Expenses" blue={true} onClick={showExpenseModal}></Buttons>
            </Card>
        </Row>
    </div>
  )
}

export default Cards