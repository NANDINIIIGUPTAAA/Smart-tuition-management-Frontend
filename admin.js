let API="https://smart-tuition-management-backend.onrender.com/admin"
let API2="https://smart-tuition-management-backend.onrender.com/fees"
let API3="https://smart-tuition-management-backend.onrender.com/user"
let showstudents1=document.getElementById("showstudents");

async function load(){
    let getname1=document.getElementById("getname")
    const response=await fetch(`${API}/getstudent`,{
        credentials:"include"
}) 

    const data=await response.json();
    console.log(data)
    getname1.innerHTML=data.alldata.name
     if(data.loggedIn){
        let total=data.data.length;
        let present = 0;
        let absent = 0;
        data.data.forEach(s=>{
             if(s.enable1=="yes"){
                present++;
            }else{
                absent++;
            }
        });
         document.getElementById("totalstudents").innerText = total;
        document.getElementById("presentstudents").innerText = present;
        document.getElementById("absentstudents").innerText = absent;
    }
    
 
        
    if(data.loggedIn){
    let output=`<table class="employee-table">
              <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
                `;
    data.data.forEach(s=>{
        if(s.enable1=="no"){
            output+=`<tr style="background-color:#a7a7a7">`
        }
        else{
            output+=`<tr>`
        }
        output+=`<td id="studentid">${s.EmployeId}</td>
        <td>${s.name}</td>
        <td>${s.email}</td>
        <td>${s.phoneno}</td>
        <td>
        <button onclick="showEdit('${s._id}','${s.name}', '${s.email}', '${s.phoneno}')">Edit</button>
        <button onclick="showAttendance('${s.name}','${s.email}')">Attendance</button>`
         if(s.enable1=="no"){
            output+=`<button onclick="disablestudent('${s._id}','yes')">Enable</button>`
         }
         else{
            output+=` <button onclick="disablestudent('${s._id}','no')">Disable</button>`
         }
        output+=`<button onclick="showfeespaid('${s.name}', '${s.email}','${s.totalfee}','${s.paidfee}')">Fee Paid</button>`
        output+=`<button onclick="deleteStudent('${s._id}')">Delete</button>
      
        </td>
        </tr>
        `;
    })
    output+=`</table>`;
    showstudents1.innerHTML=output;
}
else{
    window.location.href="adminlogin.html"
}
}



 async function showfeespaid(name,email,totalfee,paidfee){
    const response = await fetch(`${API2}/getfees?email=${email}`);
    const user = await response.json();
    let totalfee1 = user.totalfee || 0;
    let paid = user.paidfee || 0;
    let remainingfee = totalfee1 - paid;
    let box=document.getElementById("feesbox");
    box.style.display="flex";
    let output=`<div id=feespaid>
    <h2>Fees paid by ${name}</h2>
    <div class="feesinfo">
      <p id="totalfees">Total Fees: ₹${totalfee1}</p>
    <p id="paidisplay">Paid: ₹${paid}</p>
    <p id="remainingfees">Remaining: ₹${remainingfee}</p>
        </div>

    <input type="text" id="paidfees" placeholder="Enter the amount">
    <select id="paymentmode">
            <option value="">Select Payment Mode</option>
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
        </select>
        
        <label for="">Next Due Date</label>
        <input type="date" name="All Dates" id="dateinput">
                 
    
    <button onclick="savefees('${email}')">Save</button>
    <button onclick="closefees()">Cancel</button>
     <div id="history"></div>
    </div>`;
    box.innerHTML=output;

}
async function savefees(email){
    let paidInput=document.getElementById("paidfees").value;
    let paymentmode=document.getElementById("paymentmode").value;
    let duedate=document.getElementById("dateinput").value;
    const paidfee = parseInt(paidInput);
    if(isNaN(paidfee) || !paymentmode){
        alert("Enter a valid amount and select payment mode");
        return;
    }
    const response=await fetch(`${API2}/savefees`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email,paidfee,paymentmode,duedate})
    })
    const data=await response.json();
    if(response.ok){
      const paidDisplay = document.getElementById("paidisplay");
     const remainingDisplay = document.getElementById("remainingfees");
     const total = parseInt(document.getElementById("totalfees").innerText.replace("Total Fees: ₹",""));
     const newPaid = data.totalpaid;
        const newRemaining = total - newPaid;
        paidDisplay.innerText = `Paid: ₹${newPaid}`;
        remainingDisplay.innerText = `Remaining: ₹${newRemaining}`;
        document.getElementById("history").innerHTML=data.message;
       setTimeout(() => {
            window.location.href = "admindetails.html";
        }, 1000);
    }

    load();
}
function closefees(){
    document.getElementById("feesbox").style.display="none";
}
async function addStudent(){
    let EmployeId=document.getElementById("studentid").value;
    let name=document.getElementById("sname").value;
    let email=document.getElementById("semail").value;
    let phoneno=document.getElementById("sphoneno").value;
    let totalfee=document.getElementById("sfees").value;
    let course=document.getElementById("scourse").value;
    let duration=document.getElementById("sduration").value;
    let password=document.getElementById("spassword").value;
    let confirmpassword=document.getElementById("scpassword").value;

    const response=await fetch(`${API}/createstudent`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({EmployeId,name,email,phoneno,totalfee,course,duration,password,confirmpassword})
    });
    const data=await response.json();
    document.getElementById("msg").innerHTML=data.message;
     if(response.ok){
    window.location.href = "admindetails.html";
}
    console.log(data);
    load();
}

