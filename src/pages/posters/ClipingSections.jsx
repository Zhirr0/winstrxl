export default function ClippingSection({ section }) {
  return (
    <section
      data-snap-section
      className="relative text-light-primary flex justify-between overflow-hidden max-lg:flex-col lg:h-svh"
    >
      <div
        className="flex flex-col justify-between lg:w-[20vw]"
      >
        <h2 className="text-4xl leading-none whitespace-pre-line lg:text-[72px]">
          {section.title}
        </h2>
        <p
          className="indent-[5vw] max-lg:w-2/3 lg:text-2xl"
        >
          {section.description}
        </p>
      </div>
      <div className="relative order-3 w-fit lg:order-0 lg:h-full">
        <div
          data-media
          className="relative aspect-[1.93939] h-[50vw] w-full overflow-hidden will-change-transform lg:absolute lg:top-[50vh] lg:left-1/2 lg:h-auto lg:w-[50vw] lg:-translate-x-1/2 lg:-translate-y-1/2"
        >
          <img
            src={section.image}
            alt=""
            sizes="75vw"
            className="object-cover w-full h-full max-[1024px]:translate-x-2"
          />
        </div>
      </div>

      <div className="flex max-lg:absolute max-lg:top-[7.5vw] max-lg:right-0 lg:w-[20vw] lg:pt-[14.5vw]">
        <ul className="text-xs font-semibold uppercase max-lg:text-end lg:text-sm">
          {section.services.map((service, i) => (
            <li key={i}>{service}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
