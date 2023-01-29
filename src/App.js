import './App.css';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import {abi} from './config';
import {useState} from 'react';
import { Contract, ethers } from 'ethers';
import Collections from './components/Collections'

function App() {

  const [nameArtist,setnameArtist] = useState('');
  const [descArtist,setdescArtist] = useState('');
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contractAddress ='0xD082e7057C9531A13AddCe15436E833917Cd8D77';
    const contractABI = abi;
    const filfy =new Contract(
      contractAddress,
      contractABI,
      signer
    );

  
  async function createNewArtist(){
    const newArtist = await filfy.AddStreamerDetails(nameArtist,descArtist);
    await newArtist.wait();
    console.log("added new User", newArtist.hash);
  
    console.log("Written");
  }

  return (
    <div className="App">
      <form id="form" class="validate">
        <div class="form-field">
          <input type="text" id="fname" placeholder="Name" onChange={e => setnameArtist(e.target.value) }  required />
        </div>
        <div class="form-field">
          <input type="text" id="desc" placeholder="Description" onChange={e => setdescArtist(e.target.value) } required />
        </div>
        {/* <div class="form-field">
          <input type="file" id="profile_pic" required />
        </div> */}
        <div class="form-field">
          <input type="submit" onClick={(e)=> {createNewArtist(); e.preventDefault();} }  value="Sign Up" />
        </div>
      </form>
      <BrowserRouter>
        <Routes>
          <Route path="/collection"  element={<Collections />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
