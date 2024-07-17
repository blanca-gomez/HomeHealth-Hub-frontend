import React, {useState} from "react";

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password:'',
    })
    const [message, setMessage] = useState('');

    const handleInput = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try{
            const response = await fetch('http://localhost:3000/auth/signin', {
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json', 
                },
                body: JSON.stringify(form), 
              })
    
              if(response.ok){
                setMessage('¡Bienvenido!');
                
              }else{
                setMessage('Error al iniciar sesión')
    
              }
        }catch (error){
            setMessage(error.message || 'Error al iniciar sesión')
        }
    }

        return(
            <div>
                <h2>Registro</h2>
                <form onSubmit={handleSubmit}>
                    <label>email:</label>
                    <input type='text' value={form.email} name='email' onChange={handleInput}></input>
                    <label>Password:</label>
                    <input type='password' value={form.password} name='password' onChange={handleInput}></input>
                    <button type='submit'>Sign In</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        )
}

export default SignIn;