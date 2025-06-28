import Image from "next/image"; 

export default function Features() {
  const features = [
    {
      icon: "/voice.png",
      title: "Voice & Confidence Analysis",
      desc: "Assess your speech for vocal tune for confidence level",
    },
    {
      icon: "/user.png",
      title: "Body Language & Facial Feedback",
      desc: "Receive evaluations of your gestures and facial expressions",
    },
    {
      icon: "/ppt.png",
      title: "Smart Slide Deck Suggestions",
      desc: "Improve your presentation slides with AI-driven advice Improve your presentation slides with AI-driven advice Improve your presentation slides with AI-driven advice",
    },
    {
      icon: "/file.png",
      title: "Personalized Improvement Report",
      desc: "Gain actionable insights tailored to your performance Gain actionable insights tailored to your performance Gain actionable insights tailored to your performance",
    },
  ];

  return (
    <section className="bg-[#100425] py-20 min-h-screen" id="features">
      <h2 className="text-white text-6xl font-serif text-center mb-25">Features</h2>
      <div className="flex justify-center gap-6 px-4 flex-wrap">
        {features.map((f, index) => (
          <div
            key={index}
            style={{
              background:
                "linear-gradient(135deg, rgba(70, 0, 70, 0.98) 0%, rgba(0, 60, 60, 0.98) 100%)",
            }}
            className="text-white rounded-xl w-70 h-84 p-6 text-center flex flex-col items-center"
          >
            <Image src={f.icon} alt="icon" width={56} height={56} className="mb-4" />
            <h3 className="font-serif font-bold text-xl mb-2">{f.title}</h3>
            <p className="italic font-extralight text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}





