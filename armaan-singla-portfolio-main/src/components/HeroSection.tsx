import { useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const [dayCount, setDayCount] = useState(0);
  const [isInitialTypingComplete, setIsInitialTypingComplete] = useState(false);
  const fullText = "Hey, I'm Armaan!";
  const nameText = "Armaan!";
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    // Initial full text typing
    const typeInitialText = () => {
      let index = 0;
      
      const typeChar = () => {
        if (index <= fullText.length) {
          setDisplayText(fullText.slice(0, index));
          index++;
          timeoutId = setTimeout(typeChar, 100);
        } else {
          // Wait a bit then start the looping animation
          timeoutId = setTimeout(() => {
            setIsInitialTypingComplete(true);
            startNameLooping();
          }, 2000);
        }
      };
      
      timeoutId = setTimeout(typeChar, 500);
    };
    
    // Name looping animation (only "Armaan!")
    const startNameLooping = () => {
      let index = nameText.length;
      let isTyping = true;

      const typeLoop = () => {
        if (isTyping) {
          // Start with full text displayed, then pause before typing out
          if (index === nameText.length) {
            setDisplayText("Hey, I'm " + nameText.slice(0, index));
            // Pause at full text before starting to delete
            timeoutId = setTimeout(() => {
              isTyping = false;
              index = nameText.length;
              typeLoop();
            }, 3000);
          } else {
            // Typing in
            if (index <= nameText.length) {
              setDisplayText("Hey, I'm " + nameText.slice(0, index));
              index++;
              timeoutId = setTimeout(typeLoop, 150);
            } else {
              // Pause at full text before starting to delete
              timeoutId = setTimeout(() => {
                isTyping = false;
                index = nameText.length;
                typeLoop();
              }, 3000);
            }
          }
        } else {
          // Typing out (only the name part)
          if (index >= 0) {
            setDisplayText("Hey, I'm " + nameText.slice(0, index));
            index--;
            timeoutId = setTimeout(typeLoop, 100);
          } else {
            // Pause at "Hey, I'm " before starting to type again
            timeoutId = setTimeout(() => {
              isTyping = true;
              index = 0;
              typeLoop();
            }, 1500);
          }
        }
      };

      typeLoop();
    };

    typeInitialText();

    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    // Calculate days since I started building things - base count of 2040 + days since a reference date
    const referenceDate = new Date('2025-01-01'); // Reference date for the base count
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - referenceDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDayCount(2040 + diffDays);

    // Update daily
    const dailyTimer = setInterval(() => {
      const newToday = new Date();
      const newDiffTime = Math.abs(newToday.getTime() - referenceDate.getTime());
      const newDiffDays = Math.ceil(newDiffTime / (1000 * 60 * 60 * 24));
      setDayCount(2040 + newDiffDays);
    }, 24 * 60 * 60 * 1000); // Update every 24 hours

    return () => clearInterval(dailyTimer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-16">
      <div className="text-left max-w-4xl mx-auto animate-fade-in-up font-mono">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight text-foreground font-mono">
          {displayText}
          <span className="cursor"></span>
        </h1>
        
        <div className="space-y-4 text-base text-muted-foreground mb-8 font-mono">
          <p>
            I'm 20, based in <span className="underline">Toronto</span>.
          </p>
          
          <p>
            I've been building things for{' '}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="underline cursor-help">{dayCount} days</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{Math.round((dayCount / 365.25) * 10) / 10} years</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            .
          </p>
        </div>

        <div className="space-y-8 mb-16">
          <div>
            <h2 className="text-base font-medium text-foreground mb-4 font-mono">I'm currently...</h2>
            <ul className="space-y-2 text-muted-foreground text-base font-mono">
              <li>&gt; Serving as a Teaching Assistant for <span className="underline">ELEC 290</span> (Electrical and Computer Engineering Design and Practice)</li>
              <li>&gt; Serving as a Teaching Assistant for <span className="underline">APSC 141</span> (Introduction to Computer Programming for Engineers I)</li>
              <li>&gt; Leading software and computer vision for <span className="underline">Queen's Knights Robotics</span>, developing autonomous robotics systems</li>
              <li>&gt; Building full-stack applications and integrating AI + hardware systems for real-world engineering challenges</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;