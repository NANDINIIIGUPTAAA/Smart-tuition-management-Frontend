let API="https://smart-tuition-management-backend.onrender.com/admin"
async function adminlogin(){
    let email=document.getElementById("semail").value;
    let password=document.getElementById("spassword").value;

    const response=await fetch(`${API}/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({email,password})
    })
    const data=await response.json();
    console.log(data)
    document.getElementById("msg").innerHTML=data.message;
    if(data.message=="Login Successful"){
        window.location.href="admindetails.html"
    }
}