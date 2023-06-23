import emailjs from "@emailjs/browser";

const EmailService = {
  sendEmailRegistration: (data) => {
    const templateParams = data;
    emailjs
      .send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID_REGISTER, templateParams, process.env.REACT_APP_TEMPLATE_PARAMS)
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          return EmailService.checkSuccess(response.status);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
  },
  sendEmailVolunteer: (data, currentEventData) => {
    const templateParams = { ...data, ...currentEventData };
    emailjs
      .send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID_VOLUNTEER, templateParams, process.env.REACT_APP_TEMPLATE_PARAMS)
      .then(
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
