export default function Page() {
    return (
        <>
            <div className="header">
                <p>header</p>
            </div>
            <div className="featured">
                <p>Featured</p>
            </div>
            <div className="propertyListing">
                <p>Property Listing</p>
            </div>
            <div className="agentList">
                <p>Agent Listing</p>
            </div>
            <div className="contact">
                <p>Contact Info</p>
            </div>
            <div className="chatbot">
                <iframe
                    allow="microphone;"
                    width="350"
                    height="430"
                    src="https://console.dialogflow.com/api-client/demo/embedded/114795bd-6431-4b1b-b107-c05d397543f6"
                ></iframe>
                <div><p>Press Here to Open/ Close Assistant</p></div>
            </div>
        </>
    );
}
