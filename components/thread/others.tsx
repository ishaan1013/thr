export default function Others({ others }: { others: string[] }) {
  if (others.length === 0) {
    return null;
  }
  if (others.length === 1) {
    return (
      <div className="w-5 h-5 relative">
        <div className="w-5 h-5 rounded-full bg-red-500 absolute top-0 left-0"></div>
      </div>
    );
  }
  if (others.length === 2) {
    return (
      <div className="w-8 h-8 relative">
        <div className="w-[18px] h-[18px] rounded-full bg-red-500 absolute top-0 left-0"></div>
        <div className="w-4 h-4 rounded-full bg-blue-500 absolute bottom-0 right-0"></div>
      </div>
    );
  }
  return (
    <div className="w-8 h-8 relative">
      <div className="w-4 h-4 rounded-full bg-red-500 absolute top-0 left-0"></div>
      <div className="w-3.5 h-3.5 rounded-full bg-blue-500 absolute top-[15%] right-0"></div>
      <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 absolute bottom-0 left-[15%]"></div>
    </div>
  );
}
