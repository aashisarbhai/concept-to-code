const mongoose=require("mongoose");
const Chat=require("./models/chat.js");

main()
.then((res)=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats=[
    {
    from:"neha",
    to:"priya",
    msg:"send me your exam sheets",
    created_at: new Date(),
    },
    {
        from:"aashi",
        to:"kishan",
        msg:"how are you",
        created_at:new Date(),
    },
    {
        from:"aastha",
        to:"mummy",
        msg:"call me",
        created_at:new Date(),
    },
    {
        from:"prachi",
        to:"aashi",
        msg:"meet me",
        created_at:new Date(),
    },
];

Chat.insertMany(allChats);