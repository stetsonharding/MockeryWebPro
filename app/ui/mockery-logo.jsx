import Image from "next/image";

export default function MockeryLogo() {
  return (
    <div
      className="flex flex-row items-center leading-none text-white"
    >
      <Image
          src="/assets/icons/MockeryLogoBG.png"
          alt="Mockery Logo"
          width={50}
          height={50}
          className="object-contain"
        />
      <p className="text-[38px]">Mockery</p>
    </div>
  );
}
