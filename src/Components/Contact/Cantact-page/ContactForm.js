import React, { useState } from 'react'
import image from "../../../assets/IMG (27).png";
import { BiMailSend, BiMessageSquare, BiUser } from 'react-icons/bi';
import { CiMail } from "react-icons/ci";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block">
          <img
            src="/placeholder.svg?height=600&width=600"
            alt="Contact Us"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl  font-bold mb-6">Drop up a message</h2>
          {isSubmitted ? (
            <div className="text-green-600 mb-4">Thank you for your message. We'll get back to you soon!</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className='text-left'>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <div className="relative">
                  <BiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"                    placeholder="Your name"
                  />
                </div>
              </div>

              <div className='text-left'>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <CiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className='text-left'>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"                  placeholder="What's this about?"
                />
              </div>

              <div className='text-left'>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                
                <div className="relative">
                  <BiMessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                      className="w-full pl-10 min-h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your message here..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full bg-primary-red text-white py-2 px-4 rounded-md font-medium transition-all duration-200 ease-in-out transform hover:bg-primary-red/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSubmitting ? "opacity-75 cursor-not-allowed" : "hover:scale-105"}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default ContactForm