export type EssayBlock =
  | { type: "p"; text: string }
  | { type: "math"; text: string }
  | { type: "figure"; src: string; alt: string; caption: string }
  | {
      type: "diagram";
      variant:
        | "critical-strip"
        | "progression"
        | "discovery-tree"
        | "wpm-bar"
        | "latency-bars"
        | "decision-loop"
        | "command-vs-conversation"
        | "cascade-vs-multimodal"
        | "humanoid-loop";
      caption: string;
    }
  | { type: "sources"; items: { label: string; href: string }[] };

export type EssaySection = {
  id: string;
  heading: string;
  blocks: EssayBlock[];
};

export type Essay = {
  slug: string;
  title: string;
  date: string;
  isoDate: string;
  description: string;
  sections: EssaySection[];
};

export const essays: Essay[] = [
  {
    slug: "voice-ai-bottleneck",
    title:
      "AI's Next Bottleneck Isn't Intelligence. It's How Fast You Can Talk to It.",
    date: "September 4, 2026, 10:05 PM",
    isoDate: "2026-09-04",
    description:
      "Why real-time voice and multimodal communication, not raw model intelligence, is becoming AI's next critical bottleneck, from military task guidance and surgical robotics to humanoid robots and physical AI.",
    sections: [
      {
        id: "introduction",
        heading: "Introduction",
        blocks: [
          {
            type: "p",
            text: "I got the idea for this essay watching Spider-Man: Brand New Day.[^1] Peter Parker builds his own AI assistant, E.V., and talks to it through most of the film[^2][^3], while fighting, testing ideas, and trying to understand what's happening around him. In one scene, Jean Grey can jump between minds, but only within a limited range. Peter works out that the range is roughly thirty feet and uses that constraint against her.[^4]",
          },
          {
            type: "p",
            text: "None of that is really about superpowers. What stuck with me was the interface. Peter isn't opening a laptop mid-fight. He isn't typing a prompt or tapping through an app. He's thinking, speaking, moving, and getting information back while the situation is still unfolding.",
          },
          {
            type: "p",
            text: "That's a strange contrast with how most of us actually use AI today.",
          },
          {
            type: "p",
            text: "We now have models that can write software, reason through hard problems, read images, search enormous amounts of information, and increasingly understand audio and video. But accessing any of that intelligence still usually starts with the same physical act we've used for decades: sit down, and type.",
          },
          {
            type: "p",
            text: "I don't think keyboards are going away. They're still better for programming, precision, privacy, and a long list of other tasks. But something else is changing underneath that. As models get more capable, a second bottleneck starts to matter just as much as the intelligence itself: how quickly a person can reach that intelligence at the exact moment they need it.",
          },
          {
            type: "p",
            text: "In ordinary life, a few seconds of friction barely registers. In surgery, industrial work, emergency response, aviation, or the military, a few seconds can be the entire problem.",
          },
          {
            type: "p",
            text: "My argument is simple, maybe even a little obvious once you say it out loud. The next important layer of AI probably won't be a smarter model. It'll be real-time communication that can keep up with human thought. Not because intelligence stops mattering. Intelligence is only useful if it reaches us before the moment it was needed for is already gone.",
          },
        ],
      },
      {
        id: "why-still-typing",
        heading: "Why Are We Still Typing?",
        blocks: [
          {
            type: "p",
            text: "Humans didn't evolve to communicate through keyboards. We speak. We do it when we're excited, confused, giving instructions, teaching, arguing, or just working out an idea out loud. Even talking to a dog that can't understand a word of it, our first instinct is still to use our voice.",
          },
          {
            type: "p",
            text: "Typing is different. It's something we learned because computers needed a structured way to receive input. That doesn't make it bad. It just makes it an interface built around the machine, where speech is one built around us.",
          },
          {
            type: "p",
            text: "There's a measurable gap, too. A Stanford and Baidu study comparing speech recognition against smartphone typing found English speech input reached about 153 words per minute, against roughly 52 words per minute for typing. That made speech about 2.9 times faster, with a lower error rate than the mobile keyboard.[^6] That's one experiment, comparing speech against a phone keyboard rather than every possible input method, but the gap is still worth sitting with.",
          },
          { type: "p", text: "153 words per minute versus 52." },
          {
            type: "p",
            text: "But the bigger difference isn't the number. It's flow. When I type an idea, I keep interrupting myself, fixing a word, deleting a clause, losing half the thought because my fingers are slower than whatever I was trying to say. When I speak, the thought can come out messy. I can pause, stumble, correct myself mid-sentence, say \"no, that's not what I mean,\" and try again.",
          },
          {
            type: "p",
            text: "A genuinely conversational AI shouldn't need me to translate that messy thought into a clean prompt before it starts working. It should be able to work with the thought while I'm still forming it. That's a very different relationship with a computer than the one most interfaces give us today.",
          },
          {
            type: "diagram",
            variant: "wpm-bar",
            caption:
              "Figure 1. In a Stanford/Baidu mobile text-entry study, English speech input reached about 153 words per minute versus 52 for typing, roughly 2.9 times faster.",
          },
        ],
      },
      {
        id: "conversation-has-a-speed",
        heading: "Human Conversation Has a Speed",
        blocks: [
          {
            type: "p",
            text: "Conversation feels instant because humans are extraordinarily good at timing it. We don't wait several seconds after someone finishes speaking before responding.",
          },
          {
            type: "p",
            text: "A cross-linguistic study of turn-taking across ten languages found that response timing clustered tightly around the end of the previous turn, with a large share of transitions landing between 0 and 200 milliseconds.[^7] That means before the other person has even finished their sentence, our brain is already predicting where it's going, deciding what it means, and preparing a reply.",
          },
          {
            type: "p",
            text: "So why does latency matter this much? Because a system can give the exact right answer and still feel unintelligent if the rhythm around it is wrong. Think about a laggy phone call: nobody on it suddenly got less intelligent, the conversation just turns awkward. People talk over each other, both stop, someone says \"sorry, go ahead.\" The information is fine. The timing is broken.",
          },
          {
            type: "p",
            text: "Older voice assistants often behaved like a pipeline: you speak, the system waits, your speech becomes text, a model processes the text, another system turns the reply back into audio, and only then do you hear anything. Every stage adds delay.",
          },
          {
            type: "p",
            text: "OpenAI's own numbers show how much architecture matters here. Its earlier Voice Mode averaged about 2.8 seconds with GPT-3.5 and 5.4 seconds with GPT-4, because speech passed through separate transcription, language-model, and text-to-speech systems.[^9] GPT-4o, trained across audio, vision, and text in a single model, brought that down to a reported 232 milliseconds at best and 320 milliseconds on average.[^9][^10]",
          },
          {
            type: "p",
            text: "That doesn't mean the voice problem is solved. It means we crossed a real threshold: from waiting seconds for a pipeline to respond, to landing inside the timing range of an actual human conversation.",
          },
          {
            type: "diagram",
            variant: "latency-bars",
            caption:
              "Figure 2. Voice interaction starts to feel fundamentally different once latency moves from seconds toward normal human conversational timing.",
          },
        ],
      },
      {
        id: "when-seconds-matter",
        heading: "When Seconds Matter",
        blocks: [
          {
            type: "p",
            text: "Some environments don't leave room for friction. That's where voice stops being a nice-to-have and starts being something closer to necessary.",
          },
          {
            type: "p",
            text: "Picture a soldier moving through an environment where their hands, eyes, and attention are already spoken for. Radios, maps, sensors, other people, and command systems are all competing for the same channel. Typing works fine in an office. It's a very different problem when someone is moving, carrying equipment, operating a vehicle, or reacting to something happening in real time.",
          },
          {
            type: "p",
            text: "The U.S. military is already building around this exact problem. DARPA's Perceptually-enabled Task Guidance program is built on an AI assistant that can see what a user sees, hear what they hear, and give just-in-time visual and audio guidance while the person is mid-task. DARPA specifically points to mechanics and medics, using head-mounted cameras and microphones to understand the task, catch mistakes, and hold a task-focused dialogue with the person doing the work.[^15]",
          },
          {
            type: "p",
            text: "The Army has gone further. A 2025 Army small-business research topic explicitly asked for systems that let combat-vehicle crews issue natural-language commands to autonomous systems, describing crews juggling navigation, sensors, communications, and situational awareness at once, with the stated goal of cutting cognitive load and supporting faster decisions through natural language.[^17] It's a little wild that \"just talk to the vehicle\" went from science fiction to something the Army is actively funding.",
          },
          {
            type: "p",
            text: "The military makes this argument easy to see because the environment is extreme, but the principle isn't military-specific. If your hands are occupied and your attention is scarce, any interface that requires you to stop what you're doing is expensive. The cost might be two seconds. It might be ten. But the entire value of real-time intelligence is that it lives inside the decision window. Information that arrives after the decision is just history.",
          },
          {
            type: "diagram",
            variant: "decision-loop",
            caption:
              "Figure 3. In time-sensitive environments, communication latency becomes part of the decision itself.",
          },
        ],
      },
      {
        id: "operating-room",
        heading: "The Operating Room Has the Same Problem",
        blocks: [
          {
            type: "p",
            text: "Now swap the battlefield for an operating room, and the same interface problem is waiting there too. A surgeon's hands are occupied, and their attention is already split across anatomy, imaging, instruments, the rest of the room, and the procedure itself. An AI system with genuinely useful information is still competing with the work if reaching it means pulling attention off the patient to navigate a menu.",
          },
          {
            type: "p",
            text: "Researchers are already testing a different model. A 2024 study introduced an LLM-based voice interface for an augmented-reality surgical navigation system used in pancreatic surgery, tested with nine experienced surgeons. That's a small group, small enough that I wouldn't read it as proof the problem is solved, but the results are still notable.[^19]",
          },
          {
            type: "p",
            text: "The LLM-based interface produced significantly lower task-completion times across all six tested tasks, significantly lower overall cognitive workload, and a System Usability Scale score of 87.78, rated \"excellent\" by the researchers, against 79.17 for a conventional predefined-command system. The researchers then tested both approaches during two real pancreatic surgeries.[^19]",
          },
          {
            type: "p",
            text: "The interesting part wasn't that voice worked. Predefined voice commands already existed in that system. What changed was the natural language. With a conventional command system, the surgeon has to remember the exact phrase that triggers a function. With an LLM, the surgeon can just describe what they want. That sounds minor, but it flips who has to do the adapting: one approach forces the human to learn the machine's language, the other asks the machine to understand the human's. That's the direction I think computing has to keep moving.",
          },
          {
            type: "diagram",
            variant: "command-vs-conversation",
            caption:
              "Figure 4. The real shift is from machine-defined commands to human-defined intent, not simply from keyboard to voice.",
          },
        ],
      },
      {
        id: "speech-recognition-not-solved",
        heading: "Speech Recognition Is Good. It Is Not Solved.",
        blocks: [
          {
            type: "p",
            text: "There's an obvious pushback here: we already have Siri, Alexa, and years of phone dictation. Why is this still a frontier?",
          },
          {
            type: "p",
            text: "Because transcription isn't the same thing as conversation. Speech recognition genuinely has improved a huge amount. Back in 2017 Microsoft reported a 5.1% word error rate on the Switchboard conversational speech benchmark, matching the human transcription error rate on that same test.[^11] That was a real milestone, and Microsoft's own researchers were careful to flag what was left: distant microphones, background noise, accents, different speaking styles, and languages with less training data.",
          },
          {
            type: "p",
            text: "A benchmark can claim human parity while the real world still feels very different. A 2020 Stanford-led study tested commercial speech recognition systems from Amazon, Apple, Google, IBM, and Microsoft against conversational recordings and found an average word error rate of 35% for Black speakers in the dataset, against 19% for white speakers.[^12] Separate work on dysfluent speech found a consumer speech-recognition system performed substantially worse for people with stuttering and similar fluency disorders.[^14]",
          },
          {
            type: "p",
            text: "Real conversation is messy in ways a demo rarely is. People mumble, interrupt, speak over machines, panic, whisper, stutter, change their sentence halfway through. A soldier isn't going to talk to an AI in a quiet recording studio. Neither is a mechanic under a vehicle, or a surgeon mid-procedure.",
          },
          {
            type: "p",
            text: "If voice is going to become a serious interface for real-world AI, the bar can't be \"it understands me most of the time when I speak clearly.\" It has to become something closer to: it understands what I meant, in my environment, while everything else is happening. That's a much harder engineering problem than a benchmark score suggests.",
          },
        ],
      },
      {
        id: "full-conversation-loop",
        heading: "The Real Technical Problem Is the Full Conversation Loop",
        blocks: [
          {
            type: "p",
            text: "When people say \"voice AI,\" they usually compress several distinct engineering problems into one phrase. A real system has to know when I've finished speaking versus just pausing to think. It has to let me interrupt it. It has to separate my voice from someone else's, and my voice from background noise. It has to remember what I said thirty seconds ago. It may need to combine my speech with a camera feed, sensor data, a map, or a technical manual, and then reason quickly enough that the answer still matters by the time it arrives.",
          },
          {
            type: "p",
            text: "There are two broad ways to build that. The older approach is a cascade: speech becomes text, a language model processes the text, and text becomes speech again. It's useful because each piece can be optimized on its own, but every handoff is a place to lose something. Tone can disappear when audio becomes text, background context can vanish, timing information gets stripped out, and every conversion adds latency.",
          },
          {
            type: "p",
            text: "The newer direction is native multimodality: audio, vision, and context go into one model, which reasons over more of the original signal directly and comes back out as speech and action. That matters for physical AI in particular, because the world doesn't arrive as text. It arrives as sound, motion, space, and time, and something is always lost translating it into a paragraph first.",
          },
          {
            type: "diagram",
            variant: "cascade-vs-multimodal",
            caption:
              "Figure 5. Native multimodal systems reduce handoffs and preserve information that is often lost when every interaction is converted into text first.",
          },
        ],
      },
      {
        id: "physical-ai-needs-interface",
        heading: "Physical AI Needs a Human Interface",
        blocks: [
          {
            type: "p",
            text: "A large share of the AI industry is now moving toward physical AI: robots, autonomous vehicles, humanoids, industrial systems that can see the world, reason about it, and act inside it. NVIDIA has been explicit that it sees this as a major frontier, building world models, simulation systems, and robotics foundation models around it.[^20]",
          },
          {
            type: "p",
            text: "That raises a question I think gets less attention than it deserves: how are humans actually supposed to talk to all of these machines? A humanoid robot can have perfect balance, strong vision, dexterous hands, and a genuinely capable reasoning model underneath it, but if I still have to pull out a phone and type every instruction into an app, something about the idea has failed. A human-shaped machine shouldn't require a less human way of talking to it.",
          },
          {
            type: "p",
            text: "If a robot is standing next to me, I want to be able to say: \"Can you move that box over there? Actually, not that one, the heavier one beside it. Put it near the door.\" The robot has to track the object I mean, the word \"there,\" my correction, the visual scene, the task history, and the fact that I changed my mind halfway through a sentence. That's an ordinary conversation for two people. For a machine, it's a genuinely hard multimodal reasoning problem.",
          },
          {
            type: "p",
            text: "This is why I don't think physical AI and conversational AI stay separate for long. A robot needs a body to act in the world, but it also needs a communication layer that lets it join human activity without forcing the human to become its operator.",
          },
          {
            type: "diagram",
            variant: "humanoid-loop",
            caption:
              "Figure 6. Physical AI becomes far more useful when communication is part of the same perception-reasoning-action loop.",
          },
        ],
      },
      {
        id: "keyboard-wont-die",
        heading: "The Keyboard Will Not Die. It Will Stop Being the Gatekeeper.",
        blocks: [
          {
            type: "p",
            text: "I don't think the future has no keyboards. That claim is easy to make and probably wrong. I still want a keyboard when I'm writing code, text when I need to check exact wording, a screen when information is visual, and silence when talking would just be annoying.",
          },
          {
            type: "p",
            text: "The future interface is probably multimodal by default: voice when voice is best, vision when vision is best, text when text is best, touch when touch is best. The deeper change isn't the death of the keyboard. It's that the keyboard stops being the gatekeeper to intelligence.",
          },
          {
            type: "p",
            text: "For most of computing history, humans have adapted to computers, not the other way around. We learned command lines, programming languages, keyboard shortcuts, menus, and where the settings page lives. Each new interface removed a layer of that friction: the mouse made spatial interaction easier, touchscreens let us manipulate objects directly. Voice has the potential to remove another layer, but only once it's reliable enough that we stop thinking about it as an interface at all.",
          },
        ],
      },
      {
        id: "intelligence-before-moment-gone",
        heading: "Intelligence Before the Moment Is Gone",
        blocks: [
          {
            type: "p",
            text: "I started thinking about all of this because of a movie. A fictional teenager running through a fight while talking to an AI in his ear is obviously fiction. The idea underneath it isn't.",
          },
          {
            type: "p",
            text: "DARPA is researching assistants that see and hear what soldiers see and hear. The Army is funding natural-language interfaces for autonomous vehicles. Researchers are testing LLM voice interfaces inside real operating rooms. Multimodal models can already respond at something close to normal conversational timing under the right conditions. Physical AI is moving out of research labs and into robots, vehicles, factories, and medical systems. All of it points at the same shift: intelligence is leaving the screen.",
          },
          {
            type: "p",
            text: "Once that happens, our current interface assumptions start to break. The person using AI may not be sitting at a desk. They may be moving, repairing something, operating, driving, treating someone, in an environment where their hands and eyes already have jobs. In those moments, communication stops being a cosmetic feature and becomes part of system performance. A model can be extraordinarily intelligent and still be useless if reaching it means breaking the task you're actually trying to do.",
          },
          {
            type: "p",
            text: "That's why I think one of the most important open problems in AI right now is shrinking the time between human intent and useful intelligence. Not replacing reasoning, not replacing better models. Just connecting those models to people at the speed real life actually demands. I'm still figuring out where the limits of that are, but that's the part I can't stop thinking about.",
          },
          {
            type: "p",
            text: "The keyboard will still exist. The screen will still exist. But I think we're moving toward a world where intelligence is something we can talk to while life is happening around us, and where the real breakthrough won't feel like talking to a computer at all. It'll just feel like thinking with one.",
          },
        ],
      },
      {
        id: "sources",
        heading: "Sources",
        blocks: [
          {
            type: "sources",
            items: [
              {
                label: "Sony Pictures, official synopsis for Spider-Man: Brand New Day",
                href: "https://spidermanbrandnewday.movie/synopsis/",
              },
              {
                label:
                  "Fast Company, \"Spider-Man: Brand New Day, Peter Parker's only friend is AI\"",
                href: "https://www.fastcompany.com/91535483/spider-man-spiderman-brand-new-day-peter-parker-only-friend-is-ai-marvel",
              },
              {
                label:
                  "People, \"Naomi Watts Reveals Her Top Secret Role in Spider-Man: Brand New Day\"",
                href: "https://people.com/naomi-watts-reveals-her-top-secret-role-in-spider-man-brand-new-day-12033956",
              },
              {
                label: "Movie Mike's Movie Podcast, spoiler review of Spider-Man: Brand New Day",
                href: "https://podscan.fm/podcasts/movie-mikes-movie-podcast/episodes/spoiler-review-spider-man-brand-new-day-2",
              },
              {
                label: "Stanford HCI Group, speech recognition research",
                href: "https://hci.stanford.edu/research/speech/",
              },
              {
                label:
                  "Ruan et al., ACM CHI, \"Speech Is 3x Faster than Typing for English and Mandarin Text Entry on Mobile Devices\"",
                href: "https://dl.acm.org/doi/10.1145/3161187",
              },
              {
                label:
                  "Stivers et al., PNAS, \"Universals and cultural variation in turn-taking in conversation\"",
                href: "https://www.pnas.org/doi/10.1073/pnas.0903616106",
              },
              {
                label: "Stivers et al., PubMed listing",
                href: "https://pubmed.ncbi.nlm.nih.gov/19553212/",
              },
              {
                label: "OpenAI, \"Hello GPT-4o\"",
                href: "https://openai.com/index/hello-gpt-4o/",
              },
              {
                label: "OpenAI, GPT-4o System Card (PDF)",
                href: "https://cdn.openai.com/gpt-4o-system-card.pdf",
              },
              {
                label:
                  "Microsoft Research, \"Microsoft researchers achieve new conversational speech recognition milestone\"",
                href: "https://www.microsoft.com/en-us/research/blog/microsoft-researchers-achieve-new-conversational-speech-recognition-milestone/",
              },
              {
                label:
                  "Koenecke et al., PNAS, \"Racial disparities in automated speech recognition\" (PMC)",
                href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7149386/",
              },
              {
                label: "Koenecke et al., PNAS (DOI)",
                href: "https://doi.org/10.1073/pnas.1915768117",
              },
              {
                label:
                  "Mitra et al., \"Analysis and Tuning of a Voice Assistant System for Dysfluent Speech\"",
                href: "https://arxiv.org/abs/2106.11759",
              },
              {
                label: "DARPA, \"Perceptually-enabled Task Guidance\"",
                href: "https://www.darpa.mil/research/programs/perceptually-enabled-task-guidance",
              },
              {
                label: "DARPA, \"Virtual Partners for Military Personnel\"",
                href: "https://www.darpa.mil/news/2021/virtual-partners-military-personnel",
              },
              {
                label:
                  "U.S. Army SBIR, \"AI/ML-Enabled Voice-Commanded Autonomous Maneuver for Ground Combat Vehicles\"",
                href: "https://armysbir.army.mil/topics/aiml-enabled-voice-commanded-autonomous-maneuver-ground-combat-vehicles/",
              },
              {
                label:
                  "U.S. Army, \"Army researchers create pioneering approach to real-time conversational AI\"",
                href: "https://www.army.mil/article/245363/army_researchers_create_pioneering_approach_to_real_time_conversational_ai",
              },
              {
                label: "Javaheri et al., \"LLM-Based Voice Control for Surgical AR Navigation\"",
                href: "https://arxiv.org/html/2412.16597v1",
              },
              {
                label:
                  "NVIDIA, \"NVIDIA and Global Robotics Leaders Take Physical AI to the Real World\"",
                href: "https://nvidianews.nvidia.com/news/nvidia-and-global-robotics-leaders-take-physical-ai-to-the-real-world",
              },
              {
                label: "NVIDIA, Actuate event",
                href: "https://www.nvidia.com/en-us/events/actuate/",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "riemann-hypothesis",
    title:
      "If AI Solves the Riemann Hypothesis, Will Humans Understand the Answer?",
    date: "August 15, 2026, 11:54 AM",
    isoDate: "2026-08-15",
    description:
      "What Anthropic's Riemann result actually means, why AI may begin discovering things humans cannot fully understand, and what happens when machines stop repeating knowledge and start creating it.",
    sections: [
      {
        id: "introduction",
        heading: "Introduction",
        blocks: [
          {
            type: "p",
            text: "For 167 years, mathematicians have chipped away at one of the most famous problems in their field. The Riemann Hypothesis, proposed by Bernhard Riemann in 1859, is a short statement with enormous consequences. It is about prime numbers, the building blocks of whole numbers, and a strange function that seems to encode their hidden structure.",
          },
          {
            type: "p",
            text: "In August 2026, Anthropic announced that a research version of Claude had taken a serious run at the problem. Claude did not solve the Riemann Hypothesis, but it produced a new result that meaningfully improved what mathematicians can rigorously prove about it.",
          },
          {
            type: "p",
            text: "That points to a bigger question. What if solving the Riemann Hypothesis is not the revolutionary part, and the real story is that an AI learned how to attack a problem this hard at all?",
          },
        ],
      },
      {
        id: "what-is-rh",
        heading: "What Is the Riemann Hypothesis?",
        blocks: [
          {
            type: "p",
            text: "Prime numbers are numbers like 2, 3, 5, 7, 11, 13, and 17. Each one is divisible only by 1 and itself. They behave like the atoms of arithmetic, because every positive whole number can be built, in exactly one way, out of primes.",
          },
          {
            type: "p",
            text: "The mystery is that primes do not arrive on a schedule. Sometimes they cluster close together, and sometimes there are long stretches with none at all.",
          },
          {
            type: "p",
            text: "Riemann studied their distribution through the zeta function:",
          },
          {
            type: "math",
            text: "\\zeta(s) = 1 + \\frac{1}{2^{s}} + \\frac{1}{3^{s}} + \\frac{1}{4^{s}} + \\cdots",
          },
          { type: "p", text: "For example, when s = 2:" },
          {
            type: "math",
            text: "\\zeta(2) = 1 + \\frac14 + \\frac19 + \\frac1{16} + \\cdots",
          },
          {
            type: "p",
            text: "Leonhard Euler found that the same function can be written using nothing but the prime numbers:",
          },
          {
            type: "math",
            text: "\\zeta(s) = \\prod_{p\\ \\text{prime}} \\frac{1}{1 - p^{-s}}",
          },
          {
            type: "p",
            text: "That identity is the bridge between the zeta function and the primes. Information about every prime is baked into it.",
          },
          {
            type: "p",
            text: "Riemann then looked at the inputs where the zeta function, suitably extended, equals zero. These are its zeros. The interesting ones, called the non-trivial zeros, live in the region where the real part of s sits between 0 and 1.",
          },
          {
            type: "p",
            text: "Riemann guessed that all of them lie on a single vertical line, exactly halfway across:",
          },
          { type: "math", text: "\\operatorname{Re}(s) = \\tfrac12" },
          { type: "p", text: "The first non-trivial zero sits at roughly:" },
          { type: "math", text: "s = \\tfrac12 + 14.1347\\,i" },
          {
            type: "p",
            text: "Here is the part people often get backwards. The primes themselves do not sit on the 1/2 line. The zeros of the zeta function do. Because those zeros are tied to the primes through Euler's identity, their positions control how far the real distribution of primes can drift from the pattern mathematicians expect.",
          },
          {
            type: "p",
            text: "So the whole Riemann Hypothesis comes down to one line:",
          },
          {
            type: "p",
            text: "Every non-trivial zero of the zeta function has real part exactly 1/2.",
          },
          {
            type: "diagram",
            variant: "critical-strip",
            caption:
              "Figure 1. Non-trivial zeros lie inside the critical strip 0 < Re(s) < 1. The Riemann Hypothesis says every one of them lies on the critical line Re(s) = 1/2.",
          },
          {
            type: "figure",
            src: "/essays/riemann-hypothesis/complex-plane-trace.png",
            alt: "Complex-plane trace of the output of the Riemann zeta function evaluated along the critical line, ζ(1/2 + it).",
            caption:
              "Figure 2. The path traced by the output ζ(1/2+it) as t changes. The input is already restricted to the critical line Re(s)=1/2. Whenever the curve passes through the origin, the zeta function equals zero.",
          },
        ],
      },
      {
        id: "claudes-breakthrough",
        heading: "Claude's Breakthrough",
        blocks: [
          {
            type: "p",
            text: "On August 10, 2026, Anthropic said an unreleased research version of Claude had been pointed at the Riemann Hypothesis and told to genuinely try.",
          },
          {
            type: "p",
            text: "Before this work, mathematicians could rigorously prove that at least about 41.6% of the relevant zeros were simple and sat on the critical line. Claude built an argument that pushed the guarantee past two-thirds, with an optimized figure near 67.25%.[^2]",
          },
          {
            type: "p",
            text: "This does not mean Claude solved 67% of the Riemann Hypothesis. The hypothesis says 100% of the non-trivial zeros lie on the 1/2 line. Claude's result raises the floor, the minimum share mathematics can currently guarantee, and says nothing about the odds that the whole statement is true.",
          },
          {
            type: "p",
            text: "By Anthropic's account, Claude worked through roughly 650 dead ends before it found the argument. It then spent about a day and a half coordinating around 60 subagents and produced about 31 million tokens of output.[^1] Those agents wrote code, ran numerical checks, hunted for counterexamples, picked apart each other's reasoning, and dug through existing research.",
          },
          {
            type: "p",
            text: "The result is very recent. Anthropic's mathematicians validated it, Claude produced a formally verifiable proof, and outside experts examined the paper. A claim this fresh will still take time to face the broader scrutiny of the mathematical community, so it is worth holding with the caution any brand new result deserves.[^1]",
          },
          {
            type: "p",
            text: "The argument came from combining existing mathematical ideas in a way that had not previously been known to produce this bound. That detail matters. Claude did not conjure a new field out of nothing. It stood on work built by generations of mathematicians and noticed a connection they had walked past.",
          },
          {
            type: "diagram",
            variant: "progression",
            caption:
              "Figure 3. Claude raised the proven lower bound from about 41.6% to 67.2%. The full Riemann Hypothesis is the separate claim that 100% of non-trivial zeros lie on the critical line.",
          },
        ],
      },
      {
        id: "why-not-check",
        heading: "Why Not Just Check Every Zero?",
        blocks: [
          { type: "p", text: "Because there are infinitely many of them." },
          {
            type: "p",
            text: "Computers have already checked the first 10 trillion relevant zeros and found every one of them exactly where Riemann predicted.[^3] The hypothesis is still open because 10 trillion is a finite number and the zeros continue forever. If Riemann was wrong, the first stray zero could sit unimaginably far past anything a computer has reached.",
          },
          {
            type: "p",
            text: "This is the gap between evidence and proof.",
          },
          {
            type: "p",
            text: "We do not accept that 1 + 1 = 2 because calculators have confirmed it a billion times. The numbers and the addition are defined by axioms and rules of logic, and 1 + 1 = 2 follows necessarily from them. A proof is not repeated observation. It shows why something cannot be otherwise.",
          },
          {
            type: "p",
            text: "Riemann demands that same kind of certainty. A proof has to show that if the zeta function is zero at any non-trivial point, then the real part of that point must be 1/2. Not for the first trillion zeros. For every possible zero, forever.",
          },
        ],
      },
      {
        id: "reaching-100",
        heading: "What If AI Actually Proves It?",
        blocks: [
          {
            type: "p",
            text: "Say an AI eventually produces a valid proof of the full Riemann Hypothesis.",
          },
          {
            type: "p",
            text: "After 167 years the problem is finally closed, and a second question walks in right behind it. Would humans actually understand the proof?",
          },
          {
            type: "p",
            text: "Maybe the AI writes an elegant argument in mathematics we already speak. Mathematicians could read it, simplify it, and eventually absorb it into the textbooks.",
          },
          {
            type: "p",
            text: "A more advanced system could instead invent new abstractions, new notation, and new ways of reasoning built for machines rather than people. A formal proof checker could confirm the argument holds while no single human quite follows why it works.",
          },
          {
            type: "p",
            text: "For centuries, a proof has meant two things at once, certainty and understanding. AI might pull those two apart. We could end up certain that Riemann is true and still unable to explain, in human terms, why.",
          },
        ],
      },
      {
        id: "proof-not-the-point",
        heading: "What If the Proof Isn't the Point?",
        blocks: [
          {
            type: "p",
            text: "This might be the more unsettling possibility.",
          },
          {
            type: "p",
            text: "What if an AI proving the Riemann Hypothesis matters less than the method it had to invent to get there?",
          },
          {
            type: "p",
            text: "A conjecture is something mathematicians strongly believe but cannot yet prove. Cracking one this hard can demand fresh ideas, connections between distant areas, hundreds of failed attempts, counterexamples aimed at your own reasoning, and new abstractions when the old tools run out.",
          },
          {
            type: "p",
            text: "Many of those skills are not specific to number theory.",
          },
          {
            type: "p",
            text: "This is the part I find more interesting than the proof itself. If an AI can do all of that reliably, then Riemann is less a milestone in mathematics and more evidence that a broad scientific ability has arrived. The same kind of system could go looking for better battery materials, new catalysts, sharper climate models, cheaper desalination, new medicines, or progress on fusion.",
          },
          {
            type: "p",
            text: "Solving Riemann would not magically fix global warming or hand us unlimited energy. Real problems drag in physics, engineering, economics, and politics, and no theorem clears those away. What would carry over is the problem-solving ability underneath, not the specific result.",
          },
          {
            type: "p",
            text: "Picture a system that can float hundreds of serious hypotheses, read decades of research, link ideas across fields, run its own experiments and simulations, attack its own conclusions, coordinate specialist agents, and formally verify what it finds.",
          },
          {
            type: "p",
            text: "The breakthrough there is not the machine that solved one famous problem. It is a machine that learned how to work at the edge of human knowledge.",
          },
          {
            type: "diagram",
            variant: "discovery-tree",
            caption:
              "Figure 4. The bigger breakthrough may be the transferable discovery process, not the theorem itself.",
          },
        ],
      },
      {
        id: "proving-it-wrong",
        heading: "What If AI Proves Riemann Wrong?",
        blocks: [
          {
            type: "p",
            text: "Nothing guarantees Riemann was right.",
          },
          {
            type: "p",
            text: "A single legitimate non-trivial zero with a real part other than 1/2 would disprove the hypothesis on the spot.",
          },
          {
            type: "p",
            text: "Mathematics would not fall apart, but one of its most famous conjectures would. The shock would be greater if an AI found the counterexample. Generations of mathematicians would have studied a problem dating to 1859, only for a machine to surface a truth the greatest human minds had missed.",
          },
          {
            type: "p",
            text: "A machine like that is no longer just calculating faster than we can. It is turning up truths beyond the current reach of human mathematical reasoning.",
          },
        ],
      },
      {
        id: "who-gets-credit",
        heading: "Who Gets the Credit?",
        blocks: [
          {
            type: "p",
            text: "If an AI proves the Riemann Hypothesis, who solved it?",
          },
          {
            type: "p",
            text: "The mathematician who typed the prompt? The researchers who built the system? The company that owns the model? The generations of mathematicians whose work the AI learned from? Or the AI that produced the decisive argument?",
          },
          {
            type: "p",
            text: "Anthropic's work already hands us an early version of this fight. Its technical paper credits Claude while also naming the humans who posed the problem, guided the work, checked it, formalized it, and wrote it up.[^2]",
          },
          {
            type: "p",
            text: "Future scientific credit may have to be split the same way, and the norms for doing that do not exist yet.",
          },
          {
            type: "p",
            text: "The credit question bothers me for a different reason. Would it feel like a win to watch a problem that survived nearly two centuries of human effort fall to an AI in an afternoon?",
          },
          {
            type: "p",
            text: "I don't know whether that would feel like a human victory. We built the machine, but we would not have made the discovery.",
          },
        ],
      },
      {
        id: "end-or-new-era",
        heading: "The End, or a New Era?",
        blocks: [
          {
            type: "p",
            text: "Claude has not solved the Riemann Hypothesis, and it has not solved 67% of it. It produced a stronger theorem about the share of zeros that mathematics can prove sit where Riemann predicted.",
          },
          {
            type: "p",
            text: "The larger meaning may have little to do with that number.",
          },
          {
            type: "p",
            text: "For most of history, the frontier of mathematics was capped by two things, what humans could discover and what humans could understand. AI could lift the first cap long before it lifts the second.",
          },
          {
            type: "p",
            text: "If AI does eventually solve Riemann, the real breakthrough may not be the proof. It may be that the system shows a repeatable way to reach answers past the edge of human knowledge.",
          },
          {
            type: "p",
            text: "AI is already beginning to contribute new knowledge, including the result discussed here. A full solution to something like the Riemann Hypothesis would make that shift impossible to dismiss. The question would no longer be whether AI can participate in frontier discovery, but how far beyond the human frontier it can go.",
          },
          {
            type: "p",
            text: "That is the part of this story I find difficult to shake. The day an AI solves Riemann may matter less because one famous conjecture is finally gone, and more because of what the solution says about who is now capable of discovering things humanity cannot. If answers start arriving faster than we can understand them, I am not sure whether we will still be leading the scientific revolution or simply trying to keep up with it.",
          },
        ],
      },
      {
        id: "sources",
        heading: "Sources",
        blocks: [
          {
            type: "sources",
            items: [
              {
                label: "Anthropic, \"Claude and the Riemann zeta function\"",
                href: "https://www.anthropic.com/research/riemann-zeta",
              },
              {
                label: "Anthropic, Riemann zeta technical paper (PDF)",
                href: "https://www-cdn.anthropic.com/95c246936988e43127bc6b2ceb7077c1dad2d68e.pdf",
              },
              {
                label: "Clay Mathematics Institute, \"Riemann Hypothesis\"",
                href: "https://www.claymath.org/millennium/riemann-hypothesis/",
              },
              {
                label: "Clay Mathematics Institute, \"Millennium Prize Problems\"",
                href: "https://www.claymath.org/millennium-problems/",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const getEssay = (slug: string): Essay | undefined =>
  essays.find((e) => e.slug === slug);

export const readingTimeMinutes = (essay: Essay): number => {
  const text = essay.sections
    .flatMap((s) => s.blocks)
    .flatMap((b) => {
      if (b.type === "p" || b.type === "math") return [b.text];
      if (b.type === "figure") return [b.caption];
      if (b.type === "diagram") return [b.caption];
      if (b.type === "sources") return b.items.map((i) => i.label);
      return [];
    })
    .join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 225));
};
