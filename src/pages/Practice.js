import React, { useState } from 'react'
import MaterialTable, { MTableToolbar } from "@material-table/core"
import {ExportCsv,ExportPdf} from '@material-table/exporters'
export default function Practice() {
  const [columns, setColumns] = useState([
    { title: 'Avatar', field: 'imageUrl', render: rowData => <img src={rowData.imageUrl} style={{ width: 40, borderRadius: '50%' }} /> },
    { title: 'Name', field: 'name' },
    { title: 'Surname', field: 'surname' },
    { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    {
      title: 'Birth Place',
      field: 'birthCity',
      lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
    },
  ])
  const [data, setData] = useState([
    { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4' },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4' },

  ])
  return (
    <div>
      <MaterialTable
        title="Simple Action"

        // columns={[
        //     { title: 'Avatar', field: 'imageUrl', render: rowData => <img src={rowData.imageUrl} style={{width: 40, borderRadius: '50%'}}/> },
        //     { title: 'Name', field: 'name' },
        //     { title: 'Surname', field: 'surname' },
        //     { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        //     {
        //         title: 'Birth Place',
        //         field: 'birthCity',
        //         lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        //       },
        // ]}
        //   data={[
        //       { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4' },
        //   { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4' },
        // ]} 
        // actions={[
        //     {
        //         icon:'save',
        //         tooltip:"Save User",
        //         onClick:(event,rowData)=>{
        //             alert("YOu saved"+rowData.name)
        //         },  
        //     },
        //     {
        //         icon:'delete',
        //         tooltip:"Delete User",
        //         onClick:(even,rowData)=>alert("YOu want to delete"+rowData.name)
        //     },
        //     {
        //         icon:'add',
        //         tooltip:"Add user",
        //         isFreeAction:true,
        //         onClick: (event) => alert("You want to add a new row")
        //     }
        // ]}
        columns={columns}
        data={data}

        editable={{
          onRowAdd:newData=>
          new Promise((resolve,reject)=>{
            setTimeout(()=>{
              setData([...data,newData]);
              resolve();
            },1000);
          }),
          onRowUpdate:(newData,oldData)=>
          new Promise((resolve,reject)=>{
            setTimeout(()=>{
              const dataUpdate=[...data];
              const index=oldData.tableData.id;
              dataUpdate[index]=newData;
              setData([...dataUpdate]);
              resolve();
            },1000)
          }),
          onRowDelete:oldData=>
          new Promise((resolve,reject)=>{
            setTimeout(()=>{
              const dataDelete=[...data];
              const index=oldData.tableData.id;
              dataDelete.splice(index,1);
              setData([...dataDelete]);
              resolve();
            },1000)
          })
        }}

        // detailPanel={[
        //   {
        //     tooltip: 'Show Name',
        //     render: rowData => {
        //       return (
        //         <div
        //           style={{
        //             fontSize: 100,
        //             textAlign: 'center',
        //             color: 'white',
        //             backgroundColor: '#43A047',
        //           }}
        //         >
        //           {rowData.name}
        //         </div>
        //       )
        //     },
        //   },
        //   {
        //     icon: 'account_circle',
        //     tooltip: 'Show Surname',
        //     render: rowData => {
        //       return (
        //         <div
        //           style={{
        //             fontSize: 100,
        //             textAlign: 'center',
        //             color: 'white',
        //             backgroundColor: '#E53935',
        //           }}
        //         >
        //           {rowData.surname}
        //         </div>
        //       )
        //     },
        //   },
        //   {
        //     icon: 'favorite_border',
        //     openIcon: 'favorite',
        //     tooltip: 'Show Both',
        //     render: rowData => {
        //       return (
        //         <div
        //           style={{
        //             fontSize: 100,
        //             textAlign: 'center',
        //             color: 'white',
        //             backgroundColor: '#FDD835',
        //           }}
        //         >
        //           {rowData.name} {rowData.surname}
        //         </div>
        //       )
        //     },
        //   },


        // ]}


        options={{
          exportButton: true,
        }}





      // components={{
      //     Toolbar:props=>(
      //         <div>
      //             <MTableToolbar {...props}/>
      //             <div style={{padding: '0px 10px'}}>
      //       <Chip label="Chip 1" color="secondary" style={{marginRight: 5}}/>
      //       <Chip label="Chip 2" color="secondary" style={{marginRight: 5}}/>
      //       <Chip label="Chip 3" color="secondary" style={{marginRight: 5}}/>
      //       <Chip label="Chip 4" color="secondary" style={{marginRight: 5}}/>
      //       <Chip label="Chip 5" color="secondary" style={{marginRight: 5}}/>
      //     </div>
      //         </div>
      //     )
      // }}


      ></MaterialTable>

    </div>
  )
}
