import React, { useState, useEffect } from 'react';
import { JSEncrypt } from "jsencrypt";  // reference https://bartlomiejmika.com/post/2022/how-to-perform-rsa-encryption-in-javascript-and-golang/
//https://www.npmjs.com/package/node-rsa   THIS DID NOT WORK, ONLY FOR NODE AND NOT FOR REACT
import Wrapper from '../wrappers/RSA.js'  // this is for styled components

//reference https://www.npmjs.com/package/react-syntax-highlighter
// reference https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const RSAPage = () => {

  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [ToggleHelpRSA_1, setToggleHelpRSA_1] = useState('');
  const [ToggleHelpRSA_2, setToggleHelpRSA_2] = useState('');
  const [ToggleHelpRSA_3, setToggleHelpRSA_3] = useState('');

  

  const generateRSAKeys = () => {
  
    //check to make sure user does not overwrite old keys on accident
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm
    // ok = true/ cancel = false
    if (privateKey || publicKey) {
      if (window.confirm("Are you sure you want to overwrite existing fields?")) {
        window.alert("Generating your keys!");
        setPrivateKey("");
        setPublicKey("");
      }
      else{
        window.alert("Canceled key pair generation!");
        return;
      }
    }

    // reference https://bartlomiejmika.com/post/2022/how-to-perform-rsa-encryption-in-javascript-and-golang/
    let crypt = new JSEncrypt({default_key_size: 2048})    
    let publicKey_generated = crypt.getPublicKey()  //can't pass directly to set state or error
    let privateKey_generated  = crypt.getPrivateKey()

    

    setPrivateKey(privateKey_generated)
    setPublicKey(publicKey_generated)

    console.log('generated from crypt')
    console.log(crypt)
    console.log(privateKey_generated)
    console.log(publicKey_generated)
  }


  const encryptWithRSAPublicKey = () => {

      //check if RSA public key is empty
      if (!publicKey) {
        console.log("RSA public key is empty");
        window.alert("RSA public key is empty!");
        return;
      }
    
    let text_to_encrypt_with_pub_key_field = document.getElementById("text_to_encrypt_with_pub_key")
    let text_to_encrypt_with_pub_key= text_to_encrypt_with_pub_key_field.value

        //check if text to encrypt with RSA public key is empty
        if (!text_to_encrypt_with_pub_key) {
          console.log("Text to encrypt with RSA public key is empty");
          window.alert("Text to encrypt with RSA public key is empty!");
          return;
        }
    

  let crypt2 = new JSEncrypt() 

  // reference https://www.npmjs.com/package/jsencrypt
  crypt2.setPublicKey(publicKey)

  // window.alert(text_to_encrypt_with_pub_key);
  let encrypted_string_with_public_key = crypt2.encrypt(text_to_encrypt_with_pub_key)
  // console.log(encrypted_string_with_public_key)
  // window.alert(encrypted_string_with_public_key);

  // set field to encrypted text
  let encrypted_text_with_pub_key_field = document.getElementById("text_encrypted_with_pub_key")
  encrypted_text_with_pub_key_field.value = encrypted_string_with_public_key

  }


  const decryptWithPrivateKey = () => {

    // <textarea id="rsa_private_key_field" style={{height:'450px'}}></textarea>
    // <textarea id="text_to_decrypt_with_private_key"></textarea>
    // <p>Text Decrypted with Private Key</p>
    // <textarea id="decrypted_text_using_private_key"></textarea>

    let private_key_field = document.getElementById("rsa_private_key_field")
    let rsa_private_key_from_textarea = private_key_field.value  //has to be innerHTML not innerText for some reason
    // console.log(rsa_private_key_from_textarea)

    //check if RSA private key is empty
    if (!rsa_private_key_from_textarea) {
      console.log("RSA private key is empty");
      window.alert("RSA private key is empty!");
      return;
    }

    
    let text_to_decrypt_with_private_key_field = document.getElementById("text_to_decrypt_with_private_key")
    let text_to_decrypt_with_private_key= text_to_decrypt_with_private_key_field.value

        //check if text to encrypt with RSA public key is empty
        if (!text_to_decrypt_with_private_key) {
          console.log("Text to decrypt with RSA private key is empty");
          window.alert("Text to decrypt with RSA private key is empty!");
          return;
        }
      


    let crypt3 = new JSEncrypt()

    
    // reference https://www.npmjs.com/package/jsencrypt
    crypt3.setPrivateKey(rsa_private_key_from_textarea)
    let decrypted_string_with_private_key = crypt3.decrypt(text_to_decrypt_with_private_key)

    
    // set field to decrypted text
    let decrypted_text_with_private_key_field = document.getElementById("decrypted_text_using_private_key")
    decrypted_text_with_private_key_field.value = decrypted_string_with_private_key


  }

  const CLI_Encrypt_With_Public_Key_String = "openssl aes-256-cbc -in secretfile.txt -out secretfile.txt.enc -pass file:secret.key"


  return (
    <Wrapper>
    <div className="pageContainer">
      <h1>RSA Page</h1>
      <p>This is the RSA page.</p>
      <button className="button_purple" onClick={()=> generateRSAKeys()}>Generate RSA Key Pair</button>
      <button className="button_gray" onClick={()=> setToggleHelpRSA_1(!ToggleHelpRSA_1)}>?</button>
      {ToggleHelpRSA_1 && (
        <div className='help'>
          <span><strong>Generating an RSA Public and Private Key</strong></span>
          <p> CSH #1 - explain benefits of features</p>
          <p> This generates an RSA Private and Public Key Pair.  You need to save these to use them in the future.</p>
          <p> The public key can be given to multiple users, while the private key must be kept safe.</p>
          <br/>
          <span><strong>CLI Approach - Windows</strong></span>
          <p> CSH #8 - encourage tinkerers  and CSH #7 provide diff approaches</p>
          <div style={{paddingLeft:"30px"}}>
             <li>Open the Command Prompt</li>
             <li>Type the following command, replacing %USERNAME% with your actual user name:</li>
             <li>
              {/* Reference https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html for syntax highlighting */}
                <div style={{width:"50%", display:"inline-block", alignItems: "center", verticalAlign: "middle"}}>
                <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                ssh-keygen -f C:\Users\%USERNAME%\.ssh\test
                </SyntaxHighlighter>
                </div>
              </li>             
             <li>You should now have a private key in your .ssh folder named test and a public key named test.pub</li>
          </div>
          
        </div>
      )}
      <br></br>
      <div className='twoColumn' style={{display:'flex', flexDirection:'row', width:'100%', alignItems: 'flex-start'}}>
      <div style={{width:'30%', marginRight: '5%'}}>
      <p>RSA Private Key</p>      
      <textarea value={privateKey} id="rsa_private_key_field" style={{height:'450px', width:'100%'}} onChange={(e) => setPrivateKey(e.target.value)} ></textarea>
      </div>            
      <div style={{width:'30%'}}>
      <p>RSA Public Key</p>
      <textarea value={publicKey} id="rsa_public_key_field" style={{height:'450px', width:'100%'}} onChange={(e) => setPublicKey(e.target.value)} ></textarea>
      </div>
      </div>      
      <br></br>
      <br></br>
      <button className="button_green" onClick={()=> encryptWithRSAPublicKey()}>Encrypt Text with RSA Public Key</button>
      <button className="button_gray" onClick={()=> setToggleHelpRSA_2(!ToggleHelpRSA_2)}>?</button>
      {ToggleHelpRSA_2 && (
        <div className='help'>
          
          <span><strong>CLI Approach - Windows</strong></span>
          <li></li>
          <li>
          <div style={{width:"60%", display:"inline-block", alignItems: "center", verticalAlign: "middle"}}>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
              placeholder
            </SyntaxHighlighter>
            </div>
          </li>
          <li></li>
          <li><strong>Reference:</strong> &nbsp; https://www.bjornjohansen.com/encrypt-file-using-ssh-key</li>       
        </div>
      )}
      <br></br>
      <br></br>
      <p>Text to Encrypt</p>      
      <textarea id="text_to_encrypt_with_pub_key"></textarea>
      <p>Text Encrypted with Public Key</p>
      <textarea id="text_encrypted_with_pub_key"></textarea>
      <br></br>
      <br></br>
      <button className="button_red" onClick={()=> decryptWithPrivateKey()}>Decrypt Text with RSA Private Key</button>
      <button className="button_gray" onClick={()=> setToggleHelpRSA_3(!ToggleHelpRSA_3)}>?</button>
      {ToggleHelpRSA_3 && (
        <div className='help'>
          <li></li>
          <li>
          <div style={{width:"60%", display:"inline-block", alignItems: "center", verticalAlign: "middle"}}>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
              placeholder
            </SyntaxHighlighter>
            </div>
          </li>
          <li></li>
          <li><strong>Reference:</strong> &nbsp; https://www.bjornjohansen.com/encrypt-file-using-ssh-key</li>         
        </div>
      )}
      <br></br>
      <br></br>
      <p>Text to Decrypt</p>      
      <textarea id="text_to_decrypt_with_private_key"></textarea>      
      <p>Text Decrypted with Private Key</p>
      <textarea id="decrypted_text_using_private_key"></textarea>
      <br></br>
      <br></br>
      <br></br>
    </div>
    </Wrapper>
  );
}

export default RSAPage;