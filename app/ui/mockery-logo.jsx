import Image from "next/image";
import { lusitana } from '@/app/ui/fonts';

export default function MockeryLogo() {
  return (
    <div
      className="flex flex-row items-center leading-none text-white gap-1"
    >
      <Image
          src="/assets/icons/mockeryLogo.png"
          alt="Mockery Logo"
          width={79}
          height={79}
          className="object-contain"
        />
      <p className={`${lusitana.className} text-[35px]`}>Mockery</p>
    </div>
  );
}
