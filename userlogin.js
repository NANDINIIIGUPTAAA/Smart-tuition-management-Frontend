let API="https://smart-tuition-management-backend.onrender.com/user"

async function userlogin() {
    const email=document.getElementById("semail").value
    const password=document.getElementById("spassword").value

    const response=await fetch(`${API}/login`,{
        method:"POST",
         headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({email,password})
    })
    const data=await response.json()

    console.log(data)
    document.getElementById("msg").innerHTML=data.message;
    alert(msg.innerHTML)
    if(data.message=="Login Successful"){
        window.location.href="userdetail.html"
    }
}