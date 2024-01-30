import React, { useState } from 'react'

const Home = (isLoggedIn) => {
    // if(isLoggedIn)
    const [url, setUrl] = useState('url');
    function changeHandler(e) {
        setUrl(e.target.value);
    }



    async function submitHandler (e){
        e.preventDefault();
        console.log(url);
        const res = await fetch('http://localhost:5000/url', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url
            })
        });
        const data=res.json;
        console.log(data.shortID);
        
    }






    return (
        <div className='w-full  bg-slate-100'>

            <div className='mt-4 m-auto w-9/12 h-[600px] items-center justify-center'>
                <div className='text-[50px] text-blue-700 font-bold flex items-center justify-center'>
                    Trim URLs,  <span className='text-slate-800 ml-2'>Share with ease</span>
                </div>
                <div className='text-gray-500 text-xl flex items-center justify-center flex-col'>
                    <div>
                        Your Shortcut to Sharing! Simplify URLs and enhance link management effortlessly.

                    </div>
                    <div>
                        Trim, customize, and track with ease. Start now!"
                    </div>

                </div>

                <div className='mt-5 m-auto flex flex-col bg-white w-9/12 h-[300px] border-blue-200 rounded-xl'>
                    <form onSubmit={submitHandler}>
                        <div className='flex flex-col  m-4'>
                            <label className='pl-1' htmlFor='url'> Paste long URL</label>
                            <input className='bg-blue-100 rounded-md w-[99%] p-2 h-[40px] mt-5 m-auto ' type='text' placeholder='https://google.com/user/profile-pic/hnoiwf23nr43r43' name='url' onChange={changeHandler}></input>

                            <button type='submit' className='bg-blue-500 mt-10 rounded-md h-[50px] text-slate-800 font-bold text-2xl'>Get Link</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Home