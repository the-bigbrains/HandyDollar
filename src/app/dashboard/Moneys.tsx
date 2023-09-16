interface Props {
  message: string;
  money: number;
}

export default function Moneys({ message, money }: Props) {
  return (
    <div className="p-5 px-5 border border-gray-400 text-white hover:bg-purple-300 hover:text-black duration-200 mt-2 rounded-lg w-96">
      <h1>{message}</h1>
      <div className="font-bold text-2xl">
        <div>{"$" + money} </div>
      </div>
    </div>
  );
}
