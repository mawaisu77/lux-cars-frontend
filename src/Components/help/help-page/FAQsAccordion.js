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
      question: 'What is Lorem Ipsum?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'
    },
    {
      id: 'panel2',
      question: 'Why do we use it?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'
    },
  ]
  return (
    <div className='mt-[2.292vw] text-[#24282B]'>
      <h1 className='text-30 font-bold'>Frequently Asked QUESTIONS</h1>
      {faqData.map((faq) => (
        <Accordion key={faq.id} className='shadow-none border-none'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className='text-primary-red text-24 font-bold'/>}
            aria-controls={`${faq.id}-content`}
            id={`${faq.id}-header`}
            className='text-24 font-bold '
          >
            {faq.question}
          </AccordionSummary>
          <AccordionDetails className='text-18 text-primary-gray font-urbanist text-left px-6 '>
            {faq.answer}
          </AccordionDetails>
        </Accordion>
      ))}

   
    </div>
  );
}

export default FAQsAccordion;
