const Newsletter = () => {
  return (
    <div className="Container py-4">
      <div className="flex flex-col xl:flex-row items-start xl:items-center gap-4 xl:gap-8">
        {/* Left Content */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold">Newsletter</h2>
          <p className="text-[1.2rem] sm:text-[1.4rem] text-[var(--darkGray)] mt-1 ">
            Receba atualizações sobre a nossa loja e ofertas especiais.
          </p>
        </div>

        {/* Right Form */}
        <form className="flex w-full max-sm:max-w-sm   xl:max-w-xl">
          <input
            type="email"
            placeholder="Email"
            className="flex-1 border border-[var(--lightGray6)] rounded-l sm:px-4 py-2 outline-none placeholder:pl-2"
          />
          <button
            type="submit"
            className="bg-[var(--secondary)] text-white px-2 sm:px-4 py-2 rounded-r cursor-pointer"
          >
            Subscrever
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
