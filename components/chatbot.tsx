export default function ChatBotComponent(){
    return(
            <div id="chatbot" className="invisible fixed chatbot bottom-0 right-0 z-50 pr-8 pb-8">
                <iframe name="chatbotDialogflow" title="DialogFlow" id="chatBotFrame"
                    allow="microphone;"
                    width="350"
                    height="430"
                    data-src="https://console.dialogflow.com/api-client/demo/embedded/114795bd-6431-4b1b-b107-c05d397543f6"
                    src=""
                ></iframe>
            </div>
    );
}

