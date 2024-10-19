import Image from "next/image"
import mapImg from "@/assets/Map.png"
import SelectForm from "@/components/Search";
import Item from "@/components/Item";

export default function Home() {
  return (
    <div className="px-6">
      <SelectForm />
      <Image src={mapImg} alt="map" className="mx-auto w-[983px] h-[492px]" />
      <div className="mx-44 my-7 flex items-center gap-8">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
}
