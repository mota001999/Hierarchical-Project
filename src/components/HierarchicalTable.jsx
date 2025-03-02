import React from 'react'
import Table from './table.jsx';
const data = {
    "rows": [
      {
        "id": "electronics",
        "label": "Electronics",
        "value": 1400, //this value needs to be calculated from the children values (800+700)
        "children": [
          {
            "id": "phones",
            "label": "Phones",
            "value": 800
          },
          {
            "id": "laptops",
            "label": "Laptops",
            "value": 700
          }
        ]
      },
      {
        "id": "furniture",
        "label": "Furniture",
        "value": 1000, //this need to be calculated from the children values (300+700)
        "children": [
          {
            "id": "tables",
            "label": "Tables",
            "value": 300
          },
          {
            "id": "chairs",
            "label": "Chairs",
            "value": 700
          }
        ]
      }
    ]
  };
const HierarchicalTable = () => {
  return (
    <div>{
    data.rows.map((entry)=>{
        return <Table entry={entry} diff={0} parPercent={1}/>
    })}
    </div>
  )
}

export default HierarchicalTable