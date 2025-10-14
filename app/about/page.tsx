// app/about/page.tsx
export default function About() {
  return (
    <section className="py-20 max-w-5xl mx-auto px-6">
      <h2 className="text-4xl font-bold mb-6 text-center">About Me</h2>
      <div className="flex flex-col md:flex-row items-center gap-10">
        <img
          src="https://media.licdn.com/dms/image/v2/D4D03AQHsG5ryXpBl1A/profile-displayphoto-crop_800_800/B4DZmVGLAGGQAI-/0/1759143048297?e=1763596800&v=beta&t=nvPziz7n_0uGXQ2jNDISOUPtF7eDd861-TvDh8QA9DI" 
          alt="Ajay Malah"
          className="w-64 h-64 object-cover rounded-full shadow-lg"
        />
        <div className="flex-1 space-y-4 text-gray-700">
          <p>
            Hello! I’m <strong>Ajay Malah</strong>, a passionate Full Stack Developer and technology enthusiast. 
            I specialize in building web applications, automation systems, and cloud-based solutions that help businesses streamline their processes.
          </p>
          <p>
            Over the past few years, I’ve worked on multiple projects including web apps with Next.js, mobile apps using React Native, and backend systems with Node.js and TypeScript. 
            My focus is on writing clean, maintainable code while creating user-friendly experiences.
          </p>
          <p>
            I’m always learning new technologies and exploring innovative solutions to challenging problems. When I’m not coding, I enjoy contributing to open-source projects and experimenting with new tech stacks.
          </p>
        </div>
      </div>
    </section>
  );
}
