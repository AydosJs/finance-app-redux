export default function Drawer({ children, isOpen, setIsOpen }: any) {
  return (
    <main
      style={{
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
      }}
      className={
        "mt-[54px] h-full fixed overflow-hidden z-10  bg-opacity-25 inset-0 transform ease-in-out  transition-all" +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-y-72  "
          : " transition-all duration-500 opacity-0 translate-y-full  ")
      }
    >
      <section
        className={
          "p-10 w-screen left-0 absolute bg-white h-fit shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-y-0 " : " transition-all duration-500 opacity-0 translate-y-72 ")
        }
      >
        {children}
      </section>

    </main>
  );
}
