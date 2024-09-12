import { FaCode, FaPython } from "react-icons/fa6";
import "./App.css";
import { IoPlanetOutline, IoSend } from "react-icons/io5";
import { IoIosChatboxes } from "react-icons/io";
import { useState,useEffect,useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";


function App() {
  const [message, setMessage] = useState("");
  const [responseScreen, setIsResponseScreen] = useState(false);
  const[messages,setMessages] = useState([]);

  const hitRequest = () => {
    if(message){
      generateResponse(message);
    }
    else{
      alert("You must give prompt...");
    }
  }

  const generateResponse = async(message) => {
    
    const allMessages = [];
    const genAI = new GoogleGenerativeAI("AIzaSyCD-wvJhfJru8qiCfVX_e8rBk9SJbquUPo");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(message);
    allMessages.push(
      ...messages,
      {
        type:"userMsg",
        text:message
      },
      {
        type:"responseMessage",
        text:result.response.text()
      }
    )
    setMessages(allMessages);
    setIsResponseScreen(true);
    setMessage("");
    console.log(result.response.text());
  }

  const onClickHandler = () => {
    setMessage("");
    setMessages([]);
    setIsResponseScreen(false);
  }

  const chatContainerRef = useRef(null); // Reference to the chat container

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen w-screen bg-[#0E0E0E] text-white flex flex-col justify-between">
      {responseScreen ? (
        <div ref={chatContainerRef} className="flex-1 py-12 mb-[120px] w-full max-w-[70vw] mx-auto flex flex-col gap-6">
          {/* Header */}
          <div className="w-full flex justify-between items-center">
            <p className="font-inter text-white font-medium text-2xl tracking-wide">
              AssistMe
            </p>
            <button onClick={onClickHandler} className="bg-[#181818] text-xl py-2 px-4 hover:bg-[#817c7c] hover:text-[#2e2d2d] transition-all duration-150 rounded-full">
              New Chat
            </button>
          </div>

          {/* Chat Area */}
          <div className="chat-container mt-8 flex-1 overflow-y-auto flex  flex-col gap-6">

            {
             messages?.map((msg,index)=>{
              return(
                <div key={index} className={`bg-[#181818] ${msg.type ==="userMsg"?"self-end":"self-start"} min-w-fit p-4 rounded-3xl px-6`}>
                  {msg.text}
                </div>
              )
             })
            }
 
          </div>
        </div>
      ) : (
        <div className="h-full mt-10 w-[70vw] mx-auto flex flex-col justify-center items-center gap-14">
          <div className="font-inter font-medium text-4xl">AssistMe</div>

          {/* Boxes */}
          <div className="flex justify-center items-center min-w-[800px] gap-4">
            <div className="bg-[#181818] max-w-[190px] max-h-[120px] rounded-lg text-sm p-6 relative">
              <p className="font-inter font-medium mb-6">
                What is coding? How can we learn it?
              </p>
              <div className="absolute right-8 bottom-4 text-lg mt-5">
                <FaCode />
              </div>
            </div>

            <div className="bg-[#181818] max-w-[190px] max-h-[110px] rounded-lg text-sm p-6 relative">
              <p className="font-inter font-medium mb-6">
                Which is the red planet of the solar system?
              </p>
              <div className="absolute right-8 bottom-4 text-lg mt-5">
                <IoPlanetOutline />
              </div>
            </div>

            <div className="bg-[#181818] max-w-[190px] max-h-[120px] rounded-lg text-sm p-6 relative">
              <p className="font-inter font-medium mb-6">
                In which year was Python invented?
              </p>
              <div className="absolute right-8 bottom-4 text-lg mt-5">
                <FaPython />
              </div>
            </div>

            <div className="bg-[#181818] max-w-[190px] max-h-[110px] rounded-lg text-sm p-6 relative">
              <p className="font-inter font-medium mb-6">
                How can we use AI for adoption?
              </p>
              <div className="absolute right-8 bottom-4 text-lg mt-5">
                <IoIosChatboxes />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Input Box at Bottom */}
      <div className="w-full flex flex-col items-center p-6 bg-[#0E0E0E] fixed bottom-0 left-0 right-0">
        <div className="inputBox w-[70vw] text-[15px] py-[7px] flex items-center bg-[#181818] rounded-full">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            className="p-[10px] pl-[15px] bg-transparent flex-1 outline-none border-none"
            placeholder="Write your message here..."
            id="messageBox"
          />
          {message === "" ? (
            ""
          ) : (
            <i className="text-green-500 text-[20px] mr-5 cursor-pointer">
              <IoSend onClick={hitRequest}/>
            </i>
          )}
        </div>
        <p className="text-[gray] text-[14px] my-4">
          AssistMe is developed by Ravi. This AI uses the Gemini API for responses.
        </p>
      </div>
    </div>
  );
}

export default App;
