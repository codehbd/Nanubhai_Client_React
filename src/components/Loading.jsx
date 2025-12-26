export default function Loading() {
  return (
    <>
      <div
        className={` w-screen h-screen bg-white flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 z-[10000] `}
      >
        <div className=" w-14 h-14 bg-transparent rounded-full border-t-2 border-black animate-spin p-6 relative flex justify-center items-center"></div>
      </div>
    </>
  );
}
