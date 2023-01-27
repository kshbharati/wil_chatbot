//APIURL

const API_URI = (process.env.NODE_ENV==="development")?"http://localhost:3000":"https://www.helisrory.com";

//EventTrigger Names for Intents;
const PropertyListingIntent="PROPERTY_LISTING";
const EnquiryIntent = "FORM_POLICY_ACCEPTANCE";
const EnquiryFormIntent = "FORM";
const WelcomeIntent = "FORWARD_TO_WELCOME";

export {API_URI, PropertyListingIntent, EnquiryFormIntent, EnquiryIntent, WelcomeIntent};

