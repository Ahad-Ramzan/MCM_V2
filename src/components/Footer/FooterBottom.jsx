import Image from "next/image";

export default function FooterBottom() {
  return (
    <div className="bg-white border-t max-xl:pb-14 border-[var(--lightGray6)]">
      <div className="Container flex flex-col md:flex-row items-center justify-between py-4 gap-4 text-sm text-[var(--darkGray4)]">
        {/* Left: Copyright */}
        <p>© 2025 MCM Construções. Todos os direitos reservados.</p>

        {/* Right: Payment Methods */}
        <div className="flex items-center gap-2">
          <span className="text-[var(--darkGray4)]">Métodos de Pagamento:</span>
          <Image
            src="/icons/mastercard.png"
            alt="MasterCard"
            width={100}
            height={100}
            className="h-10 w-auto"
          />
          <Image
            src="/icons/visa.png"
            alt="Visa"
            width={50}
            height={50}
            className="h-10 w-auto"
          />
        </div>
      </div>
    </div>
  );
}
