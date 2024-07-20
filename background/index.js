import { Storage } from "@plasmohq/storage"
 
const storage = new Storage()

storage.get("usersdata").then( (data) => {
    console.log(data)
}).catch()


chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({ url: "https://programari.gov.md/en/maeie/appointments/69a7a79e-b44c-49de-8e96-0ccfb564f65a" }, (tab) => {
       

      
    });
});