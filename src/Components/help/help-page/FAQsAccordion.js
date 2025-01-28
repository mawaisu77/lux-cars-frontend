import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

const FAQsAccordion = () => {
  const faqData = [
    {
      id: 'panel1',
      question: 'How does online car auction bidding work?',
      answer: ' Online car auctions allow buyers to bid on vehicles in real-time. Simply browse our inventory, select a vehicle, and place your bid. At the end of the auction, the highest bidder wins and secures the car.'
    },
    {
      id: 'panel2',
      question: 'Is the bidding process safe and secure?',
      answer: 'Our platform is encrypted and monitored to ensure the security of every transaction. We also verify all vehicles and sellers to give you peace of mind.'
    },
    {
      id: 'panel2',
      question: 'What fees are included in the bidding process?',
      answer: 'We believe in transparency. Fees include a buyer’s premium, applicable taxes, and shipping costs if delivery is required. Detailed breakdowns are provided for every transaction.'
    },
    {
      id: 'panel2',
      question: 'How do I register for an auction with BidCaribeean?',
      answer: 'Registration is simple. Create an account, upload the required identification documents, and set your refundable bid deposit to activate bidding access.'
    },
    {
      id: 'panel2',
      question: 'What is bid power, and how is it calculated?',
      answer: 'Bid power represents the maximum amount you can bid, determined by the refundable deposit you’ve made. For example, a $750 deposit unlocks $7,500 in bid power.'
    },
    {
      id: 'panel2',
      question: 'Can I inspect vehicles before bidding?',
      answer: 'We provide detailed descriptions, high-quality images, and verified reports for each vehicle. Where available, we can arrange in-person inspections for select vehicles.'
    },
    {
      id: 'panel2',
      question: 'What happens if I win an auction?',
      answer: 'Congratulations! Once you win, our team will guide you through the payment and the delivery process. You can pick up the car or have it delivered to your location.'
    },
    {
      id: 'panel2',
      question: 'Can I sell my car through BidCaribbean?',
      answer: ' Absolutely! Selling is simple. List your vehicle on our platform, set your reserved price, and let buyers compete for the best offer.'
    },
    {
      id: 'panel2',
      question: 'How do I apply for a loan to purchase a car?',
      answer: 'We partner with trusted financial institutions (list) to offer quick and easy financing options. Complete our online loan application form, and we’ll help you secure a plan that fits your budget.'
    },
    {
      id: 'panel2',
      question: 'Who do I contact for assistance?',
      answer: 'Our dedicated support team is here to help! You can reach us via live chat (AI integration), email, or phone for inquiries or troubleshooting needs.'
    },
  ]
  return (
    <div className='mt-[2.292vw] text-[#24282B]'>
      <h1 className='text-30 font-bold'>Frequently Asked QUESTIONS</h1>
      {faqData.map((faq) => (
        <Accordion key={faq.id} className='shadow-none border-none' >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className='text-primary-red text-24 font-bold'/>}
            aria-controls={`${faq.id}-content`}
            id={`${faq.id}-header`}
            className='text-[20px] md:text-24 font-bold px-2'
          >
            {faq.question}
          </AccordionSummary>
          <AccordionDetails  className='text-[18px] md:text-20 text-lux-black font-urbanist text-left px-6 '>
            {faq.answer}
          </AccordionDetails>
        </Accordion>
      ))}

   
    </div>
  );
}

export default FAQsAccordion;
