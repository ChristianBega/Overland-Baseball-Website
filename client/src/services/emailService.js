import emailjs from "@emailjs/browser";


const EmailService = {
  sendEmail: (data) => {
    const templateParams = data;
    emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, templateParams, process.env.REACT_APP_TEMPLATE_PARAMS).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        return EmailService.checkSuccess(response.status);
      },
      (err) => {
        console.log("FAILED...", err);
      }
    );
  },
};

export default EmailService;
