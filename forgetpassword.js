let API="https://smart-tuition-management-backend.onrender.com/user"

async function sendOTP(){
    let email=document.getElementById("eemail").value;
      if (!email) {
            alert("Please enter email");
            return;
        }
    let response=await fetch(`${API}/sendotp`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email})
 });
    let data;
        try {
            data = await response.json();
        } catch {
            data = {};
        }
     if(response.ok){
        alert("OTP sent to email")
          document.getElementById("otpBox").style.display = "block";
    } else {
        alert(data.message);
    }
}

async function resetPassword(){
    let email=document.getElementById("eemail").value;
    let otp=document.getElementById("otp").value;
    let newPassword=document.getElementById("newPassword").value;
    let confirmPassword=document.getElementById("confirmPassword").value;

    if(newPassword !== confirmPassword){
        alert("Passwords do not match");
        return;
    }

    let response=await fetch(`${API}/forgetpassword`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email,otp,newPassword})
    });
    let data=await response.json();
    if(response.ok){
        alert("Password reset successfully");
        document.getElementById("otpBox").style.display = "none";
    } else {
        alert(data.message);
    }
}

