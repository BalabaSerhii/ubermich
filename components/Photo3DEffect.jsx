import Image from "next/image";

export default function Photo3DEffect() {
  return (
  <div className="hover-3d">
  {/* content */}
  <figure className="max-w-100 rounded-2xl">
     <Image
          src="/logo1.png"
          alt="Mein Foto"
          width={400}
          height={400}
          className="object-cover"
        />
  </figure>
  {/* 8 empty divs needed for the 3D effect */}
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
  );
}
