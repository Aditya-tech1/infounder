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
      desc: "Improve your presentation slides with AI-driven advice",
    },
    {
      icon: "/file.png",
      title: "Personalized Improvement Report",
      desc: "Gain actionable insights tailored to your performance",
    },
  ];

  return (
    <section className="features-section" id="features">
      <h2 className="features-title">Features</h2>
      <div className="features-container">
        {features.map((f, index) => (
          <div key={index} className="feature-card">
          <Image
         src={f.icon}
        alt="icon"
        width={60}
        height={1}
        className="feature-icon h-[72px] w-[60px]"
          />
            <h3 className="font-[serif] font-bold text-[24px] mb-2 text-center">
              {f.title}
            </h3>
            <p className="italic font-extralight text-[16px] text-center">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}








