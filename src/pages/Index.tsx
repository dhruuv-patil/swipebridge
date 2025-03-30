
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Briefcase, MessageSquare } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 px-6 flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="text-xl font-bold text-primary">SwipeNet</div>
        <div className="space-x-2">
          <Link to="/login">
            <Button variant="outline" size="sm">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Connect with Pune's <span className="text-primary">Tech Community</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            SwipeNet is a professional networking platform to find like-minded
            people, opportunities, and connections in Pune's tech ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="px-8">
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                I Already Have an Account
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-accent">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">How SwipeNet Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Swipe & Connect</h3>
                <p className="text-muted-foreground">
                  Discover professionals, entrepreneurs, and students based on your interests and swipe to connect.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Chat & Collaborate</h3>
                <p className="text-muted-foreground">
                  Message your connections instantly and explore collaboration opportunities.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Find Opportunities</h3>
                <p className="text-muted-foreground">
                  Discover jobs, internships, and projects that match your skills and interests.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Pune's Professional Network?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Create your profile today and start connecting with professionals, startups, and opportunities in Pune.
          </p>
          <Link to="/signup">
            <Button size="lg" className="px-8">
              Get Started Now
            </Button>
          </Link>
        </section>
      </main>

      <footer className="py-6 px-4 border-t">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2023 SwipeNet. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
