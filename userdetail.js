let API="https://smart-tuition-management-backend.onrender.com/user"
let API1="https://smart-tuition-management-backend.onrender.com/admin"

async function load(){
    let getname3=document.getElementById("getname");
    let getname2=document.getElementById("getname1")
    let getemployeeid1=document.getElementById("getemployeeid");
    let getemail1=document.getElementById("getemail");
    const response=await fetch(`${API}/getstudent`,{
        credentials:"include"
}) 
   
    const data=await response.json();
    data.alldata.forEach(s=>{
        if(s.changepassword=="no"){
            window.location.href="changepassword.html"
        }
        getname3.innerHTML=s.name
        getname2.innerHTML=s.name
       getemployeeid1.innerHTML=s.EmployeId
       getemail1.innerHTML=s.email
       totalfee=s.totalfee
       duration=s.duration
    })
   

   if(!data.loggedIn){
     window.location.href="userlogin.html"
   }

}
   async function getfees(){
     const response=await fetch(`${API}/getuserfee`,{
        credentials:"include"
     })
     const data=await response.json()
     console.log(data)
     let paidfee=0;
     let output=`<table id=tablestyle>
          <tr>
         <th>Date</th>
         <th>Paid Fees</th>
         <th>Payment Mode </th>
         </tr>`
     data.forEach(s=>{
         output+=`<tr>
         <td>${s.date2.split("T")[0]}</td>
         <td>${s.paidfee}</td>
         <td>${s.paymentmode}</td>
         </tr>`
         paidfee+=(Number(s.paidfee))
     })
   
     output+=`</table>`
     
     console.log(totalfee,duration)
       document.getElementById("totalfee").innerText = totalfee
         document.getElementById("paidfee").innerText = paidfee
        let remaining=totalfee - paidfee
     document.getElementById("remainingfee").innerText = remaining
     let installmentAmount = totalfee / duration;
     let paidInstallments = Math.floor(paidfee / installmentAmount);
    let installmentsLeft = duration - paidInstallments;
    document.getElementById("durationleft").innerText = installmentsLeft;
    document.getElementById("remainingfee").style.color = 
    remaining > 0 ? "#e74c3c" : "#28a745";
     let progress = (paidfee / totalfee) * 100; 

      let bar = document.getElementById("progress-bar");
      bar.style.width = progress + "%";
      bar.innerText = Math.floor(progress) + "%";
       document.getElementById("feetable").innerHTML=output
   }
 
   getfees()
   async function loadnotification(){
        let usercount1=document.getElementById("usercount")
        const response=await fetch(`${API}/getnotification`,{
            credentials:"include"
        })
        const data=await response.json()
        let count=0;
        data.forEach(s=>{
            count++;
        })
        usercount1.innerText=count;
    }
    loadnotification()

    async function notificationpop(){
    let messageshow1=document.getElementById("messageshow");
    messageshow1.innerHTML = ""; 
    if(messageshow1.style.display==="block"){
        messageshow1.style.display="none"
    }
    else{
        messageshow1.style.display="block"
    }
    const response=await fetch(`${API}/getnotification`,{
        credentials:"include"
    })
    const data=await response.json()
    data.forEach(s=>{
         messageshow1.innerHTML+=`
        <div class="noti-item">
            <strong>${s.notificationtype}</strong><br>
            <span>${s.message}</span>
        </div>
    `;
    });
    document.getElementById("usercount").innerText=0;

}

async function loadattend1(){
    const response=await fetch(`${API}/getstudentattend`,{
        credentials:"include"
})
    const dataattend=await response.json()
    console.log(dataattend)
     let total = dataattend.length
    let present = 0

    let output=`<table class="attendance-table">
    <tr>
    <th>Date</th>
    <th>Record</th>
    </tr>`

   dataattend.forEach(s=>{
     if(s.status=="Present"){
            present++
        }
    output+=`<tr>
     <td>${s.date1}</td>`
     if(s.status=="Present"){
         output+=`<td><span class="status present">${s.status}</span></td>`
   }
         else if(s.status=="Absent"){
             output+=`<td><span class="status absent">${s.status}</span></td>`
         }
       
     output+=`</tr>`
      })
   output+="</table>"
   document.getElementById("attendshow").innerHTML=output;
    let percent = total ? ((present/total)*100).toFixed(1) : 0

    document.getElementById("totalclasses").innerText = total
    document.getElementById("presentclasses").innerText = present
    document.getElementById("attendancepercent").innerText = percent + "%"
}

async function logoutstudent(){
    const response=await fetch(`${API}/logout1`,{
        method:"POST",
        headers: { "Content-Type":"application/json" },
    })
    if(response.ok){
        window.location.href="userlogin.html"
    }else{
        console.error("server logout failed")
    }
}
loadattend1()

load()