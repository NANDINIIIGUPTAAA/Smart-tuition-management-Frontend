let API="https://smart-tuition-management-backend.onrender.com/admin"
let showattend1=document.getElementById("showattend");
let showrecord1=document.getElementById("showrecord");

async function loadattend() {
    
    const response=await fetch(`${API}/getattendance`,{
        credentials:"include"
})
    const data=await response.json()
    console.log(data)
    let total=data.length;
    let present=0;
    let absent=0;
     
    data.forEach(s=>{
        if(s.status=="Present"){
            present++;
        }else if(s.status=="Absent"){
            absent++;
        }
    });
    
    document.getElementById("totalstudents").innerText = total;
    document.getElementById("presentstudents").innerText = present;
    document.getElementById("absentstudents").innerText = absent;
    let output=`<table border=1>
    <tr>
    <th>Student Id</th>
    <th>Name</th>
    <th>Email</th>
    <th>Date</th>
    <th>Record</th>
    </tr>`

   data.forEach(s=>{
    output+=`<tr>
     <td>${s.User[0].EmployeId}</td>
     <td>${s.User[0].name}</td>
     <td>${s.email}</td>
     <td>${s.date1}</td>`
     if(s.status=="Present"){
         output+=`<td style="background-color:#e6f7ed;color:#16a34a">${s.status}</td>`
   }
         else if(s.status=="Absent"){
             output+=`<td style="background-color:#fee2e2;color:#dc2626">${s.status}</td>`
         }
       
     output+=`<td>
     <button onclick="deletestudent('${s._id}')">Delete</button>
     <button onclick="changerecord('${s._id}','${s.email}','${s.date1}','${s.status}')">Change Record</button>
     </td>
     </tr>
    `
   })
   output+="</table>"
   showattend1.innerHTML=output
}
async function deletestudent(id){
    console.log(id)
    const response=await fetch(`${API}/deleteattend/${id}`,{
        method:"DELETE"
    });
    const data=await response.json()
     document.getElementById("msg").innerHTML=data.message
    loadattend()
}
function changerecord(id,email,date1,status){
    const editattend1=document.getElementById("editattend")
    editattend1.style.display="flex"
    let editoutput1=`<div class="editbox">
                      <h2>Edit record </h2>
                      <input type="hidden" value="${id}" id="epid">

                     <input type="text" value="${email}" id="eemail" readonly>
                    <input type="text" value="${date1}" id="edate" readonly>
                    <select name="attendance" id="eattend">
                    <option value="${status}">${status}</option>
                     <option value="Present">Present</option>
                     <option value="Absent">Absent</option>
                       </select>
                    <input type="submit" value="Update" onclick="edit2()">
                    <input type="submit" value="Cancel" onclick="hideedit3()">
    `
    editattend1.innerHTML=editoutput1
}
function hideedit3(){
        let editattend1=document.getElementById("editattend")
        editattend1.innerHTML=""
        editattend1.style.display="none"
    }
   async function edit2(){
        let id=document.getElementById("epid").value
        let email=document.getElementById("eemail").value
        let date1=document.getElementById("edate").value
        let status=document.getElementById("eattend").value
    
        response=await fetch(`${API}/updateattend/${id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email,date1,status})
        })

        const data=await response.json()
        console.log(data)
        document.getElementById("msg").innerHTML=data.message
        hideedit3()
        loadattend()
    }

async function basedondate(){
    const dateinput1=document.getElementById("dateinput").value
    const response=await fetch(`${API}/getattendancebydate/${dateinput1}`)
    const data=await response.json()
    
    let output=`<table border=1>
    <tr>
    <th>Student Id</th>
    <th>Name</th>
    <th>Email</th>
    <th>Date</th>
    <th>Record</th>
    </tr>`

   data.forEach(s=>{
    output+=`<tr>
     <td>${s.User[0].EmployeId}</td>
     <td>${s.User[0].name}</td>
     <td>${s.email}</td>
     <td>${s.date1}</td>`
     if(s.status=="Present"){
         output+=`<td style="background-color:#e6f7ed;color:#16a34a">${s.status}</td>`
   }
         else if(s.status=="Absent"){
             output+=`<td style="background-color:#fee2e2;color:#dc2626">${s.status}</td>`
         }
       
     output+=`<td>
     <button onclick="deletestudent('${s._id}')">Delete</button>
     <button onclick="changerecord('${s._id}','${s.email}','${s.date1}','${s.status}')">Change Record</button>
     </td>
     </tr>
    `
   })
   output+="</table>"
   showattend1.innerHTML=output
}
async function basedonemail(){
    const searchInput1=document.getElementById("searchInput").value
    const response=await fetch(`${API}/getattendancebyemail/${searchInput1}`)
    const data=await response.json()
    console.log(data)
    let output=`<table border=1>
    <tr>
    <th>Student Id</th>
    <th>Name</th>
    <th>Email</th>
    <th>Date</th>
    <th>Record</th>
    </tr>`
   
   data.forEach(s=>{
    output+=`<tr>
     <td>${s.user[0].EmployeId}</td>
     <td>${s.user[0].name}</td>
     <td>${s.email}</td>

     <td>${s.date1}</td>`
     if(s.status=="Present"){
         output+=`<td style="background-color:#e6f7ed;color:#16a34a">${s.status}</td>`
   }
         else if(s.status=="Absent"){
             output+=`<td style="background-color:#fee2e2;color:#dc2626">${s.status}</td>`
         }
       
     output+=`<td>
     <button onclick="deletestudent('${s._id}')">Delete</button>
     <button onclick="changerecord('${s._id}','${s.email}','${s.date1}','${s.status}')">Change Record</button>
     </td>
     </tr>
    `
   })
   output+="</table>"
   showattend1.innerHTML=output
}
async function getstats(){
    const statusSelect1=document.getElementById("statusSelect").value
    if(statusSelect1 === "all"){
    loadattend();
    return;
}

    const response=await fetch(`${API}/getattendancebystatus/${statusSelect1}`)
    const data=await response.json()
    console.log(data) 
    alert(statusSelect1)
    let output=`<table border=1>
    <tr>
    <th>Student Id</th>
    <th>Name</th>
    <th>Email</th>
    <th>Date</th>
    <th>Record</th>
    </tr>`

   data.forEach(s=>{
    output+=`<tr>
     <td>${s.user[0].EmployeId}</td>
     <td>${s.user[0].name}</td>
     <td>${s.email}</td>
    <td>${s.date1}</td>`
     if(s.status=="Present"){
         output+=`<td style="background-color:#e6f7ed;color:#16a34a">${s.status}</td>`
   }
         else if(s.status=="Absent"){
             output+=`<td style="background-color:#fee2e2;color:#dc2626">${s.status}</td>`
         }
       console.log(s.attendance)
     output+=`<td>
     <button onclick="deletestudent('${s._id}')">Delete</button>
     <button onclick="changerecord('${s._id}','${s.email}','${s.date1}','${s.status}')">Change Record</button>
     </td>
     </tr>
    `
   })
   output+="</table>"
   console.log(output)
   showattend1.innerHTML=output
}
function clearFilter() {
    document.getElementById("dateinput").value = "";
    document.getElementById("searchInput").value="";
    document.getElementById("statusSelect").value="";
    loadattend();
}
loadattend()