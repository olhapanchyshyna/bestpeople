import Image from 'next/image'

type textWithIconProps = {
	Items: {
		title: string
	}[],
	iconSrc: string
}

export default function TextWithIcon({Items, iconSrc}: textWithIconProps) {
  return (
    <>
      {Items.map((item, index) => {
        return (
          <div
            key={index}
            className="mb-[10px] flex items-start"
          >
            <Image
              src={iconSrc}
              alt="checkmark-circle"
              width={15}
              height={15}
              className="mt-[5px]"
            />
            <h3 className="ml-[12px] text-[16px] text-black">{item.title}</h3>
          </div>
        );
      })}
    </>
  );
}
