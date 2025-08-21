// Contact page with form and company information
// This provides multiple ways for customers to get in touch

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Workshop',
      details: [
        'Elite Blade Co. Workshop',
        '42 Cutlers Hall Road',
        'Sheffield, S1 2HH',
        'United Kingdom'
      ]
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [
        '+44 114 123 4567',
        '1-800-KNIVES-1 (US)',
        'Monday - Friday: 9am - 6pm GMT',
        'Saturday: 10am - 4pm GMT'
      ]
    },
    {
      icon: Mail,
      title: 'Email Support',
      details: [
        'info@eliteblade.co',
        'support@eliteblade.co',
        'orders@eliteblade.co',
        'We respond within 24 hours'
      ]
    },
    {
      icon: Clock,
      title: 'Workshop Hours',
      details: [
        'Monday - Friday: 8am - 6pm',
        'Saturday: 9am - 5pm',
        'Sunday: Closed',
        'By appointment for tours'
      ]
    }
  ];

  const faqs = [
    {
      question: 'Do you offer custom knife design?',
      answer: 'Yes! Our master craftsmen can create custom knives tailored to your specifications. Contact us to discuss your project.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for unused items in original packaging. All knives come with our lifetime warranty.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship worldwide. However, knife laws vary by country and region. Please check your local regulations before ordering.'
    },
    {
      question: 'Can I visit your workshop?',
      answer: 'Absolutely! We offer guided tours of our Sheffield workshop. Please contact us to schedule a visit.'
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you have questions about our knives, need expert advice, or want to visit our workshop, we're here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-8">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display font-semibold text-2xl">Send us a message</h2>
                    <p className="text-muted-foreground">We'll respond within 24 hours</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Select onValueChange={(value) => handleInputChange('subject', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="What can we help you with?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="product">Product Information</SelectItem>
                        <SelectItem value="custom">Custom Knife Design</SelectItem>
                        <SelectItem value="repair">Repair Services</SelectItem>
                        <SelectItem value="workshop">Workshop Visit</SelectItem>
                        <SelectItem value="wholesale">Wholesale Orders</SelectItem>
                        <SelectItem value="support">Customer Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary-glow"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-steel transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg mb-2">
                        {info.title}
                      </h3>
                      <div className="space-y-1 text-muted-foreground">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions about our knives and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6 hover:shadow-steel transition-shadow">
                <h3 className="font-display font-semibold text-lg mb-3">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-20"
        >
          <Card className="p-8">
            <h3 className="font-display font-semibold text-2xl mb-6 text-center">
              Find Our Workshop
            </h3>
            <div className="aspect-video bg-gradient-subtle rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-primary opacity-10 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary/40 mx-auto mb-4" />
                  <p className="text-lg font-display font-semibold text-primary/60">
                    Sheffield, England
                  </p>
                  <p className="text-muted-foreground">
                    Interactive map coming soon
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;