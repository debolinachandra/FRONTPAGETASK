import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './App.css';
const App = () => {
  // const[status,setStatus]=useState(null);
  let msg="";
// eslint-disable-next-line
  const [data, setData] = useState({
    email: "",
    fist_name: "",
    last_name: "",
    pwd: "",
    username: ""
  });
  useEffect(() => {
    getUser();
  }, []);

  
  const getUser = () => {
    fetch('http://3.6.93.159:7883/machstatz/get_all_users')
      .then(results =>  JSON.parse(results))
      .then(res => setData(res.json())
      );
  }



  const addUser = (e) => { 
    e.preventDefault();
    if(e.target.email===data.email || e.target.pwd===data.pwd)
    {
      msg="email and user name should be unique to other existing users";
    }
    else{
      setData({...data,[e.target.name]: e.target.value });
    }
    fetch('http://3.6.93.159:7883/machstatz/add_new_user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(results =>results.json())
      //results.json()
      .then(res =>
        console.log('"Created the new user successfully"',res),       
      )
      .catch(error => {
        console.log('"User with provided email or username is already exist"')
      });
  }


  const deleteUser = (email) => {
    fetch('http://3.6.93.159:7883/machstatz/delete_existing_user/${email}', {
      method: 'DELETE'
    })
    .then(res =>
      console.log('"User deleted successfully"',res)     
    )
    .catch(error => {
      console.log('"Unable to delete the user or user may not exist"')
    });
  }

  return (
    <>
      <div>
        {
          data.map((item,i)=> (
            <Card>
              <h4 key={i}>{item.first_name}{item.last_name}</h4>
              <span  onClick={deleteUser(item.email)}><DeleteIcon/></span>
              <span><EditIcon/></span> 
            </Card>
          ))

        }
      </div>

      <div>
        <div>
          Add User
        </div>
        <form onSubmit={addUser}>
          <div>
          {msg ? <span>{msg}</span> : null}
            <label>First Name</label><br /><input type="text" required name="fist_name" placeholder="enter your first name" value={data.fist_name} onChange={getUser} /><br/>
            <label>Last Name</label><br /><input type="text" required name="last_name" placeholder="enter your last name" value={data.last_name} onChange={getUser} /><br/>
            <label>Profiles</label><br />
            <select>
              <option value="default">Select</option>
              <option value="india">india</option>
              <option value="china">china</option>
            </select><br/>
            <label>Username</label><br /><input type="text" required name="username" placeholder="enter username" value={data.username} onChange={getUser} /><br/>
            <label>Email Address</label><br /><input type="text" required name="email" placeholder="enter your email id" value={data.email} onChange={getUser} /><br/>
            <label>Password</label><br /><input type="text" required name="pwd" placeholder="enter Password" value={data.pwd} onChange={getUser} /><br/>
          </div>
          <div>
            <button type="reset" class="btn btn-outline-primary">Cancel</button>
            <button type="submit" class="btn btn-outline-primary" >Add</button>
          </div>
        </form>
      </div>

    </>
  );

}
export default App;




