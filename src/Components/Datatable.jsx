import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState({
    emailId: '',
    name: '',
    description: '',
    image: null,
  });
  const [editingItemId, setEditingItemId] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const[targetemail,settargetemail] = useState('')



  useEffect(()=>{
    getData()
  },[])

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleInputChange = (e) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setNewItem({
      ...newItem,
      image: e.target.files[0],
    });
  };


  const getData=async()=>{
    const response = await axios.get('http://localhost:5005/getdata')
    
if(response){
    console.log(response.data.data)
    setData(response.data.data)
    // window.location.reload(false);
}
  }

  const handleAdd = async() => {
    // setData([...data, newItem]);
    setNewItem({
      emailId: '',
      name: '',
      description: '',
      image: selectedFile,
    });
    // const postdata = await axios.post(`http://localhost:5005/postdata`,{"name":'omkar'})
    
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {

      const response2 = await axios.post('http://localhost:5005/upload', formData, {headers: {
        'Content-Type': 'multipart/form-data',
      }},);
      // const { imagePath } = response2.data;
      console.log(response2.data)

      const response = await axios.post('http://localhost:5005/postdata', {
        data: newItem,
      });

      

      window.location.reload(false);
      console.log(response.data); // Handle the response from the server
    } catch (error) {
      console.error(error);}

  };

  const handleDelete = async(emailId) => {
    // console.log(emailId)
    // const updatedData = data.filter((item) => item.emailId !== emailId);
    // const emailIdd =  emailId
    try{
      const response=await axios.post('http://localhost:5005/deletedata',{data: emailId})
      // setData(updatedData);
      console.log(response,'iiiiiiiiiiiiiiiiiiiii')
      window.location.reload(false);
    }catch (error) {
      console.error(error);}
   
  };

  const handleEdit = async(emailId) => {
    const itemToEdit = data.find((item) => item.emailId === emailId);
    console.log(emailId,'7777777777777777')
    settargetemail(emailId)

    
  //   try{
  //   const response=await axios.post('http://localhost:5005/editdata',{email:emailId,data:data})
  // }catch(error){
  //       console.log(error);
  // }
     setEditingItemId(emailId);
    // setNewItem(itemToEdit);
  };

  const handleUpdate = async(emailId) => {
   
    try{

      // const updatedData = data.map((item) => {
      //   if (item.emailId === editingItemId) {
      //     return newItem;
      //   }
      //   return item;
      // });
      
      console.log(targetemail,'llllllllllllllllll')
      const payload = {
        emailId:emailId,
        data:newItem
      }
      const dataa = payload.data
      const res = await axios.post(`http://localhost:5005/editdata/${targetemail}`,{dataa})
      // console.log(newItem,'llllllllllllllllll')
      // setEditingItemId(emailId);
      console.log(res)
      window.location.reload(false);

    }catch(error){
          console.log(error);
    }
       

   
    // setData(updatedData);
    setEditingItemId('');
    setNewItem({
      emailId: '',
      name: '',
      description: '',
      image: null,
    });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Email ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.emailId}>
              <td>{item.emailId}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                {item.image && <img src={URL.createObjectURL(item.image)} alt="Item" />}
              </td>
              <td>
                {editingItemId === item.emailId ? (
                  <div>
                    <button onClick={handleUpdate}>Update</button>
                    <span style={{ minWidth: '2px', display: 'inline-block' }}></span>
                    <button onClick={() => setEditingItemId('')}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => handleEdit(item.emailId)}>Edit</button>
                    <span style={{ minWidth: '2px', display: 'inline-block' }}></span>
                    <button onClick={() => handleDelete(item.emailId)}>Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add Item</h2>
      <form className='frm'>
      <div>
        <label>Email ID:</label>
        <input placeholder='Email Id'
          type="text"
          name="emailId"
          value={newItem.emailId}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Name:</label>
        <input placeholder='Name'
          type="text"
          name="name"
          value={newItem.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <input placeholder='Description'
          type="text"
          name="description"
          value={newItem.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" name="image" onChange={handleFileChange} />
      </div>
      </form>
      {editingItemId ? (
        <div>
          <button onClick={handleUpdate}>Update</button>
          <span style={{ minWidth: '2px', display: 'inline-block' }}></span>
          <button onClick={() => setEditingItemId('')}>Cancel</button>
        </div>
      ) : (
        <button className='frmbtn' onClick={handleAdd}>Add</button>
      )}
    </div>
    
  );
};

export default DataTable;