async function addnotification(){
    let email=document.getElementById("semail").value;
    let message=document.getElementById("smessage").value;
    let notificationtype=document.getElementById("stype").value;
    let date3=document.getElementById("sdate").value;

    const response=await fetch(`${API}/createnotification`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email,message,notificationtype,date3})

    });
    const data=await response.json()
    document.getElementById("msg").innerHTML=data.message;
    
    if(response.ok){
        window.location.href="admindetails.html";
    }
    console.log(data);
    load()

}
async function disablestudent(id,status){
    console.log(id)
    const response=await fetch(`${API}/disable1`,{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({id,status})
    })
    const data=await response.json();
    console.log(data)
    document.getElementById("msg").innerHTML=data.message;

    load()
}
function showAttendance(name,email){
      let box = document.getElementById("attendanceBox");
    box.style.display = "flex";
    let output = `
        <div id="attBox">
            <h2>Attendance for ${name}</h2>

            <input type="date" id="date">

            <select id="status">
                <option value="">Select</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
            </select>

            <button onclick="saveAttendance('${email}')">Save</button>
            <button onclick="closeAttendance()">Cancel</button>
        </div>
    `;
    box.innerHTML = output;
  
    // closeAttendance();
}
function closeAttendance(){
    document.getElementById("attendanceBox").style.display="none";
}
async function saveAttendance(email){
    const date1 = document.getElementById("date").value;
    const status = document.getElementById("status").value;

    if(!date1 || !status){
        alert("Select date and status");
        return;
    }

    const response = await fetch(`${API}/attendance`, {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({email, date1, status })
    });

    const data = await response.json();

    document.getElementById("attendanceBox").innerHTML=data.message;
}


function showEdit(id,name,email,phoneno){
    let editstudents1=document.getElementById("editstudents");
    editstudents1.style.display="flex";
    let editoutput=`<div class="editbox">
        <h2>Edit Student Details</h2>
        <input type="text" id="upid" value="${id}" hidden>
        <input type="text" id="upname" value="${name}">
        <input type="email" id="upemail" value="${email}">
        <input type="text" id="upphoneno" value="${phoneno}">
        <button onclick="updateStudent()">Update</button>
       <button onclick="hideEdit()">Cancel</button>
        </div>`;
    editstudents1.innerHTML=editoutput;
}
// async function addattend(){
//     let email=document.getElementById("upemail").value
//     let date1=document.getElementById()
// }
function hideEdit(){
    let editstudents1=document.getElementById("editstudents");
    editstudents1.style.display="none";
    editstudents1.innerHTML="";
}
async function updateStudent(){
    let id=document.getElementById("upid").value;
    let name=document.getElementById("upname").value;
    let email=document.getElementById("upemail").value;
    let phoneno=document.getElementById("upphoneno").value;
    const response=await fetch(`${API}/update/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,email,phoneno})
    })
    const data=await response.json();
    document.getElementById("msg").innerHTML=data.message;
    hideEdit();
    load();
}
async function deleteStudent(id){
    const response=await fetch(`${API}/delete/${id}`,{
        method:"DELETE"
    })
    const data=await response.json()
    document.getElementById("msg").innerHTML=data.message;
    load();
}

async function logoutstudent(){
    const response=await fetch(`${API}/logout`,{
        method:"POST",
        headers: { "Content-Type":"application/json" },
    })
    if(response.ok){
        window.location.href="adminlogin.html"
    }else{
        console.error("server logout failed")
    }
}

load();