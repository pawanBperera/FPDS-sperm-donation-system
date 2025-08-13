import React from "react";
import "./static-pages.css";
import Footer from "../../components/Footer/Footer"; // adjust path if needed
import NavBar from "../../components/NavBar/NavBar"; // adjust path if needed
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import  { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How does the sperm donation process work?",
      answer:
        "Intended parents can sign up, complete their profile, and search for verified donors. Once a donor is shortlisted, the match will be reviewed by our admin team for medical compatibility before approval. After approval, you will be guided on the next steps with your selected clinic.",
    },
    {
      question: "Are donors medically screened?",
      answer:
        "Yes. Every donor undergoes strict medical screening, including genetic testing for conditions such as thalassemia and other inheritable diseases. Only medically cleared donors are added to our platform.",
    },
    {
      question: "Is my information kept confidential?",
      answer:
        "Absolutely. We use strong data protection measures and follow strict privacy policies. Your personal and medical information is never shared without your consent and is only used for matching and verification purposes.",
    },
  ];
  return (
    <>
      <NavBar />
      <div className="faq-container">
      <h1 className="faq-title">
        <FaQuestionCircle style={{ marginRight: "10px" }} /> Frequently Asked Questions
      </h1>
      <div className="faq-grid">
        {faqData.map((item, index) => (
          <div className={`faq-item ${openIndex === index ? "active" : ""}`} key={index}>
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <h3>{item.question}</h3>
              {openIndex === index ? (
                <FaChevronUp className="faq-icon" />
              ) : (
                <FaChevronDown className="faq-icon" />
              )}
            </div>
            {openIndex === index && <p className="faq-answer">{item.answer}</p>}
          </div>
        ))}
      </div>
    </div>
      <Footer />
    </>
  );
};

export default FAQ;
