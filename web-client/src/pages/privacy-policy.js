import React from "react";
import "../App.css";
import ParagraphText from "../components/ParagraphText";

export default function PrivacyPolicy() {
  const paragraphs = [
    {
      heading: null,
      content:
        "At Scienture Conference, accessible from scientureconf.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Scienture Conference and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us. This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Scienture Conference. This policy is not applicable to any information collected offline or via channels other than this website. Our Privacy Policy was created with the help of the Privacy Policy Generator and the Free Privacy Policy Generator.",
    },
    {
      heading: "Consent",
      content:
        "By using our website, you hereby consent to our Privacy Policy and agree to its terms.",
    },
    {
      heading: "Information we collect",
      content:
        "The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information. If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide. When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.",
    },
    {
      heading: "How we use your information",
      content:
        "We use the information we collect in various ways, including to:" +
        "\n- Provide, operate, and maintain our webste" +
        "\n- Improve, personalize, and expand our webste" +
        "\n- Understand and analyze how you use our webste" +
        "\n- Develop new products, services, features, and functionality" +
        "\n- Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the webste, and for marketing and promotional purposes" +
        "\n- Send you emails" +
        "\n- Find and prevent fraud",
    },
    {
      heading: "Log Files",
      content:
        "Scienture Conference follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.",
    },
    {
      heading: "Cookies and Web Beacons",
      content:
        "Like any other website, Scienture Conference uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information. For more general information on cookies, please read 'What Are Cookies' from Cookie Consent.",
    },
    {
      heading: "Advertising Partners Privacy Policies",
      content:
        "You may consult this list to find the Privacy Policy for each of the advertising partners of Scienture Conference. Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Scienture Conference, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit. Note that Scienture Conference has no access to or control over these cookies that are used by third-party advertisers.",
    },
    {
      heading: "Third Party Privacy Policies",
      content:
        "Scienture Conference's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.",
    },
    {
      heading: "CCPA Privacy Rights (Do Not Sell My Personal Information)",
      content:
        "Under the CCPA, among other rights, California consumers have the right to: Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers. \nRequest that a business delete any personal data about the consumer that a business has collected. \nRequest that a business that sells a consumer's personal data, not sell the consumer's personal data. \nIf you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.",
    },
    {
      heading: "GDPR Data Protection Rights",
      content:
        "We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following: " +
        "\nThe right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service." +
        "The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete." +
        "The right to erasure – You have the right to request that we erase your personal data, under certain conditions." +
        "The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions." +
        "The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions." +
        "The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions." +
        "If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.",
    },
    {
      heading: "Children's Information",
      content:
        "Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. Scienture Conference does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.",
    },
  ];

  const paragraphList = paragraphs.map((p) => (
    <ParagraphText heading={p.heading} content={p.content} />
  ));

  return (
    <div>
      <h1>Privacy policy</h1>
      {paragraphList}
    </div>
  );
}
