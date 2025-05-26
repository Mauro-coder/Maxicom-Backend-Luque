export default function Title({ title }) {
  const titleClass =
    "text-[20px] md:text-[30px] lg:text-[40px] font-bold text-indigo-400 bg-indigo-200 h-[50px] md:h-[75px] lg:h-[100px] flex items-center justify-center";
  return <h1 className={titleClass}>{title}</h1>;
}
