import {  useState } from "react";
import  './index.css'
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [nameFriend,setName] = useState('')
  const [url,setUrl] = useState('https://i.pravatar.cc/48?u=499476')
  const [friends,setFriends] = useState(initialFriends)
  const [selected,setSelected] = useState(null)
  const [show,setShow] = useState(false)

 function AddHandle(friend){
   setFriends((friends)=>[...friends,friend])
   setShow(false)
 }
 function handleSelect(friend){
  setSelected((cur)=>
    cur!==null?
  cur.id===friend.id?null: friend : '')
  setShow(false)
 }

function handleSplitbill(value){
  console.log(value)
 setFriends(friends => friends.map((friend)=>
  friend.id===selected?.id ? {...friend,balance:friend.balance + value} : friend))
  setSelected(null)
}

  return (
    <div className="app"> 
       <ListOfFriend selected={selected} onSelection={handleSelect} friends={friends}/>
       <Form show={show} setShow={setShow} nameFriend={nameFriend} url={url} onAdd={AddHandle} setName={setName} setUrl={setUrl}/>
       {selected && <Bill  onSplit={handleSplitbill}  selected={selected}/>}
    </div>
    
  );
}

function ListOfFriend({friends,onSelection,selected}){
  return(
    <ul>
      {friends.map((friend)=>
      <Friednd selected={selected}  onSelection={onSelection} key={friend.id} friend={friend} name={friend.name} id={friend.id} img={friend.image} />)}
    </ul>
  )
}


function Friednd({selected,friend,onSelection}){
    

const isSelected=selected!==null ? selected.id===friend.id : '';

  return(
    <li className= {'friend'} >
      <div>

      <img style={{borderRadius:20,padding:10}} src={friend.image}/>
      </div>
      
      
       <div style={{width:'60%'}} >
      <p>{friend.name}</p>

     {friend.balance>0 ? `You owe ${friend.name} the ${friend.balance}` : friend.balance<0 ? `${friend.name} owes you ${friend.balance}` : `You and ${friend.name} are even` }
     </div>
    <div style={{width:'100%', display:'flex' ,justifyContent:'flex-end'}}>

 
    <button onClick={()=>onSelection(friend)} >{isSelected?'Close' : "Select"}</button>
    
    
     </div>
     
    </li>
  )
}



function Form({setShow,show,nameFriend,onAdd,url,setName,setUrl}){
  

 
  
const HadleSumbit = (e)=>{
  e.preventDefault();
  const newFriend = {name : nameFriend,id: crypto.randomUUID(),balance:0,image:url}
  if (!nameFriend)return
  onAdd(newFriend);
 setName('')
 setUrl('https://i.pravatar.cc/48?u=499476')

}

  
  return(
    <div>
   
    {!show &&<button onClick={()=>setShow(true)}>Add Friend</button>}


   
   {show && <form onSubmit={HadleSumbit}>
      <label>Friend Name <input type="text" value={nameFriend} onChange={(e)=>setName(e.target.value)}/></label>
      <label >Image URL <input  value={url} style={{margin:'14px'}} type="text" onChange={(e)=>setUrl(e.target.value)} /></label>
      <button>Add</button>
      <button onClick={()=>setShow(false)}>Close</button>

    </form>
    } 
  </div>
  )
}


function Bill({selected,onSplit}){
    const [bill,setBill] = useState('');
    const [paidbyUser,setpaidByUser] = useState('');
    const [option,setOption] = useState(1)
  const  aiExpense = bill-paidbyUser

  const OnSubmit = (e) => { 
    e.preventDefault(); 
    setBill('')
    setpaidByUser('')
    if(!bill || !paidbyUser) return; 
    onSplit(option==='you' ? aiExpense:-paidbyUser)

  }

  return(
    <form onSubmit={OnSubmit}>
      <h2>Split A BILL WITH {selected.name}</h2>
     <label><p>Bill Value</p><input type="text" value={bill} onChange={(e)=>setBill(Number(e.target.value))} ></input></label>
     <label><p>Your expense</p><input type="text" value={paidbyUser} onChange={(e)=>setpaidByUser(Number(e.target.value)>bill ? paidbyUser : Number(e.target.value))}></input></label>
     <label><p>{selected.name}'s expense</p> <input type="text" disabled value={aiExpense}/></label>
     <label><p>Who is paying the bill?</p>
     <select value={option} onChange={(e)=> setOption(e.target.value)}>
      <option value={'you'}>You</option>
      <option value={'user'}>{selected.name}</option>

     </select>
     </label>
     <button>Split Bill</button>

    </form>
  )
}

export default App;
