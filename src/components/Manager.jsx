import React, { useEffect, useRef, useState } from "react"
import { IoEyeOutline } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { TiTick } from "react-icons/ti";
const Manager = () => {
    const [copy, setCopy] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const passwordref = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);
    const showPassop = () => {
        setShowPassword(!showPassword);
        passwordref.current.type = showPassword ? "password" : "text";
    };

    const copyText = (text) => {
        toast.success('Copied To Clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text);
        setCopy(true)
        setTimeout(() => {
            setCopy(false);
        }, 2000);
    }


    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, [])
    const savePassword = () => {
        if (form.site.length >= 3 && form.username.length >= 3 && form.password.length >= 3) {
            toast.success('Password Saved!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem('passwords', JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form]);
            setform({ site: "", username: "", password: "" })
        }
        else {
            toast.warn('Fill all the fields!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    const deletePassword = (id) => {
        let con = confirm("Do you want to delete this?");
        if (con) {
            console.log("Passoword Deleting with id", id);
            setPasswordArray(passwordArray.filter(item => item.id !== id));
            localStorage.setItem('passwords', JSON.stringify(passwordArray.filter(item => { item.id !== id })));
            toast.success('Password Deleted!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }
    const editPassword = (id) => {
        console.log("Editing password with id", id)
        setform(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer />
            <div>
                <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-200 opacity-20 blur-[100px]"></div></div>

                <div className=" p-2 pt-2 md:mycontainer min-h-[87.7vh]">
                    <h1 className='text-4xl font-bold text-center'>
                        <span className='text-green-500'> &lt;</span>
                        <span>Pass</span>
                        <span className='text-green-500'>OP/&gt; </span>
                    </h1>
                    <p className="text-green-700 text-lg text-center">Your Own Password Manager</p>

                    <div className='hero flex flex-col text-black p-4 gap-8 items-center'>
                        <input name="site" value={form.site} onChange={handleChange} placeholder="Enter website URL" className='rounded-full border border-green-700 w-full py-1 p-4 ' type="text" />
                        <div className='flex-col md:flex-row flex w-full justify-between gap-8'>
                            <input name="username" value={form.username} onChange={handleChange} placeholder="Enter username" className='rounded-full border border-green-700 w-full py-1 p-4 ' type="text" />
                            <div className="relative">
                                <input ref={passwordref} name="password" value={form.password} onChange={handleChange} placeholder="Enter Password" className='rounded-full border border-green-700 w-full py-1 p-4 ' type="password" />
                                <span onClick={showPassop} className="absolute right-1 top-1 p-1 cursor-pointer">{showPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}</span>
                            </div>
                        </div>
                        <button onClick={savePassword} className="flex justify-center items-center bg-green-500 rounded-full px-5 py-2 w-fit hover:bg-green-600 transition-all duration-[400] ">
                            <lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="hover">
                            </lord-icon>
                            Save</button>
                    </div>
                    <div className="passwords">
                        <h2 className="text-2xl font-bold py-4">Your Passwords</h2>
                        {passwordArray.length === 0 && <div>No Passwords to show</div>}
                        {passwordArray.length != 0 &&
                            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                                <thead className="bg-green-700 text-white">
                                    <tr>
                                        <th className="py-2" >Site</th>
                                        <th className="py-2" >Username</th>
                                        <th className="py-2" >Password</th>
                                        <th className="py-2" >Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-green-100 ">
                                    {passwordArray.map((item, index) => {
                                        return <tr key={index}>
                                            <td className=" py-2 border border-white text-center ">
                                                <div className=" flex justify-center items-center hover:underline"><a target="_blank" href={item.site}>{item.site}</a>
                                                    <div onClick={() => { copyText(item.site) }} className="size-7 pt-2 pl-2 copy-icon cursor-pointer"> {copy ? <TiTick /> : <MdContentCopy />}</div>
                                                </div>
                                            </td>
                                            <td className=" py-2 border border-white text-center ">
                                                <div className="flex justify-center items-center">
                                                    <span> {item.username}</span>
                                                    <div onClick={() => { copyText(item.username) }} className="size-7 pl-2 pt-[7px]  copy-icon cursor-pointer">{copy ? <TiTick /> : <MdContentCopy />}</div>
                                                </div>
                                            </td>
                                            <td className="py-2 border border-white text-center ">
                                                <div className="flex justify-center items-center">
                                                    <span> {item.password}</span>
                                                    <div onClick={() => { copyText(item.password) }} className="size-7 pl-2 pt-[7px] copy-icon cursor-pointer">{copy ? <TiTick /> : <MdContentCopy />}</div>
                                                </div>
                                            </td>
                                            <td className="py-2 border border-white text-center ">
                                                <span className="cursor-pointer mx-1" onClick={() => { editPassword(item.id) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/exymduqj.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </span>
                                                <span className="cursor-pointer" onClick={() => { deletePassword(item.id) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </span>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Manager
