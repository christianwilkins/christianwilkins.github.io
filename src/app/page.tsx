import Link from "next/link";

export default function Home() {
  return (
    <div className="animate-rise-in">
      <h1 className="text-4xl font-bold mb-6 font-heading">Home</h1>
      <p className="mb-4 text-lg leading-relaxed">Hi, I&apos;m Chris!</p>
      <p className="mb-4 text-lg leading-relaxed">
        I&apos;m a software engineer passionate about building meaningful solutions
        that make a difference. Currently based in the United States, and I am a
        United States citizen, I specialize in full-stack development and love
        tackling complex problems.
      </p>
      <p className="mb-4 text-lg leading-relaxed">
        Take a look at my{" "}
        <Link href="/projects" className="text-primary hover:underline font-medium">
          recent projects
        </Link>{" "}
        to see my work in action, or learn more{" "}
        <Link href="/about" className="text-primary hover:underline font-medium">
          about my journey
        </Link>{" "}
        in tech. I&apos;m always excited to{" "}
        <Link href="/contact" className="text-primary hover:underline font-medium">
          connect with fellow developers
        </Link>{" "}
        and discuss new opportunities.
      </p>
      <p className="mb-4 text-lg leading-relaxed">
        Whether you&apos;re interested in collaboration or just want to chat about
        technology, I&apos;d love to hear from you!
      </p>
    </div>
  );
}
