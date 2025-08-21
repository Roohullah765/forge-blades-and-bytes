// About page with company history and values
// This tells the story of Elite Blade Co. with engaging content

import { motion } from 'framer-motion';
import { Award, Users, Globe, Heart, Zap, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  const milestones = [
    {
      year: '1892',
      title: 'Founded in Sheffield',
      description: 'Elite Blade Co. established in the heart of England\'s steel capital.'
    },
    {
      year: '1920',
      title: 'Military Contracts',
      description: 'Supplied bayonets and utility knives to Allied forces during WWI.'
    },
    {
      year: '1960',
      title: 'Kitchen Revolution',
      description: 'Introduced professional chef knives to home kitchens worldwide.'
    },
    {
      year: '1995',
      title: 'Master Craftsman Program',
      description: 'Launched apprenticeship program to preserve traditional forging techniques.'
    },
    {
      year: '2010',
      title: 'Sustainable Materials',
      description: 'Pioneered eco-friendly handle materials and responsible steel sourcing.'
    },
    {
      year: '2023',
      title: 'Digital Heritage',
      description: 'Bringing 130+ years of craftsmanship to the digital age.'
    }
  ];

  const values = [
    {
      icon: Award,
      title: 'Craftsmanship Excellence',
      description: 'Every blade is forged with precision by skilled artisans who have perfected their craft over decades.'
    },
    {
      icon: Shield,
      title: 'Lifetime Quality',
      description: 'We stand behind our products with lifetime warranties because we build knives to last generations.'
    },
    {
      icon: Heart,
      title: 'Passionate Community',
      description: 'From professional chefs to outdoor enthusiasts, we serve those who appreciate fine craftsmanship.'
    },
    {
      icon: Globe,
      title: 'Global Heritage',
      description: 'Rooted in Sheffield tradition, we now serve knife enthusiasts across six continents.'
    },
    {
      icon: Zap,
      title: 'Innovation Forward',
      description: 'While honoring tradition, we continuously innovate with new steels and manufacturing techniques.'
    },
    {
      icon: Users,
      title: 'Family Legacy',
      description: 'Five generations of the same family have guided our company, ensuring consistent values.'
    }
  ];

  const team = [
    {
      name: 'James Sheffield',
      role: 'Master Bladesmith',
      experience: '25 years',
      specialty: 'Damascus Steel & Japanese Techniques'
    },
    {
      name: 'Maria Chen',
      role: 'Head of Design',
      experience: '15 years',
      specialty: 'Ergonomics & Handle Innovation'
    },
    {
      name: 'Robert McKenzie',
      role: 'Quality Control Master',
      experience: '30 years',
      specialty: 'Edge Geometry & Testing'
    },
    {
      name: 'Sarah Thompson',
      role: 'Heritage Curator',
      experience: '12 years',
      specialty: 'Traditional Techniques & History'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30"></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <Badge className="bg-white/20 text-white border-white/30">
              ⚔️ Forging Excellence Since 1892
            </Badge>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
              Our Heritage,
              <br />
              <span className="text-white/90">Your Legacy</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              For over 130 years, Elite Blade Co. has been crafting exceptional knives that bridge 
              the gap between traditional artistry and modern innovation. Our story is one of 
              passion, precision, and an unwavering commitment to excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Born in Sheffield's Steel Heart
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  In 1892, master blacksmith Thomas Sheffield established our company in the 
                  legendary steel district of Sheffield, England. What began as a small forge 
                  has grown into a globally recognized name synonymous with quality and craftsmanship.
                </p>
                <p>
                  Our founders understood that a great knife is more than a tool—it's an extension 
                  of the craftsman's hand. This philosophy has guided every blade we've forged, 
                  from military bayonets to professional chef knives to outdoor survival tools.
                </p>
                <p>
                  Today, we honor our heritage while embracing innovation, using both time-tested 
                  techniques and cutting-edge metallurgy to create knives that exceed the highest 
                  standards of performance and beauty.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-gradient-subtle rounded-xl shadow-elegant overflow-hidden">
                <div className="w-full h-full bg-gradient-primary opacity-10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-display font-bold text-primary/40 mb-4">1892</div>
                    <p className="text-primary/60 font-semibold">Est. Sheffield, England</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Milestones of Excellence
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Key moments in our journey from a small Sheffield forge to global knife artisans.
            </p>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="flex-1">
                  <Card className="p-8 hover:shadow-steel transition-shadow">
                    <div className="flex items-center space-x-4 mb-4">
                      <Badge className="bg-primary text-primary-foreground text-lg font-bold px-4 py-2">
                        {milestone.year}
                      </Badge>
                      <h3 className="font-display font-semibold text-xl">
                        {milestone.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </Card>
                </div>
                <div className="w-px h-16 bg-border hidden md:block"></div>
                <div className="w-4 h-4 bg-primary rounded-full hidden md:block"></div>
                <div className="w-px h-16 bg-border hidden md:block"></div>
                <div className="flex-1 md:block hidden"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision and every blade we create.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover-lift hover:shadow-elegant">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-lg">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Master Craftsmen */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Master Craftsmen
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meet the artisans who bring decades of expertise to every blade.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover-lift hover:shadow-steel">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-display font-bold text-primary-foreground">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-2">
                    {member.role}
                  </p>
                  <Badge variant="outline" className="mb-3">
                    {member.experience}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    {member.specialty}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Experience Our Legacy
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join thousands of chefs, collectors, and craftsmen who trust Elite Blade Co. 
              for their most important cutting tasks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-secondary hover:bg-white/90"
              >
                <Link to="/catalog">
                  Explore Collection
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-white/50 text-white hover:bg-white/10"
              >
                <Link to="/contact">
                  Visit Our Workshop
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;