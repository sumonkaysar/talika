import { FaEnvelope, FaPhone } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";

const ContactInfo = () => {

    return (
        <section id="contact-info" className="py-12 mx-16">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold mb-8">Our Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="contact-card p-4 bg-green-600 shadow-md rounded-lg text-white pb-6">
                        <div className="text-3xl">
                            <FaMapLocation className="mx-auto mb-4 mt-2" />
                        </div>
                        <h3 className="text-2xl font-bold">Address</h3>
                        <p>Panchdona, Narsingdi</p>
                    </div>
                    <div className="contact-card p-4 bg-fuchsia-600 shadow-md rounded-lg text-white pb-6">
                        <div className="text-3xl">
                            <FaPhone className="mx-auto mb-4 mt-2" />
                        </div>
                        <h3 className="text-2xl font-bold">Phone</h3>
                        <p>(+88) 01828008748</p>
                    </div>
                    <div className="contact-card p-4 bg-blue-600 text-white shadow-md rounded-lg pb-6">
                        <div className="text-3xl">
                            <FaEnvelope className="mx-auto mb-4 mt-2" />
                        </div>
                        <h3 className="text-2xl font-bold">Email</h3>
                        <p>hemon.hasan123@gmail.com</p>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default ContactInfo