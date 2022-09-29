const express= require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https= require("https");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/signup.html");
});
app.post("/", (req, res)=>{
    var firstName= req.body.fName;
    var lastName=req.body.lName;
    var eid= req.body.eId;
    
    var data= {
        members:[
            {
                email_address: eid,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName,
                },
            }
        ]
    }
    const jsonData= JSON.stringify(data);
    const url = "https://us12.api.mailchimp.com/3.0/lists/075a456aea";
    const options= {
        method: "POST",
        auth: "Jenil:7408a1fb565943832e2f13be0b43620f-us12"
    }
    const request =https.request(url, options, (response)=>{
        response.on("data", (data)=>{
            var datta= JSON.parse(data);
            console.log(datta);
            if(response.statusCode === 200 && datta.error_count===0){
                res.sendFile(__dirname+"/success.html");
            }
            else{
                res.sendFile(__dirname+"/failure.html");
            }
        });
    });
    request.write(jsonData);
    request.end();
});




app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server has started!");
});



// api key
// 7408a1fb565943832e2f13be0b43620f-us12

// list id
// 075a456aea