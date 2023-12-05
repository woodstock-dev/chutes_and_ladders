export default function AvatarColor({ colorList }) {
  return (
    <>
      {colorList.map((c, i) => {
        return <option key={i}>{c}</option>;
      })}
    </>
  );
}
