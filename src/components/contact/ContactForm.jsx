const ContactForm = () => {
    return (
        <section id="contact-form" className="py-12 mx-16">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
                <form className="max-w-md mx-auto">
                    <div className="mb-4">
                        <input type="text" placeholder="Your Name" className="input input-bordered w-full" />
                    </div>
                    <div className="mb-4">
                        <input type="email" placeholder="Your Email" className="input input-bordered w-full" />
                    </div>
                    <div className="mb-4">
                        <textarea placeholder="Your Message" className="textarea textarea-bordered w-full"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Send Message</button>
                </form>
            </div>
        </section>
    );
};

export default ContactForm;
